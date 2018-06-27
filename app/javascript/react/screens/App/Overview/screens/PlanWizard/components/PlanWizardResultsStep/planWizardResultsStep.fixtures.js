import Immutable from 'seamless-immutable';

export const migrationPlansResult = Immutable({
  results: [
    {
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
          vm_ids: ['1', '9', '23']
        }
      },
      created_at: '2018-02-07T16:02:39Z',
      updated_at: '2018-02-07T16:02:39Z',
      display: false,
      evm_owner_id: null,
      miq_group_id: '2',
      service_type: 'atomic',
      prov_type: 'generic',
      provision_cost: null,
      service_template_catalog_id: null,
      long_description: null,
      tenant_id: '1',
      generic_subtype: 'custom'
    }
  ]
});

export const migrationRequestsResult = Immutable({
  href: 'http://localhost:3000/api/requests/10000000000001',
  id: '10000000000001',
  description: 'Request for Migration Plan [My-ServiceTemplateTransformationPlan-Example]',
  approval_state: 'approved',
  type: 'ServiceTemplateTransformationPlanRequest',
  created_on: '2017-10-24T22:39:17Z',
  updated_on: '2017-10-24T22:45:19Z',
  fulfilled_on: '2017-10-24T22:45:19Z',
  requester_id: '10000000000001',
  requester_name: 'Administrator',
  request_type: 'transformation_plan',
  request_state: 'finished',
  message: 'Migration Plan [My-ServiceTemplateTransformationPlan-Example] requested Successfully',
  status: 'Ok',
  userid: 'admin',
  source_id: '10000000000001',
  source_type: 'ServiceTemplateTransformationPlan',
  destination_id: null,
  destination_type: null,
  tenant_id: '10000000000001',
  service_order_id: '10000000000006',
  process: true
});

export const requestMigrationPlansData = {
  method: 'POST',
  postPlansUrl: '/api/dummyMigrationPlansAndRequests',
  response: { data: migrationPlansResult }
};

export const requestMigrationRequestsData = {
  method: 'POST',
  response: { data: migrationRequestsResult }
};

export const initialState = Immutable({
  migrationPlansResult: {},
  migrationRequestsResult: {},
  postPlansUrl: requestMigrationPlansData.postPlansUrl
});
