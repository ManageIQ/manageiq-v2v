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
  fetchServiceTemplateAnsiblePlaybooksUrl: '/api/dummyServiceTemplatePlaybooks',
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
  fetchNetworksUrl: '/api/dummyNetworks',
  archivedTransformationPlans: [],
  requestsProcessingCancellation: []
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

export const preMigrationPlaybook = {
  href: 'http://localhost:3000/api/service_templates/43',
  id: '43',
  name: 'Ansible test',
  description: '',
  guid: '7de52447-2946-409d-8e76-b64d0f17803d',
  type: 'ServiceTemplateAnsiblePlaybook',
  service_template_id: null,
  options: {
    config_info: {
      provision: {
        repository_id: '23',
        playbook_id: '309',
        credential_id: '10',
        hosts: 'test_avaleror',
        verbosity: '1',
        log_output: 'on_error',
        extra_vars: {},
        execution_ttl: '5',
        become_enabled: false,
        cloud_credential_id: '124',
        new_dialog_name: 'demo_httpd',
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/provision',
        dialog_id: '50'
      },
      retirement: {
        remove_resources: 'no_with_playbook',
        verbosity: '0',
        log_output: 'on_error',
        repository_id: '23',
        playbook_id: '305',
        credential_id: '10',
        execution_ttl: '',
        hosts: 'localhost',
        extra_vars: {},
        become_enabled: false,
        fqname: '/Service/Generic/StateMachines/GenericLifecycle/Retire_Advanced_Resource_None'
      }
    }
  },
  created_at: '2018-02-09T19:33:42Z',
  updated_at: '2018-02-11T12:31:20Z',
  display: true,
  evm_owner_id: null,
  miq_group_id: '39',
  service_type: 'atomic',
  prov_type: 'generic_ansible_playbook',
  provision_cost: null,
  service_template_catalog_id: '16',
  long_description: null,
  tenant_id: '1',
  generic_subtype: null,
  deleted_on: null
};
