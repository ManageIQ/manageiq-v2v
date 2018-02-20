import Immutable from 'seamless-immutable';

// returns sample datastores for a single cluster
export const sourceClusterNetworks = {
  href: 'http://localhost:3000/api/clusters/1',
  id: '1',
  name: 'Raleigh',
  ems_id: '1',
  created_on: '2017-10-06T16:41:09Z',
  updated_on: '2018-01-20T23:12:00Z',
  uid_ems: 'domain-c7',
  ha_enabled: false,
  ha_admit_control: true,
  ha_max_failures: 1,
  drs_enabled: false,
  drs_automation_level: 'fullyAutomated',
  drs_migration_threshold: 3,
  last_perf_capture_on: null,
  ems_ref_obj: 'domain-c7',
  effective_cpu: 109356,
  effective_memory: 790163881984,
  ems_ref: 'domain-c7',
  type: null,
  lans: [
    {
      href: 'http://localhost:3000/api/lans/10000000000007',
      id: '10000000000007',
      switch_id: '10000000000004',
      name: 'vm_network1',
      tag: '23',
      created_on: '2017-06-01T04:24:18Z',
      updated_on: '2017-06-01T04:24:18Z',
      uid_ems: '6b5aeda1-18b5-4c15-a194-40ded9004ba3',
      allow_promiscuous: null,
      forged_transmits: null,
      mac_changes: null,
      computed_allow_promiscuous: null,
      computed_forged_transmits: null,
      computed_mac_changes: null,
      parent_id: null
    },
    {
      href: 'http://localhost:3000/api/lans/10000000000008',
      id: '10000000000008',
      switch_id: '10000000000005',
      name: 'vm_network2',
      tag: '24',
      created_on: '2017-06-01T04:24:18Z',
      updated_on: '2017-06-01T04:24:18Z',
      uid_ems: '41326e72-3edc-4af9-bb78-fb9f415e6f86',
      allow_promiscuous: null,
      forged_transmits: null,
      mac_changes: null,
      computed_allow_promiscuous: null,
      computed_forged_transmits: null,
      computed_mac_changes: null,
      parent_id: null
    }
  ]
};

export const targetClusterNetworks = {
  href: 'http://localhost:3000/api/clusters/1',
  id: '1',
  name: 'Raleigh',
  ems_id: '1',
  created_on: '2017-10-06T16:41:09Z',
  updated_on: '2018-01-20T23:12:00Z',
  uid_ems: 'domain-c7',
  ha_enabled: false,
  ha_admit_control: true,
  ha_max_failures: 1,
  drs_enabled: false,
  drs_automation_level: 'fullyAutomated',
  drs_migration_threshold: 3,
  last_perf_capture_on: null,
  ems_ref_obj: 'domain-c7',
  effective_cpu: 109356,
  effective_memory: 790163881984,
  ems_ref: 'domain-c7',
  type: null,
  lans: [
    {
      href: 'http://localhost:3000/api/lans/10000000000011',
      id: '10000000000011',
      switch_id: '10000000000008',
      name: 'ovirtmgmt',
      tag: null,
      created_on: '2017-06-01T04:24:18Z',
      updated_on: '2017-06-01T04:24:18Z',
      uid_ems: '00000000-0000-0000-0000-000000000009',
      allow_promiscuous: null,
      forged_transmits: null,
      mac_changes: null,
      computed_allow_promiscuous: null,
      computed_forged_transmits: null,
      computed_mac_changes: null,
      parent_id: null
    },
    {
      href: 'http://localhost:3000/api/lans/10000000000018',
      id: '10000000000018',
      switch_id: '10000000000015',
      name: 'ovirtmgmt',
      tag: null,
      created_on: '2017-06-01T04:24:19Z',
      updated_on: '2017-06-01T04:24:19Z',
      uid_ems: '00000000-0000-0000-0000-000000000009',
      allow_promiscuous: null,
      forged_transmits: null,
      mac_changes: null,
      computed_allow_promiscuous: null,
      computed_forged_transmits: null,
      computed_mac_changes: null,
      parent_id: null
    },

    {
      href: 'http://localhost:3000/api/lans/10000000000016',
      id: '10000000000016',
      switch_id: '10000000000013',
      name: 'ovirtmgmt',
      tag: null,
      created_on: '2017-06-01T04:24:19Z',
      updated_on: '2017-06-01T04:24:19Z',
      uid_ems: '00000000-0000-0000-0000-000000000009',
      allow_promiscuous: null,
      forged_transmits: null,
      mac_changes: null,
      computed_allow_promiscuous: null,
      computed_forged_transmits: null,
      computed_mac_changes: null,
      parent_id: null
    }
  ]
};

export const requestSourceNetworksData = {
  method: 'GET',
  response: { data: sourceClusterNetworks }
};

export const requestTargetNetworksData = {
  method: 'GET',
  response: { data: targetClusterNetworks }
};

export const initialState = Immutable({
  sourceClusterNetworks: {},
  targetClusterNetworks: {},
  fetchNetworksUrl: '/api/dummyClusters'
});
