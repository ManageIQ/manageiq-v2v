module ManageIQ::V2V
  class Engine < ::Rails::Engine
    isolate_namespace ManageIQ::V2V

    def vmdb_plugin?
      true
    end

    initializer 'plugin.assets' do |app|
      app.config.assets.paths << root.join('assets', 'images').to_s
    end

    def render_migration_menu
      Menu::CustomLoader.register(
        Menu::Section.new(:migration, N_("Migration"), 'fa fa-plus', [
          Menu::Item.new('migration', N_("Overview"), 'miq_report', {:feature => 'miq_report', :any => true}, '/migration'),
          Menu::Item.new('mappings', N_("Infrastructure Mappings"), 'miq_report', {:feature => 'miq_report', :any => true}, '/migration#/mappings'),
          Menu::Item.new('settings', N_("Migration Settings"), 'miq_report', {:feature => 'miq_report', :any => true}, '/migration#/settings')
        ], nil, nil, nil, nil, :compute)
      )
    end

    initializer 'plugin' do
      Menu::CustomLoader.register(::Settings.product.ims == true ? render_migration_menu : nil)
    end

    def self.plugin_name
      _('V2V')
    end
  end
end
