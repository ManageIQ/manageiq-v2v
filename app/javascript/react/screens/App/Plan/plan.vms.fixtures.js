const sampleVmResult = {
  href: 'http://localhost:3000/api/vms/1',
  id: '1',
  vendor: 'vmware',
  format: null,
  version: null,
  name: 'ckeller_ovmt_test',
  description: null,
  location: 'ckeller_ovmt_test/ckeller_ovmt_test.vmx',
  config_xml: null,
  autostart: null,
  host_id: '1',
  last_sync_on: null,
  created_on: '2017-10-06T16:41:11Z',
  updated_on: '2017-11-11T21:25:53Z',
  storage_id: '1',
  guid: '1e4ad001-a085-4beb-83b9-e59675f96bab',
  ems_id: '1',
  last_scan_on: null,
  last_scan_attempt_on: null,
  uid_ems: '564de498-ebec-e90e-660e-1133ae8ad462',
  retires_on: null,
  retired: null,
  boot_time: null,
  tools_status: 'toolsNotRunning',
  standby_action: 'checkpoint',
  power_state: 'off',
  state_changed_on: '2017-11-11T21:25:31Z',
  previous_state: 'poweredOn',
  connection_state: 'connected',
  last_perf_capture_on: '2017-11-07T22:45:20Z',
  registered: null,
  busy: null,
  smart: null,
  memory_reserve: 0,
  memory_reserve_expand: false,
  memory_limit: -1,
  memory_shares: 20480,
  memory_shares_level: 'normal',
  cpu_reserve: 0,
  cpu_reserve_expand: false,
  cpu_limit: -1,
  cpu_shares: 2000,
  cpu_shares_level: 'normal',
  cpu_affinity: null,
  ems_created_on: null,
  template: false,
  evm_owner_id: null,
  ems_ref_obj: 'vm-917',
  miq_group_id: '1',
  linked_clone: true,
  fault_tolerance: false,
  type: 'ManageIQ::Providers::Vmware::InfraManager::Vm',
  ems_ref: 'vm-917',
  ems_cluster_id: '1',
  retirement_warn: null,
  retirement_last_warn: null,
  vnc_port: null,
  flavor_id: null,
  availability_zone_id: null,
  cloud: false,
  retirement_state: null,
  cloud_network_id: null,
  cloud_subnet_id: null,
  cloud_tenant_id: null,
  raw_power_state: 'poweredOff',
  publicly_available: null,
  orchestration_stack_id: null,
  retirement_requester: null,
  tenant_id: '1',
  resource_group_id: null,
  deprecated: null,
  storage_profile_id: null,
  cpu_hot_add_enabled: false,
  cpu_hot_remove_enabled: false,
  memory_hot_add_enabled: false,
  memory_hot_add_limit: null,
  memory_hot_add_increment: null,
  hostname: null,
  actions: [
    {
      name: 'edit',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'add_lifecycle_event',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'add_event',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'refresh',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'shutdown_guest',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'reboot_guest',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'start',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'stop',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'suspend',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'shelve',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'shelve_offload',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'pause',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'request_console',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'reset',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'retire',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'delete',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'set_owner',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'set_ownership',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'set_miq_server',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'scan',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'delete',
      method: 'delete',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'button 1',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'button 2',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'button3',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    },
    {
      name: 'button 4',
      method: 'post',
      href: 'http://localhost:3000/api/vms/1'
    }
  ]
};

const queryVmsResults = [];
for (let i = 1; i <= 30; i += 1) {
  queryVmsResults.push({
    ...sampleVmResult,
    href: `http://localhost:3000/api/vms/${i}`,
    id: i,
    name: `boston_VM${i}`
  });
}

export const queryVmsData = {
  method: 'POST',
  fetchPlanRequestUrl: '/api/dummyVms',
  response: { data: { results: queryVmsResults } }
};
