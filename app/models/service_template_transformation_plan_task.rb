class ServiceTemplateTransformationPlanTask < ServiceTemplateProvisionTask
  belongs_to :conversion_host
  delegate :source_transport_method, :to => :conversion_host

  def self.base_model
    ServiceTemplateTransformationPlanTask
  end

  def self.get_description(req_obj)
    source_name = req_obj.source.name
    req_obj.kind_of?(ServiceTemplateTransformationPlanRequest) ? source_name : "Transforming VM [#{source_name}]"
  end

  def after_request_task_create
    update_attributes(:description => get_description)
  end

  def resource_action
    miq_request.source.resource_actions.detect { |ra| ra.action == 'Provision' }
  end

  def transformation_destination(source_obj)
    miq_request.transformation_mapping.destination(source_obj)
  end

  def pre_ansible_playbook_service_template
    ServiceTemplate.find_by(:id => vm_resource.options["pre_ansible_playbook_service_template_id"])
  end

  def post_ansible_playbook_service_template
    ServiceTemplate.find_by(:id => vm_resource.options["post_ansible_playbook_service_template_id"])
  end

  def update_transformation_progress(progress)
    options[:progress] = (options[:progress] || {}).merge(progress)
    save
  end

  def task_finished
    # update the status of vm transformation status in the plan
    vm_resource.update_attributes(:status => status == 'Ok' ? ServiceResource::STATUS_COMPLETED : ServiceResource::STATUS_FAILED)
  end

  def mark_vm_migrated
    source.tag_with("migrated", :ns => "/managed", :cat => "transformation_status")
  end

  def task_active
    vm_resource.update_attributes(:status => ServiceResource::STATUS_ACTIVE)
  end

  def source_ems
    options[:source_ems_id] ||= source.ext_management_system.id
    source.ext_management_system
  end

  def destination_ems
    options[:destination_ems_id] ||= transformation_destination(source.ems_cluster).ext_management_system.id
    transformation_destination(source.ems_cluster).ext_management_system
  end

  def source_disks
    options[:source_disks] ||= source.hardware.disks.select { |d| d.device_type == 'disk' }.collect do |disk|
      source_storage = disk.storage
      destination_storage = transformation_destination(disk.storage)
      raise "[#{source.name}] Disk #{disk.device_name} [#{source_storage.name}] has no mapping. Aborting." if destination_storage.nil?
      {
        :path    => disk.filename,
        :size    => disk.size,
        :percent => 0,
        :weight  => disk.size.to_f / source.allocated_disk_storage.to_f * 100
      }
    end
  end

  def network_mappings
    options[:network_mappings] ||= source.hardware.nics.select { |n| n.device_type == 'ethernet' }.collect do |nic|
      source_network = nic.lan
      destination_network = transformation_destination(source_network)
      raise "[#{source.name}] NIC #{nic.device_name} [#{source_network.name}] has no mapping. Aborting." if destination_network.nil?
      {
        :source      => source_network.name,
        :destination => destination_network_ref(destination_network),
        :mac_address => nic.address
      }
    end
  end

  def destination_network_ref(network)
    send("destination_network_ref_#{destination_ems.emstype}", network)
  end

  def destination_network_ref_rhevm(network)
    network.name
  end

  def destination_network_ref_openstack(network)
    network.ems_ref
  end

  def destination_flavor
    Flavor.find_by(:id => miq_request.source.options[:config_info][:osp_flavor])
  end

  def destination_security_group
    SecurityGroup.find_by(:id => miq_request.source.options[:config_info][:osp_security_group])
  end

  def transformation_log
    host = conversion_host
    if host.nil?
      msg = "Conversion host was not found. Download of transformation log aborted."
      _log.error(msg)
      raise MiqException::Error, msg
    end

    userid, password = host.resource.auth_user_pwd(:remote)
    if userid.blank? || password.blank?
      msg = "Credential was not found for host #{host.resource.name}. Download of transformation log aborted."
      _log.error(msg)
      raise MiqException::Error, msg
    end

    logfile = options.fetch_path(:virtv2v_wrapper, "v2v_log")
    if logfile.blank?
      msg = "The location of transformation log was not set. Download of transformation log aborted."
      _log.error(msg)
      raise MiqException::Error, msg
    end

    begin
      require 'net/scp'
      Net::SCP.download!(host.resource.ipaddress, userid, logfile, nil, :ssh => {:password => password})
    rescue Net::SCP::Error => scp_err
      _log.error("Download of transformation log for #{description} with ID [#{id}] failed with error: #{scp_err.message}")
      raise scp_err
    end
  end

  # Intend to be called by UI to display transformation log. The log is stored in MiqTask#task_results
  # Since the task_results may contain a large block of data, it is desired to remove the task upon receiving the data
  def transformation_log_queue(userid = nil)
    userid ||= User.current_userid || 'system'
    host = conversion_host
    if host.nil?
      msg = "Conversion host was not found. Cannot queue the download of transformation log."
      return create_error_status_task(userid, msg).id
    end

    _log.info("Queuing the download of transformation log for #{description} with ID [#{id}]")
    options = {:userid => userid, :action => 'transformation_log'}
    queue_options = {:class_name  => self.class,
                     :method_name => 'transformation_log',
                     :instance_id => id,
                     :priority    => MiqQueue::HIGH_PRIORITY,
                     :args        => [],
                     :zone        => host.resource.my_zone}
    MiqTask.generic_action_with_callback(options, queue_options)
  end

  def cancel
    update_attributes(:cancelation_status => MiqRequestTask::CANCEL_STATUS_REQUESTED)
  end

  def canceling
    update_attributes(:cancelation_status => MiqRequestTask::CANCEL_STATUS_PROCESSING)
  end

  def canceled
    update_attributes(:cancelation_status => MiqRequestTask::CANCEL_STATUS_FINISHED)
  end

  def conversion_options
    source_cluster = source.ems_cluster
    source_storage = source.hardware.disks.select { |d| d.device_type == 'disk' }.first.storage
    destination_cluster = transformation_destination(source_cluster)
    destination_storage = transformation_destination(source_storage)

    [
      { 
        :source_disks     => source_disks.map { |disk| disk[:path] },
        :network_mappings => network_mappings
      },
      send("conversion_options_source_provider_#{source_ems.emstype}_#{source_transport_method}", source_storage),
      send("conversion_options_destination_provider_#{destination_ems.emstype}", destination_cluster, destination_storage )   
    ].inject(&:merge)
  end 

  private

  def vm_resource
    miq_request.vm_resources.find_by(:resource => source)
  end

  def create_error_status_task(userid, msg)
    MiqTask.create(
      :name    => "Download transformation log with ID: #{id}",
      :userid  => userid,
      :state   => MiqTask::STATE_FINISHED,
      :status  => MiqTask::STATUS_ERROR,
      :message => msg
    )
  end

  def conversion_options_source_provider_vmwarews_vddk(_storage)
    {   
      :vm_name            => source.name,
      :transport_method   => 'vddk',
      :vmware_fingerprint => source.host.fingerprint,
      :vmware_uri         => URI::Generic.build(
        :scheme   => 'esx',
        :userinfo => CGI.escape(source.host.authentication_userid),
        :host     => source.host.ipaddress,
        :path     => '/',
        :query    => { :no_verify => 1 }.to_query
      ).to_s,
      :vmware_password    => source.host.authentication_password
    }   
  end 

  def conversion_options_source_provider_vmwarews_ssh(storage)
    {   
      :vm_name          => URI::Generic.build(:scheme => 'ssh', :userinfo => 'root', :host => source.host.ipaddress, :path => "/vmfs/volumes").to_s + "/#{storage.name}/#{source.location}",
      :transport_method => 'ssh'
    }   
  end 

  def conversion_options_destination_provider_rhevm(cluster, storage)
    {   
      :rhv_url             => URI::Generic.build(:scheme => 'https', :host => destination_ems.hostname, :path => '/ovirt-engine/api').to_s,
      :rhv_cluster         => cluster.name,
      :rhv_storage         => storage.name,
      :rhv_password        => destination_ems.authentication_password,
      :install_drivers     => true,
      :insecure_connection => true
    }   
  end 

  def conversion_options_destination_provider_openstack(cluster, storage)
    {   
      :osp_environment            => {
        :os_no_cache         => true,
        :os_auth_url         => URI::Generic.build(
          :scheme => destination_ems.security_protocol == 'non-ssl' ? 'http' : 'https',
          :host   => destination_ems.hostname,
          :port   => destination_ems.port,
          :path   => destination_ems.api_version
        ),
        :os_user_domain_name => destination_ems.uid_ems,
        :os_username         => destination_ems.authentication_userid,
        :os_password         => destination_ems.authentication_password,
        :os_project_name     => cluster.name
      },  
      :osp_destination_project_id => cluster.ems_ref,
      :osp_volume_type_id         => storage.ems_ref,
      :osp_flavor_id              => destination_flavor.ems_ref,
      :osp_security_groups_ids    => [destination_security_group.ems_ref]
    }   
  end 
end
