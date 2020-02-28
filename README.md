# ManageIQ V2V plugin

[![Gem Version](https://badge.fury.io/rb/manageiq-v2v.svg)](http://badge.fury.io/rb/manageiq-v2v)
[![Build Status](https://travis-ci.org/ManageIQ/manageiq-v2v.svg?branch=jansa)](https://travis-ci.org/ManageIQ/manageiq-v2v)
[![Code Climate](https://codeclimate.com/github/ManageIQ/manageiq-v2v.svg)](https://codeclimate.com/github/ManageIQ/manageiq-v2v)
[![Test Coverage](https://codeclimate.com/github/ManageIQ/manageiq-v2v/badges/coverage.svg)](https://codeclimate.com/github/ManageIQ/manageiq-v2v/coverage)
[![Security](https://hakiri.io/github/ManageIQ/manageiq-v2v/jansa.svg)](https://hakiri.io/github/ManageIQ/manageiq-v2v/jansa)

[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/v2v?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Translate](https://img.shields.io/badge/translate-zanata-blue.svg)](https://translate.zanata.org/zanata/project/view/manageiq-v2v)


## Purpose

The purpose of this repository is to provide UI infrastructure to ManageIQ for the V2V effort. V2V is an acronym for virtual to virtual, referring to the process of importing virtual machines from one virtualization platform to another.

## License

The gem is available as open source under the terms of the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

### Current features

* Define infrastructure mappings for migrating disks and lans from a source cluster to a destination cluster
* Define migration plans for one or more VMs associated with the infrastructure mapping
* Run a migration plan and obvserve the migration status for each VM

### Architecture Goals

* Use REST API communication with [ManageIQ API](http://manageiq.org/docs/api)
* Create a [ManageIQ Plugin](https://github.com/ManageIQ/guides/blob/master/developer_setup/plugins.md)/seperate Rails Engine to handle V2V interactions
* Use Ryan Florence's [folder structure](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346) for React apps within a Rails application.
* Adds Compute -> Migration section to ManageIQ.

### Technologies Used

* The plugin uses [PatternFly](https://github.com/patternfly/patternfly) and [PatternFly React](https://github.com/patternfly/patternfly-react) UI dependencies
* Uses Redux and [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware) for API middleware
* Use [Jest](https://facebook.github.io/jest/) for snapshot testing UI components

## Usage

V2V plugin is now installed in the appliance build of ManageIQ. You can find it referenced alongside other gems in the [ManageIQ Gemfile](https://github.com/ManageIQ/manageiq/blob/master/Gemfile).

For development, you need to checkout manageiq, manageiq-ui-classic, and the v2v plugin next to each other and setup the gem overrides.

Make sure to add this `manageiq-v2v` gem to your `bundler.d/Gemfile.dev.rb` in `manageiq`:

```ruby
override_gem 'manageiq-v2v', :path => File.expand_path('../../manageiq-v2v/', __dir__)
```
