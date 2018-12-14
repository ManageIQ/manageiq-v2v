import Immutable from 'seamless-immutable';

export const planRequest = Immutable({
  href: 'http://0.0.0.0:8080/api/requests/37',
  id: '37',
  description: 'test',
  approval_state: 'pending_approval',
  type: 'ServiceTemplateTransformationPlanRequest',
  created_on: '2018-12-12T16:55:32Z',
  updated_on: '2018-12-12T16:55:32Z',
  fulfilled_on: null,
  requester_id: '1',
  requester_name: 'Administrator',
  request_type: 'transformation_plan',
  request_state: 'pending',
  message: 'VM Transformations - Request Created',
  status: 'Ok',
  options: {
    dialog: null,
    workflow_settings: { resource_action_id: '133' },
    initiator: null,
    src_id: '3',
    request_options: { submit_workflow: true, init_defaults: false },
    cart_state: 'ordered',
    requester_group: 'EvmGroup-super_administrator'
  },
  userid: 'admin',
  source_id: '3',
  source_type: 'ServiceTemplate',
  destination_id: null,
  destination_type: null,
  tenant_id: '1',
  service_order_id: '19',
  process: true,
  cancelation_status: null
});
