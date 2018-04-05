import Immutable from 'seamless-immutable';

export const transformationPlans = Immutable({
  name: 'service_templates',
  count: 26,
  subcount: 8,
  subquery_count: 8,
  pages: 1,
  resources: [
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
      miq_requests: [
        {
          href: 'http://localhost:3000/api/service_requests/100',
          id: '100',
          description: 'Migration Plan A-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'active',
          options: {}
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_templates/20',
      id: '20',
      name: 'Migration Plan B-0',
      description: 'VMW_DC1 to RHV_DC1',
      guid: 'f5ce25a0-f261-47e9-a480-5afc94524c8c',
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
    {
      href: 'http://localhost:3000/api/service_templates/21',
      id: '21',
      name: 'Migration Plan B-1',
      description: 'VMW_DC1 to RHV_DC3',
      guid: '804c2b51-6f04-40eb-adb3-259ed5641342',
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
    {
      href: 'http://localhost:3000/api/service_templates/30',
      id: '30',
      name: 'Migration Plan C-0',
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
          href: 'http://localhost:3000/api/service_requests/300',
          id: '300',
          description: 'Migration Plan C-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'error',
          options: {}
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_templates/40',
      id: '40',
      name: 'Migration Plan D-0',
      description: '',
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
          href: 'http://localhost:3000/api/service_requests/400',
          id: '400',
          description: 'Migration Plan D-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'error',
          options: {}
        },
        {
          href: 'http://localhost:3000/api/service_requests/401',
          id: '401',
          description: 'Migration Plan D-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'active',
          options: {}
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_templates/50',
      id: '50',
      name: 'Migration Plan E-0',
      description: '',
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
          href: 'http://localhost:3000/api/service_requests/500',
          id: '500',
          description: 'Migration Plan E-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'succeed',
          options: {}
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_templates/51',
      id: '51',
      name: 'Migration Plan E-1',
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
          href: 'http://localhost:3000/api/service_requests/510',
          id: '510',
          description: 'Migration Plan E-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'error',
          options: {}
        },
        {
          href: 'http://localhost:3000/api/service_requests/511',
          id: '511',
          description: 'Migration Plan E-0',
          approval_state: 'approved',
          type: 'ServiceTemplateTransformationPlanRequest',
          request_state: 'finished',
          status: 'succeed',
          options: {}
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
