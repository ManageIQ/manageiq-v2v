$LOAD_PATH.push File.expand_path('../lib', __FILE__)

# Maintain your gem's version:
require 'manageiq/v2v/version'

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = 'manageiq-v2v'
  s.version     = ManageIQ::V2V::VERSION
  s.authors     = ['ManageIQ Authors']
  s.homepage    = 'http://www.manageiq.org'
  s.summary     = 'ManageIQ plugin for v2v trasformations'
  s.description = 'ManageIQ plugin for v2v trasformations'
  s.license     = 'MIT'

  s.files = Dir['{app,config,db,lib}/**/*', 'Rakefile', 'README.md']

  s.add_dependency 'rails', '~> 5.0.0', '>= 5.0.0.1'

  s.add_development_dependency 'sqlite3'
end
