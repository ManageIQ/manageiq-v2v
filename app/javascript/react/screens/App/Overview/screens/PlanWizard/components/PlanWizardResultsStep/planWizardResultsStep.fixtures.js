import Immutable from 'seamless-immutable';

export const migrationPlansResult = Immutable({
  href: 'http://localhost:3000/api/service_templates/10000000000001',
  id: '10000000000001',
  name: 'My-ServiceTemplateTransformationPlan-Example',
  description: 'My-ServiceTemplateTransformationPlan-Example',
  guid: '6b86b905-549d-4a61-aae9-fe64e1fc1417',
  type: 'ServiceTemplateTransformationPlan',
  service_template_id: null,
  options: {
    config_info: {
      transformation_mapping_id: '10000000000001',
      vms: ['1', '9', '23']
    }
  },
  created_at: '2018-02-07T16:02:39Z',
  updated_at: '2018-02-07T16:02:39Z'
});

export const requestMigrationPlansData = {
  method: 'POST',
  postPlansUrl: '/api/dummyMigrationPlans',
  response: { data: migrationPlansResult }
};

export const initialState = Immutable({
  migrationPlansResult: {},
  postPlansUrl: requestMigrationPlansData.postPlansUrl
});
