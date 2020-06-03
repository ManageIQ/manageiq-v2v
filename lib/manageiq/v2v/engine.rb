module ManageIQ::V2V
  class Engine < ::Rails::Engine
    isolate_namespace ManageIQ::V2V

    def self.vmdb_plugin?
      true
    end

    initializer 'plugin.assets' do |app|
      app.config.assets.paths << root.join('assets', 'images').to_s
    end

    initializer 'plugin.filter' do |app|
      app.config.filter_parameters += %i[conversion_host_ssh_private_key openstack_tls_ca_certs vmware_ssh_private_key]
    end

    def self.menu
      [
        Menu::Section.new(:migration, N_("Migration"), 'pficon pficon-migration', [
          Menu::Item.new('plans', N_("Migration Plans"), 'migration', {:feature => 'migration', :any => true}, '/migration#/plans'),
          Menu::Item.new('mappings', N_("Infrastructure Mappings"), 'mappings', {:feature => 'mappings', :any => true}, '/migration#/mappings'),
          Menu::Item.new('settings', N_("Migration Settings"), 'migration_settings', {:feature => 'migration_settings', :any => true}, '/migration#/settings')
        ], nil, :con), # Place Migration before Control (after the various Provider kinds)
      ]
    end

    def self.plugin_name
      _('V2V')
    end
  end
end
