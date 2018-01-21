$LOAD_PATH.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'miq_v2v_ui/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'miq_v2v_ui'
  s.version     = MiqV2vUI::VERSION
  s.authors     = ['Patrick Riley']
  s.email       = ['priley86@gmail.com']
  s.homepage    = 'http://www.manageiq.org'
  s.summary     = 'ManageIQ v2v plugin'
  s.description = 'ManageIQ plugin'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 5.0.0', '>= 5.0.0.1'

  s.add_development_dependency 'sqlite3'
end
