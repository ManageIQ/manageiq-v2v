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
        Menu::Item.new('migration', N_('Migration'), 'migration', {:feature => 'migration', :any => true}, '/migration', :default, :compute)
      )
    end
  end
end
