import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  mappingWizardVisible: false,
  hideMappingWizard: false,
  planWizardVisible: false,
  hidePlanWizard: false,
  transformationMappings: [],
  isRejectedTransformationMappings: false,
  isFetchingTransformationMappings: false,
  fetchTransformationMappingsUrl: '/api/dummyMappings'
});

export const transformationMappings = [
  {
    name: 'new transformation mapping',
    description: 'clusters to clusters',
    state: 'draft',
    transformation_mapping_items: [
      { source: '/api/clusters/10', destination: '/api/clusters/1' },
      { source: '/api/clusters/11', destination: '/api/clusters/1' },
      { source: '/api/date_stores/12', destination: '/api/data_stores/13' },
      { source: '/api/data_stores/2', destination: '/api/data_stores/13' },
      { source: '/api/lans/2', destination: '/api/lans/13' },
      { source: '/api/lans/3', destination: '/api/lans/13' }
    ]
  }
];

export const requestTransformationMappingsData = {
  method: 'GET',
  fetchTransformationMappingsUrl: initialState.fetchTransformationMappingsUrl,
  response: { data: transformationMappings }
};
