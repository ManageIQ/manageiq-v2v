import Immutable from 'seamless-immutable';

export const transformationMappingsResult = Immutable({
  results: [
    {
      href: 'http://localhost:3000/api/transformation_mappings/10000000000001',
      id: '10000000000001',
      name: 'Cluster and Datastores',
      description: 'Cluster and Datastores Mapping',
      comments: null,
      state: 'draft',
      options: {},
      tenant_id: null,
      created_at: '2018-02-07T16:02:39Z',
      updated_at: '2018-02-07T16:02:39Z'
    }
  ]
});

export const requestTransformationMappingsData = {
  method: 'POST',
  postMappingsUrl: '/api/dummyTransformationMappings',
  response: { data: transformationMappingsResult }
};

export const initialState = Immutable({
  transformationMappingsResult: {},
  postMappingsUrl: requestTransformationMappingsData.postMappingsUrl
});
