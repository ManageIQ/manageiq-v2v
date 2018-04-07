import Immutable from 'seamless-immutable';

export const transformationPlans = Immutable({
  name: 'service_templates',
  count: 26,
  subcount: 8,
  subquery_count: 8,
  pages: 1,
  resources: [
    // Pending
    // No requests
    {
      href: 'http://localhost:3000/api/service_templates/10',
      id: '10',
      name: 'Migration Plan A-0',
      description: '',
      guid: '7de52447-2946-409d-8e76-b64d0f17803d',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: []
    },
    // In progress
    // Request 1 - active
    {
      href: 'http://localhost:3000/api/service_templates/20',
      id: '20',
      name: 'Migration Plan B-0',
      description: 'This migration plan is in progress',
      guid: '1f49ea91-8503-4d0c-a3b3-c6958bd95a5d',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/2000',
          id: '2000',
          description: 'Migration Plan B-0',
          state: 'active',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'active', // What is the difference between request_state, state, and status?
          status: 'Ok',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          }
        }
      ]
    },
    // In progress
    // Request 1 - failed
    // Request 2 - active
    {
      href: 'http://localhost:3000/api/service_templates/30',
      id: '30',
      name: 'Migration Plan C-0',
      description: 'First request failed, retrying',
      guid: '29bd9165-72bb-4b99-9d90-c383913ef0b3',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/3000',
          id: '3000',
          description: 'Migration Plan C-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'failed',
          options: {}
        },
        {
          href: 'http://localhost:3000/api/service_requests/3001',
          id: '3001',
          description: 'Migration Plan C-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'active',
          options: {}
        }
      ]
    },
    // Finished
    // Request 1 - failed
    {
      href: 'http://localhost:3000/api/service_templates/40',
      id: '40',
      name: 'Migration Plan D-0',
      description: 'First request failed, has not hit retry yet',
      guid: 'c25a2094-8e80-4265-ac6f-6d12dff7bfda',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/4000',
          id: '4000',
          description: 'Migration Plan D-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'failed',
          options: {}
        }
      ]
    },
    // Finished
    // Request 1 - succeed
    {
      href: 'http://localhost:3000/api/service_templates/50',
      id: '50',
      name: 'Migration Plan E-0',
      description: '',
      guid: 'fbadaa16-041d-4ebe-ba3d-8eea9c65db48',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/5000',
          id: '5000',
          description: 'Migration Plan E-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'complete',
          options: {}
        }
      ]
    },
    // In progress
    // Request 1 - active (request id 6000 is active, but failed)
    {
      href: 'http://localhost:3000/api/service_templates/60',
      id: '60',
      name: 'Migration Plan F-0',
      description: '',
      guid: '1f49ea91-8503-4d0c-a3b3-c6958bd95a5d',
      type: 'ServiceTemplateTransformationPlan',
      service_template_id: null,
      options: {
        config_info: {
          transformation_mapping_id: '1',
          vm_ids: ['1', '3']
        }
      },
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/6000',
          id: '6000',
          description: 'Migration Plan F-0',
          state: 'active',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'active', // What is the difference between request_state, state, and status?
          status: 'Ok',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          }
        }
      ]
    }
  ]
});

export const requestTransformationPlansData = {
  method: 'GET',
  fetchTransformationPlansUrl: '/api/dummyTransformationPlans',
  response: { data: transformationPlans }
};
