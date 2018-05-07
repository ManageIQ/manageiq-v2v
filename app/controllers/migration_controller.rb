# Migration controller - mostly service to initialize the react top level component
# and to handle the initial routing endpoint.
class MigrationController < ApplicationController
  def index
    # this sets the active menu item, must match the item name in lib/miq_v2v_ui/engine.rb
    @layout = 'migration'
  end

  menu_section :migration
end
