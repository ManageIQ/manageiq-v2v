// ServiceTemplateAnsiblePlaybook

export const playbooks = [
  {
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
    deleted_on: null,
    actions: [
      {
        name: 'edit',
        method: 'post',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'edit',
        method: 'patch',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'edit',
        method: 'put',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'delete',
        method: 'post',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'order',
        method: 'post',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'archive',
        method: 'post',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'unarchive',
        method: 'post',
        href: 'http://localhost:3000/api/service_templates/43'
      },
      {
        name: 'delete',
        method: 'delete',
        href: 'http://localhost:3000/api/service_templates/43'
      }
    ]
  }
];
