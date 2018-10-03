describe ServiceTemplateTransformationPlanTask do
  describe '.base_model' do
    it { expect(described_class.base_model).to eq(ServiceTemplateTransformationPlanTask) }
  end

  describe '#after_request_task_create' do
    it 'does not create child tasks' do
      allow(subject).to receive(:source).and_return(double('vm', :name => 'any'))
      expect(subject).not_to receive(:create_child_tasks)
      expect(subject).to receive(:update_attributes).with(hash_including(:description))
      subject.after_request_task_create
    end
  end

  context 'independent of provider' do
    let(:src) { FactoryGirl.create(:ems_cluster) }
    let(:dst) { FactoryGirl.create(:ems_cluster) }
    let(:host) { FactoryGirl.create(:host, :ext_management_system => FactoryGirl.create(:ext_management_system, :zone => FactoryGirl.create(:zone))) }
    let(:vm)  { FactoryGirl.create(:vm_or_template) }
    let(:vm2)  { FactoryGirl.create(:vm_or_template) }
    let(:apst) { FactoryGirl.create(:service_template_ansible_playbook) }
    let(:mapping) do
      FactoryGirl.create(
        :transformation_mapping,
        :transformation_mapping_items => [TransformationMappingItem.new(:source => src, :destination => dst)]
      )
    end

    let(:catalog_item_options) do
      {
        :name        => 'Transformation Plan',
        :description => 'a description',
        :config_info => {
          :transformation_mapping_id => mapping.id,
          :pre_service_id            => apst.id,
          :post_service_id           => apst.id,
          :actions                   => [
            {:vm_id => vm.id.to_s, :pre_service => true, :post_service => true},
            {:vm_id => vm2.id.to_s, :pre_service => false, :post_service => false},
          ],
        }
      }
    end

    let(:plan) { ServiceTemplateTransformationPlan.create_catalog_item(catalog_item_options) }

    let(:request) { FactoryGirl.create(:service_template_transformation_plan_request, :source => plan) }
    let(:task) { FactoryGirl.create(:service_template_transformation_plan_task, :miq_request => request, :request_type => 'transformation_plan', :source => vm) }
    let(:task2) { FactoryGirl.create(:service_template_transformation_plan_task, :miq_request => request, :request_type => 'transformation_plan', :source => vm2) }

    describe '#resource_action' do
      it 'has a resource action points to the entry point for transformation' do
        expect(task.resource_action).to have_attributes(
          :action => 'Provision',
          :fqname => ServiceTemplateTransformationPlan.default_provisioning_entry_point(nil)
        )
      end
    end

    describe '#transformation_destination' do
      it { expect(task.transformation_destination(src)).to eq(dst) }
    end

    describe '#pre_ansible_playbook_service_template' do
      it { expect(task.pre_ansible_playbook_service_template).to eq(apst) }
      it { expect(task2.pre_ansible_playbook_service_template).to be_nil }
    end

    describe '#post_ansible_playbook_service_template' do
      it { expect(task.post_ansible_playbook_service_template).to eq(apst) }
      it { expect(task2.post_ansible_playbook_service_template).to be_nil }
    end

    describe '#update_transformation_progress' do
      it 'saves the progress in options' do
        task.update_transformation_progress(:vm_percent => '80')
        expect(task.options[:progress]).to eq(:vm_percent => '80')
      end
    end

    describe 'task_active' do
      it 'sets vm_request status to Started' do
        task.task_active
        expect(plan.vm_resources.find_by(:resource => task.source).status).to eq(ServiceResource::STATUS_ACTIVE)
      end
    end

    describe 'task_finished' do
      it 'sets vm_request status to Completed' do
        task.task_finished
        expect(plan.vm_resources.find_by(:resource => task.source).status).to eq(ServiceResource::STATUS_COMPLETED)
      end
    end

    describe '.get_description' do
      it 'describes a task' do
        expect(described_class.get_description(task)).to include("Transforming VM")
      end

      it 'describes a request' do
        expect(described_class.get_description(request)).to eq(plan.name)
      end
    end

    describe '#transformation_log_queue' do
      let(:conversion_host_id) { 22 }

      before do
        task.options[:transformation_host_id] = conversion_host_id
        task.save!
      end

      context 'when conversion host exists' do
        before do
          FactoryGirl.create(:conversion_host, :id => conversion_host_id, :resource => host)

          allow(described_class).to receive(:find).and_return(task)

          allow(MiqTask).to receive(:wait_for_taskid) do
            request = MiqQueue.find_by(:class_name => described_class.name)
            request.update_attributes(:state => MiqQueue::STATE_DEQUEUE)
            request.delivered(*request.deliver)
          end
        end

        it 'gets the transformation log from conversion host' do
          expect(task).to receive(:transformation_log).and_return('transformation migration log content')
          taskid = task.transformation_log_queue('user')
          MiqTask.wait_for_taskid(taskid)
          expect(MiqTask.find(taskid)).to have_attributes(
            :task_results => 'transformation migration log content',
            :status       => 'Ok'
          )
        end

        it 'returns the error message' do
          msg = 'Failed to get transformation migration log for some reason'
          expect(task).to receive(:transformation_log).and_raise(msg)
          taskid = task.transformation_log_queue('user')
          MiqTask.wait_for_taskid(taskid)
          expect(MiqTask.find(taskid).message).to include(msg)
          expect(MiqTask.find(taskid).status).to eq('Error')
        end
      end

      context 'when conversion host does not exist' do
        it 'returns an error message' do
          taskid = task.transformation_log_queue('user')
          expect(MiqTask.find(taskid)).to have_attributes(
            :message => "Conversion host was not found: ID [#{conversion_host_id}]. Cannot queue the download of transformation log.",
            :status  => 'Error'
          )
        end
      end
    end

    describe '#transformation_log' do
      let(:conversion_host) { FactoryGirl.create(:conversion_host, :id => 9, :resource => host) }

      before do
        EvmSpecHelper.create_guid_miq_server_zone
        task.options[:transformation_host_id] = conversion_host.id
        task.options.store_path(:virtv2v_wrapper, "v2v_log", "/path/to/log.file")
        task.save!

        host.update_authentication(:default => {:userid => 'root', :password => 'v2v'})
        allow(described_class).to receive(:find).and_return(task)

        require 'net/scp'
      end

      it 'requires host credential' do
        host.update_authentication(:default => {:userid => 'root', :password => ''})
        expect { task.transformation_log }.to raise_error(MiqException::Error)
      end

      it 'requires transformation log location in options' do
        task.options.store_path(:virtv2v_wrapper, "v2v_log", "")
        expect { task.transformation_log }.to raise_error(MiqException::Error)
      end

      it 'catches errors from net/scp' do
        expect(Net::SCP).to receive(:download!).and_raise('something is wrong')
        expect { task.transformation_log }.to raise_error(RuntimeError)
      end

      it 'gets the transformation log content' do
        msg = 'my transformation migration log'
        expect(Net::SCP).to receive(:download!).and_return(msg)
        expect(task.transformation_log).to eq(msg)
      end
    end

    describe '#mark_vm_migrated' do
      it 'should tag VM as migrated' do
        task.mark_vm_migrated
        expect(vm).to be_is_tagged_with("migrated", :ns => "/managed", :cat => "transformation_status")
      end
    end

    describe '#cancel' do
      it 'catches cancel state' do
        task.cancel
        expect(task.cancelation_status).to eq(MiqRequestTask::CANCEL_STATUS_REQUESTED)
        expect(task.cancel_requested?).to be_truthy
      end
    end
  end

  context 'populated request and task' do
    let(:src_ems) { FactoryGirl.create(:ext_management_system, :zone => FactoryGirl.create(:zone)) }
    let(:src_cluster) { FactoryGirl.create(:ems_cluster, :ext_management_system => src_ems) }
    let(:dst_ems) { FactoryGirl.create(:ext_management_system, :zone => FactoryGirl.create(:zone)) }
    let(:dst_cluster) { FactoryGirl.create(:ems_cluster, :ext_management_system => dst_ems) }

    let(:src_vm_1)  { FactoryGirl.create(:vm_or_template, :ext_management_system => src_ems, :ems_cluster => src_cluster) }
    let(:src_vm_2)  { FactoryGirl.create(:vm_or_template, :ext_management_system => src_ems, :ems_cluster => src_cluster) }
    let(:apst) { FactoryGirl.create(:service_template_ansible_playbook) }

    let(:mapping) do
      FactoryGirl.create(
        :transformation_mapping,
        :transformation_mapping_items => [TransformationMappingItem.new(:source => src_cluster, :destination => dst_cluster)]
      )
    end

    let(:catalog_item_options) do
      {
        :name        => 'Transformation Plan',
        :description => 'a description',
        :config_info => {
          :transformation_mapping_id => mapping.id,
          :pre_service_id            => apst.id,
          :post_service_id           => apst.id,
          :actions                   => [
            {:vm_id => src_vm_1.id.to_s, :pre_service => true, :post_service => true},
            {:vm_id => src_vm_2.id.to_s, :pre_service => false, :post_service => false},
          ],
        }
      }
    end

    let(:plan) { ServiceTemplateTransformationPlan.create_catalog_item(catalog_item_options) }
    let(:request) { FactoryGirl.create(:service_template_transformation_plan_request, :source => plan) }
    let(:task_1) { FactoryGirl.create(:service_template_transformation_plan_task, :miq_request => request, :request_type => 'transformation_plan', :source => src_vm_1) }
    let(:task_2) { FactoryGirl.create(:service_template_transformation_plan_task, :miq_request => request, :request_type => 'transformation_plan', :source => src_vm_2) }

    describe '#transformation_destination' do
      it { expect(task_1.transformation_destination(src_cluster)).to eq(dst_cluster) }
    end

    describe '#pre_ansible_playbook_service_template' do
      it { expect(task_1.pre_ansible_playbook_service_template).to eq(apst) }
      it { expect(task_2.pre_ansible_playbook_service_template).to be_nil }
    end

    describe '#post_ansible_playbook_service_template' do
      it { expect(task_1.post_ansible_playbook_service_template).to eq(apst) }
      it { expect(task_2.post_ansible_playbook_service_template).to be_nil }
    end

    context 'source is vmwarews' do
      let(:src_ems) { FactoryGirl.create(:ems_vmware, :zone => FactoryGirl.create(:zone)) }
      let(:src_host) { FactoryGirl.create(:host, :ext_management_system => src_ems) }
      let(:src_storage) { FactoryGirl.create(:storage, :ext_management_system => src_ems) }

      let(:src_lan_1) { FactoryGirl.create(:lan) }
      let(:src_lan_2) { FactoryGirl.create(:lan) }
      let(:src_nic_1) { FactoryGirl.create(:guest_device_nic, :lan => src_lan_1) }
      let(:src_nic_2) { FactoryGirl.create(:guest_device_nic, :lan => src_lan_2) }

      let(:src_disk_1) { instance_double("disk", :device_name => "Hard disk 1", :device_type => "disk", :filename => "[datastore12] test_vm/test_vm.vmdk", :size => 17_179_869_184) }
      let(:src_disk_2) { instance_double("disk", :device_name => "Hard disk 2", :device_type => "disk", :filename => "[datastore12] test_vm/test_vm-2.vmdk", :size => 17_179_869_184) }

      let(:src_hardware) { FactoryGirl.create(:hardware, :nics => [src_nic_1, src_nic_2]) }

      let(:src_vm_1) { FactoryGirl.create(:vm_vmware, :ext_management_system => src_ems, :ems_cluster => src_cluster, :host => src_host, :hardware => src_hardware) }
      let(:src_vm_2) { FactoryGirl.create(:vm_vmware, :ext_management_system => src_ems, :ems_cluster => src_cluster, :host => src_host) }

      let(:conversion_host) { FactoryGirl.create(:conversion_host) }

      # Disks have to be stubbed because there's no factory for Disk class
      before do
        allow(src_hardware).to receive(:disks).and_return([src_disk_1, src_disk_2])
        allow(src_disk_1).to receive(:storage).and_return(src_storage)
        allow(src_disk_2).to receive(:storage).and_return(src_storage)
        allow(src_vm_1).to receive(:allocated_disk_storage).and_return(34_359_738_368)
        task_1.options[:transformation_host_id] = conversion_host.id
      end

      it "has source_ems" do
        expect(task_1.source_ems).to eq(src_ems)
        expect(task_1.options[:source_ems_id]).to eq(src_ems.id)
      end

      it 'has destination_ems' do
        expect(task_1.destination_ems).to eq(dst_ems)
        expect(task_1.options[:destination_ems_id]).to eq(dst_ems.id)
      end

      context 'destination is rhevm' do
        let(:dst_ems) { FactoryGirl.create(:ems_redhat, :zone => FactoryGirl.create(:zone)) }
        let(:dst_storage) { FactoryGirl.create(:storage) }
        let(:dst_lan_1) { FactoryGirl.create(:lan) }
        let(:dst_lan_2) { FactoryGirl.create(:lan) }

        let(:mapping) do
          FactoryGirl.create(
            :transformation_mapping,
            :transformation_mapping_items => [
              TransformationMappingItem.new(:source => src_cluster, :destination => dst_cluster),
              TransformationMappingItem.new(:source => src_storage, :destination => dst_storage),
              TransformationMappingItem.new(:source => src_lan_1, :destination => dst_lan_1),
              TransformationMappingItem.new(:source => src_lan_2, :destination => dst_lan_2)
            ]
          )
        end

        it "has source_disks" do
          expect(task_1.source_disks).to eq(
            [
              { :path => src_disk_1.filename, :size => src_disk_1.size, :percent => 0, :weight  => 50.0 },
              { :path => src_disk_2.filename, :size => src_disk_2.size, :percent => 0, :weight  => 50.0 }
            ]
          )
        end

        it "has network_mappings" do
          expect(task_1.network_mappings).to eq(
            [
              { :source => src_lan_1.name, :destination => dst_lan_1.name, :mac_address => src_nic_1.address },
              { :source => src_lan_2.name, :destination => dst_lan_2.name, :mac_address => src_nic_2.address }
            ]
          )
        end
      end
    end
  end
end
