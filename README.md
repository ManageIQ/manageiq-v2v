# ManageIQ V2V plugin

[![Build Status](https://travis-ci.org/ManageIQ/manageiq-v2v.svg?branch=master)](https://travis-ci.org/ManageIQ/manageiq-v2v)

## Purpose

The purpose of this repository is to provide UI infrastrucutre to ManageIQ for the V2V effort. V2V is an acronym for virtual to virtual, referring to the process of importing virtual machines from one virtualization platform to another.

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
