# MiqV2vUI::Engine.routes.draw do
Rails.application.routes.draw do
  match '/migration' => 'migration#index', :via => [:get]
  match 'migration/*page' => 'migration#index', :via => [:get]
end
