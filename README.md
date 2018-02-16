# ManageIQ V2V UI plugin

[![Build Status](https://travis-ci.org/priley86/miq_v2v_ui_plugin.svg?branch=master)](https://travis-ci.org/priley86/miq_v2v_ui_plugin)

The aim of this plugin is to provide UI infrastructure to ManageIQ for the V2V effort.

## Current features

### Quick demo

![Demo](docs/images/quick_demo.gif)

* Allow per plugin package.json to include your own kind of dependencies.
* Supports webpack based development with hot live reload
* Uses React component registry (currently from https://github.com/ohadlevy/manageiq-ui-classic/tree/2132) - it's aim is
  have an official API how to publish top level reuseable components and how to consume them across multiple plugins.
* Uses ReactJS
* Uses patternfly-react
* Uses ReactRouter and integration with rails routes so it can refresh the URL back to the same page
* Uses Jest with snapshot testing
* Adds Compute -> Migration -> Overview page as demo.

## TODO

* Add Redux Support
* .. and much more :-)

## Usage

You need to checkout manageiq, manageiq-ui-classic next to each other and setup the gem overrides.

Uses the following branch of manageiq-ui-classic to add Migration to the navigation menu:

```
https://github.com/priley86/manageiq-ui-classic/tree/v2v
```

Make sure to add this `miq_v2v_ui` gem to your `bundler.d/Gemfile.dev.rb` in `manageiq`:

```ruby
gem 'miq_v2v_ui', :path => File.expand_path('../../miq_v2v_ui_plugin', __dir__)
```
