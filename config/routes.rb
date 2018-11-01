# ManageIQ::V2V::Engine.routes.draw do
Rails.application.routes.draw do
  match '/migration' => redirect('/migration/overview'), :via => [:get]
  match '/migration/overview' => 'migration#index', :via => [:get]
  match '/migration/mappings' => 'migration#index', :via => [:get]
  match '/migration/plan/:id' => 'migration#index', :via => [:get]
  match 'migration/*page' => 'migration#index', :via => [:get]

  get "migration_log/download_migration_log(/:id)",
    :action     => 'download_migration_log',
    :controller => 'migration_log'
end
