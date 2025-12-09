# ManageIQ::V2V

[![Build Status](https://travis-ci.com/ManageIQ/manageiq-v2v.svg?branch=master)](https://travis-ci.com/github/ManageIQ/manageiq-v2v)

[![Chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/ManageIQ/v2v?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

V2V plugin for ManageIQ.

## Purpose

The purpose of this repository is to provide UI infrastructure to ManageIQ for the V2V effort. V2V is an acronym for virtual to virtual, referring to the process of importing virtual machines from one virtualization platform to another.

### Current features

* Adds Compute -> Migration section to ManageIQ.
* Define infrastructure mappings for migrating disks and lans from a source cluster to a destination cluster
* Define migration plans for one or more VMs associated with the infrastructure mapping
* Run a migration plan and observe the migration status for each VM

### Technologies Used

* The plugin uses [PatternFly](https://github.com/patternfly/patternfly) and [PatternFly React](https://github.com/patternfly/patternfly-react) UI dependencies
* Uses Redux and [Redux Promise Middleware](https://github.com/pburtchaell/redux-promise-middleware) for API middleware
* Use [Jest](https://facebook.github.io/jest/) for snapshot testing UI components
* Use Ryan Florence's [folder structure](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346) for React apps within a Rails application.

## Development

See the section on plugins in the [ManageIQ Developer Setup](http://manageiq.org/docs/guides/developer_setup/plugins)

For quick local setup run `bin/setup`, which will clone the core ManageIQ repository under the *spec* directory and setup necessary config files. If you have already cloned it, you can run `bin/update` to bring the core ManageIQ code up to date.

## License

The gem is available as open source under the terms of the [Apache License 2.0](http://www.apache.org/licenses/LICENSE-2.0).

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

