# Change Log

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)


## Hammer-5

### Added
- Use conversion_hosts API for RHV target cluster warnings instead of host CF tags [(#847)](https://github.com/ManageIQ/manageiq-v2v/pull/847)
- Rename Concurrent Migrations to Migration Throttling [(#892)](https://github.com/ManageIQ/manageiq-v2v/pull/892)
- Add info popover to broken infra mapping error icons [(#906)](https://github.com/ManageIQ/manageiq-v2v/pull/906)
- Phase 2 of vertical menu fixes [(#822)](https://github.com/ManageIQ/manageiq-v2v/pull/822)
- Add 'Status Detail' enhanced error message to info popover on a migration task [(#918)](https://github.com/ManageIQ/manageiq-v2v/pull/918)
- Conversion Host Wizard: set the auth_user to 'root' for RHV hosts [(#924)](https://github.com/ManageIQ/manageiq-v2v/pull/924)
- Conversion Host Enablement - List View - Add Retry button with modal for re-entering SSH keys [(#916)](https://github.com/ManageIQ/manageiq-v2v/pull/916)
- Plan Wizard VMs Step - VMWare Folder View [(#917)](https://github.com/ManageIQ/manageiq-v2v/pull/917)
- Conversion Host Configuration Wizard - rename API field from ssh_key to conversion_host_ssh_private_key [(#913)](https://github.com/ManageIQ/manageiq-v2v/pull/913)
- Fix conversion host removal modal [(#909)](https://github.com/ManageIQ/manageiq-v2v/pull/909)
- Conversion Host Configuration Wizard - Properly pass SSH keys and VDDK path to API [(#908)](https://github.com/ManageIQ/manageiq-v2v/pull/908)
- Add new options for migration throttling [(#897)](https://github.com/ManageIQ/manageiq-v2v/pull/897)
- Conversion Host Configuration - List view #3 - Polling for tasks and rendering enable/disable status [(#889)](https://github.com/ManageIQ/manageiq-v2v/pull/889)
- Rename Concurrent Migrations to Migration Throttling [(#892)](https://github.com/ManageIQ/manageiq-v2v/pull/892)
- Conversion Host: list view phase 2 [(#882)](https://github.com/ManageIQ/manageiq-v2v/pull/882)
- Conversion Host Configuration Wizard - Step #2 - Host(s) [(#876)](https://github.com/ManageIQ/manageiq-v2v/pull/876)
- Conversion Host Configuration Wizard - Step #4 - Results (without passing SSH keys) [(#883)](https://github.com/ManageIQ/manageiq-v2v/pull/883)
- Conversion Host Configuration Wizard - Step #3 - Authentication [(#880)](https://github.com/ManageIQ/manageiq-v2v/pull/880)
- Conversion Hosts: list view phase 1 [(#874)](https://github.com/ManageIQ/manageiq-v2v/pull/874)
- Conversion Host Configuration Wizard Step #1 (Location), and introducing common reducers [(#871)](https://github.com/ManageIQ/manageiq-v2v/pull/871)
- Conversion Hosts: add initial button for empty state screen [(#864)](https://github.com/ManageIQ/manageiq-v2v/pull/864)
- Add skeleton for Configure Conversion Host wizard steps [(#863)](https://github.com/ManageIQ/manageiq-v2v/pull/863)
- Add skeleton for Conversion Hosts Settings components [(#858)](https://github.com/ManageIQ/manageiq-v2v/pull/858)
- Add routed tabs to the Settings page to prepare for Conversion Hosts settings [(#851)](https://github.com/ManageIQ/manageiq-v2v/pull/851)
- Add "Flavor" and "Security Group" CSV columns and associated warnings [(#845)](https://github.com/ManageIQ/manageiq-v2v/pull/845)

### Fixed
- Prevent Settings form from being destroyed on unmount [(#839)](https://github.com/ManageIQ/manageiq-v2v/pull/839)
- Edit Plan: fetch correct status of pre-selected VMs using VM validation service [(#841)](https://github.com/ManageIQ/manageiq-v2v/pull/841)
- Conversion Host Configuration Wizard - use correct default cloud-user (with a dash) instead of cloud_user [(894)](https://github.com/ManageIQ/manageiq-v2v/pull/894)
- Conversion Host Settings page: Ensure task.meta will always be defined [(#907)](https://github.com/ManageIQ/manageiq-v2v/pull/907)
- Fix breadcrumb bars to be consistent with the rest of CloudForms [(#925)](https://github.com/ManageIQ/manageiq-v2v/pull/925)
- Migration Plans in Progress page: fix error with deleted target provider [(#923)](https://github.com/ManageIQ/manageiq-v2v/pull/923)
- Fix call to transformation_log_queue [(#926)](https://github.com/ManageIQ/manageiq-v2v/pull/926)
- Conversion Host Settings - Unit tests for helpers, prevent corner case of reappearing failures [(#928)](https://github.com/ManageIQ/manageiq-v2v/pull/928)
- Filter cloud_tenants to Openstack providers explicitly (prevents errors with RHV-4.3 providers) [(#920)](https://github.com/ManageIQ/manageiq-v2v/pull/920)

## Hammer-4 - Released 2019-03-29

### Added
- V2v specify migration log type [(#887)](https://github.com/ManageIQ/manageiq-v2v/pull/887)
- Add Virt-v2v-wrapper log download menu item [(#888)](https://github.com/ManageIQ/manageiq-v2v/pull/888)
- Set backdrop='static' on all modals to prevent accidentally closing them [(#844)](https://github.com/ManageIQ/manageiq-v2v/pull/844)

### Fixed
- Fetch providers first [(#849)](https://github.com/ManageIQ/manageiq-v2v/pull/849)
