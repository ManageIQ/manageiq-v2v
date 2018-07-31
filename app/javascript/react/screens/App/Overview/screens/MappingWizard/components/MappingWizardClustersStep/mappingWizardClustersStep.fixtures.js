import Immutable from 'seamless-immutable';

export const sourceClusters = Immutable({
  name: 'clusters',
  count: 5,
  subcount: 1,
  subquery_count: 1,
  pages: 1,
  resources: [
    {
      href: 'http://localhost:3000/api/clusters/10000000000001',
      id: '1',
      name: 'VMWare Cluster1',
      ems_id: '10000000000012',
      created_on: '2016-07-15T18:28:16Z',
      updated_on: '2016-07-15T18:28:16Z',
      uid_ems: '00000002-0002-0002-0002-00000000024b',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      type: null,
      ext_management_system: { emstype: 'vmwarews' },
      v_parent_datacenter: 'Datacenter'
    },
    {
      href: 'http://localhost:3000/api/clusters/10000000000002',
      id: '2',
      name: 'VMWare Cluster2',
      ems_id: '10000000000012',
      created_on: '2016-07-15T18:28:16Z',
      updated_on: '2016-07-15T18:28:16Z',
      uid_ems: '00000002-0002-0002-0002-00000000024b',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      type: null,
      ext_management_system: { emstype: 'vmwarews' },
      v_parent_datacenter: 'Datacenter'
    },
    {
      href: 'http://localhost:3000/api/clusters/10000000000003',
      id: '3',
      name: 'VMWare Cluster3',
      ems_id: '10000000000012',
      created_on: '2016-07-15T18:28:16Z',
      updated_on: '2016-07-15T18:28:16Z',
      uid_ems: '00000002-0002-0002-0002-00000000024b',
      ha_enabled: null,
      ha_admit_control: null,
      ha_max_failures: null,
      drs_enabled: null,
      drs_automation_level: null,
      drs_migration_threshold: null,
      last_perf_capture_on: null,
      ems_ref_obj: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      effective_cpu: null,
      effective_memory: null,
      ems_ref: '/api/clusters/00000002-0002-0002-0002-00000000024b',
      type: null,
      ext_management_system: { emstype: 'vmwarews' },
      v_parent_datacenter: 'Datacenter'
    }
  ]
});

export const targetClusters = Immutable({
  name: 'clusters',
  count: 5,
  subcount: 2,
  subquery_count: 2,
  pages: 1,
  resources: [
    {
      href: 'http://localhost:3000/api/clusters/10000000000006',
      id: '1',
      name: 'RHV Cluster1',
      ems_id: '10000000000007',
      created_on: '2016-08-03T02:19:35Z',
      updated_on: '2017-02-26T02:33:43Z',
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
      effective_memory: 789977235456,
      ems_ref: 'domain-c7',
      type: null,
      ext_management_system: { emstype: 'rhevm' },
      v_parent_datacenter: 'Default'
    },
    {
      href: 'http://localhost:3000/api/clusters/10000000000007',
      id: '2',
      name: 'RHV Cluster2',
      ems_id: '10000000000008',
      created_on: '2016-08-03T02:19:35Z',
      updated_on: '2017-02-26T02:33:43Z',
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
      effective_memory: 789977235456,
      ems_ref: 'domain-c7',
      type: null,
      ext_management_system: { emstype: 'rhevm' },
      v_parent_datacenter: 'Default'
    }
  ]
});

export const requestSourceClustersData = {
  method: 'GET',
  fetchSourceClustersUrl: '/api/dummyProviders',
  response: { data: sourceClusters }
};

export const requestTargetClustersData = {
  method: 'GET',
  fetchTargetClustersUrl: '/api/dummyProviders',
  response: { data: targetClusters }
};

export const initialState = Immutable({
  sourceClusters: [],
  targetClusters: [],
  fetchSourceClustersUrl: requestSourceClustersData.fetchSourceClustersUrl,
  fetchTargetComputeUrls: {
    rhevm: '/api/dummy',
    openstack: '/api/dummy'
  }
});
