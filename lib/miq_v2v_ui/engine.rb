module MiqV2vUI
  class Engine < ::Rails::Engine
    isolate_namespace MiqV2vUI

    def vmdb_plugin?
      true
    end

    initializer 'plugin.assets' do |app|
      app.config.assets.paths << root.join('assets', 'images').to_s
    end

    initializer 'plugin' do
      Menu::CustomLoader.register(
        ::Settings.product.transformation == true ? Menu::Item.new('migration', N_('Migration'), 'migration', {:feature => 'migration', :any => true}, '/migration', :default, :compute) : nil
      )
    end
  end
end
