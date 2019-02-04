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

export const requestSourceClustersData = {
  method: 'GET',
  fetchSourceClustersUrl: '/api/dummyProviders',
  response: { data: sourceClusters }
};

export const initialState = Immutable({
  sourceClusters: [],
  fetchSourceClustersUrl: requestSourceClustersData.fetchSourceClustersUrl
});
