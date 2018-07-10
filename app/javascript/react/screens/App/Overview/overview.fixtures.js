import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: false,
  planWizardVisible: false,
  hidePlanWizard: false,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  fetchTransformationMappingsUrl: '/api/dummyMappings',
  transformationPlans: [],
  fetchTransformationPlansUrl: '/api/dummyTransformationPlans',
  fetchArchivedTransformationPlansUrl: '/api/dummyArchivedTransformationPlans',
  clusters: [],
  isRejectedClusters: false,
  isFetchingClusters: false,
  fetchClustersUrl: '/api/dummyClusters',
  datastores: [],
  isRejectedDatastores: false,
  isFetchingDatastores: false,
  fetchDatastoresUrl: '/api/dummyDatastores',
  networks: [],
  isRejectedNetworks: false,
  isFetchingNetworks: false,
  fetchNetworksUrl: '/api/dummyNetworks'
});

export const transformationMappings = [
  {
    id: '10000000000001',
    name: 'Mapping 1',
    description: 'infrastructre mapping 1 description',
    comments: null,
    state: 'draft',
    options: {},
    tenant_id: null,
    created_at: '2018-02-07T16:02:39Z',
    updated_at: '2018-02-07T16:02:39Z',
    transformation_mapping_items: [
      {
        id: '10000000000001',
        source_id: '10000000000002',
        source_type: 'EmsCluster',
        destination_id: '10000000000005',
        destination_type: 'EmsCluster',
        transformation_mapping_id: '10000000000001',
        options: {},
        created_at: '2018-02-07T16:01:44Z',
        updated_at: '2018-02-07T16:02:39Z'
      },
      {
        id: '10000000000002',
        source_id: '10000000000001',
        source_type: 'Storage',
        destination_id: '10000000000018',
        destination_type: 'Storage',
        transformation_mapping_id: '10000000000002',
        options: {},
        created_at: '2018-02-07T16:05:04Z',
        updated_at: '2018-02-07T16:05:04Z'
      }
    ]
  },
  {
    id: '10000000000002',
    name: 'Mapping 2',
    description: 'infrastructre mapping 2 description',
    comments: null,
    state: 'draft',
    options: {},
    tenant_id: null,
    created_at: '2018-02-07T16:02:39Z',
    updated_at: '2018-02-07T16:02:39Z',
    transformation_mapping_items: [
      {
        id: '10000000000001',
        source_id: '10000000000003',
        source_type: 'EmsCluster',
        destination_id: '10000000000005',
        destination_type: 'EmsCluster',
        transformation_mapping_id: '10000000000002',
        options: {},
        created_at: '2018-02-07T16:01:44Z',
        updated_at: '2018-02-07T16:02:39Z'
      },
      {
        id: '10000000000004',
        source_id: '10000000000004',
        source_type: 'Storage',
        destination_id: '10000000000019',
        destination_type: 'Storage',
        transformation_mapping_id: '10000000000002',
        options: {},
        created_at: '2018-02-07T16:05:04Z',
        updated_at: '2018-02-07T16:05:04Z'
      }
    ]
  }
];

export const createTransformationPlanRequestResponse = {
  href: 'http://localhost:3000/api/service_requests/30',
  id: '30',
  description: 'Provisioning Service [plan_test6] from [plan_test6]',
  approval_state: 'pending_approval',
  type: 'ServiceTemplateTransformationPlanRequest',
  created_on: '2018-02-22T22:50:41Z',
  updated_on: '2018-02-22T22:50:41Z',
  fulfilled_on: null,
  requester_id: '1',
  requester_name: 'Administrator',
  request_type: 'transformation_plan',
  request_state: 'pending',
  message: 'VM Transformations - Request Created',
  status: 'Ok',
  options: {
    dialog: null,
    workflow_settings: {
      resource_action_id: '312'
    },
    initiator: null,
    src_id: '32',
    cart_state: 'ordered',
    requester_group: 'EvmGroup-super_administrator'
  },
  userid: 'admin',
  source_id: '32',
  source_type: 'ServiceTemplate',
  destination_id: null,
  destination_type: null,
  tenant_id: '1',
  service_order_id: '41',
  process: true
};

export const requestTransformationMappingsData = {
  method: 'GET',
  fetchTransformationMappingsUrl: initialState.fetchTransformationMappingsUrl,
  response: { data: { resources: transformationMappings } }
};

export const createTransformationPlanRequestData = {
  method: 'POST',
  response: { data: createTransformationPlanRequestResponse }
};
