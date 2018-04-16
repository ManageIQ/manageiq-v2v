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
  clusters: [],
  fetchClustersUrl: '/api/dummyClusters'
});

export const transformationMappings = [
  {
    id: '10000000000001',
    name: 'Infrastructre Mapping 1',
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
    name: 'Infrastructure Mapping 2',
    description: 'infrastructre mapping 2 description',
    comments: null,
    state: 'draft',
    options: {},
    tenant_id: null,
    created_at: '2018-02-07T16:02:39Z',
    updated_at: '2018-02-07T16:02:39Z',
    transformation_mapping_items: [
      {
        id: '10000000000003',
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

export const requestTransformationMappingsData = {
  method: 'GET',
  fetchTransformationMappingsUrl: initialState.fetchTransformationMappingsUrl,
  response: { data: { resources: transformationMappings } }
};
