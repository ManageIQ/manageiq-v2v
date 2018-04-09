# MiqV2vUI::Engine.routes.draw do
if ::Settings.product.transformation == true
  Rails.application.routes.draw do
    match '/migration' => 'migration#index', :via => [:get]
    match 'migration/*page' => 'migration#index', :via => [:get]
  end
end
