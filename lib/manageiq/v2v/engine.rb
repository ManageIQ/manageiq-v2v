module ManageIQ::V2V
  class Engine < ::Rails::Engine
    isolate_namespace ManageIQ::V2V

    def vmdb_plugin?
      true
    end

    initializer 'plugin.assets' do |app|
      app.config.assets.paths << root.join('assets', 'images').to_s
    end

    initializer 'plugin' do
      Menu::CustomLoader.register(
        Menu::Section.new(:migration, N_("Migration"), 'fa fa-plus', [
          Menu::Item.new('overview', N_("Overview"), 'migration', {:feature => 'migration', :any => true}, '/migration/overview'),
          Menu::Item.new('mappings', N_("Infrastructure Mappings"), 'mappings', {:feature => 'mappings', :any => true}, '/migration/mappings'),
          Menu::Item.new('settings', N_("Migration Settings"), 'migration_settings', {:feature => 'migration_settings', :any => true}, '/migration/settings')
        ], nil, nil, nil, nil, :compute)
      )
    end

    def self.plugin_name
      _('V2V')
    end
  end
end
