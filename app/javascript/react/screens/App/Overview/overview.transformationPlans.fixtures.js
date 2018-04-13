import Immutable from 'seamless-immutable';

export const transformationPlans = Immutable({
  name: 'service_templates',
  count: 26,
  subcount: 8,
  subquery_count: 8,
  pages: 1,
  resources: [
    // PLAN QUEUED
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
    // PLAN APPROVED
    // |-- Request 1: active
    // |---- Task 1: active
    // |---- Task 2: active
    {
      href: 'http://localhost:3000/api/service_templates/20',
      id: '20',
      name: 'Migration Plan B-0',
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
          href: 'http://localhost:3000/api/service_requests/2000',
          id: '2000',
          description: 'Migration Plan B-0',
          state: '',
          approval_state: 'approved',
          status: 'active',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/200',
              id: '200',
              message: 'Migrating',
              miq_request_id: '200',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: '<SOMETHING>',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            },
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/201',
              id: '201',
              message: 'Migrating',
              miq_request_id: '201',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: '<SOMETHING>',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
        }
      ]
    },
    // PLAN APPROVED
    // |-- Request 1: failed
    // |---- Task 1: failed
    // |-- Request 2: active
    // |---- Task 1: active
    {
      href: 'http://localhost:3000/api/service_templates/30',
      id: '30',
      name: 'Migration Plan C-0',
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
          href: 'http://localhost:3000/api/service_requests/3000',
          id: '3000',
          description: 'Migration Plan C-0',
          state: '',
          approval_state: 'approved',
          status: 'failed',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/300',
              id: '300',
              message: 'VM Transformations completed',
              miq_request_id: '300',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: '<REQUEST_TASK_FAILED>',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
        },
        {
          href: 'http://localhost:3000/api/service_requests/3001',
          id: '3001',
          description: 'Migration Plan C-0',
          state: '',
          approval_state: 'approved',
          status: 'active',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/301',
              id: '301',
              message: 'Migrating',
              miq_request_id: '301',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: '<SOMETHING>',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
        }
      ]
    },
    // PLAN FAILED
    // |-- Request 1: failed
    // |---- Task 1: succeed
    // |---- Task 2: failed
    {
      href: 'http://localhost:3000/api/service_templates/40',
      id: '40',
      name: 'Migration Plan D-0',
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
          href: 'http://localhost:3000/api/service_requests/4000',
          id: '4000',
          description: 'Migration Plan D-0',
          state: '',
          approval_state: 'approved',
          status: 'failed',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/400',
              id: '400',
              message: 'VM Transformations completed',
              miq_request_id: '400',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: 'Virtual machine migrated',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            },
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/401',
              id: '401',
              message: 'VM Transformations completed',
              miq_request_id: '401',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: '<REQUEST_TASK_FAILED>',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
        }
      ]
    },
    // PLAN COMPLETE
    // |-- Request 1: complete
    // |---- Task 1: succeed
    // |---- Task 2: succeed
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
          state: '',
          approval_state: 'approved',
          status: 'complete',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/500',
              id: '500',
              message: 'VM Transformations completed',
              miq_request_id: '500',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: 'Virtual machine migrated',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            },
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/501',
              id: '501',
              message: 'VM Transformations completed',
              miq_request_id: '501',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: 'Virtual machine migrated',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
        }
      ]
    },
    // PLAN APPROVED
    // |-- Request 1: active
    // |---- Task 1: active
    // |---- Task 2: failed
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
          state: '',
          approval_state: 'approved',
          status: 'active',
          created_on: '2018-04-06T12:31:30Z',
          updated_on: '2018-04-06T12:49:30Z',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
            user_message: '[EVM] VM Migrated Successfully'
          },
          miq_request_tasks: [
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/600',
              id: '600',
              message: 'Migrating',
              miq_request_id: '600',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: '<SOMETHING>',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: 'Ok',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            },
            {
              created_on: '2018-04-06T12:31:30Z',
              description: 'Transforming VM [test_migration]',
              destination_id: null,
              destination_type: null,
              href: 'http://localhost:3000/api/request_tasks/601',
              id: '601',
              message: 'VM Transformations completed',
              miq_request_id: '601',
              miq_request_task_id: null,
              options: {
                cart_state: 'ordered',
                collapse_snapshots: true,
                delivered_on: '2018-04-06T12:31:30.871Z',
                destination_vm_id: '48',
                dialog: null,
                export_domain_id: '1',
                initiator: null,
                power_off: true,
                progress: {
                  current_description: '<SOMETHING>',
                  current_state: '/State7',
                  percent: 100.0,
                  states: {
                    '/State1': {
                      description: 'Assess Migration',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:31:52Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:32:28Z',
                      weight: 1
                    },
                    '/State2': {
                      description: 'Acquire Transformation Host',
                      message: 'State2 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:32:44Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:33:20Z',
                      weight: 1
                    },
                    '/State3': {
                      description: 'Power off',
                      message: 'State3 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:33:35Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:06Z',
                      weight: 1
                    },
                    '/State4': {
                      description: 'Collapse Snapshots',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:34:22Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:34:53Z',
                      weight: 1
                    },
                    '/State5': {
                      description: 'Transform VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:09Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:28Z',
                      weight: 95
                    },
                    '/State5/State1': {
                      description: 'Convert disks',
                      message: 'State1 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:35:24Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:36:16Z',
                      weight: 1
                    },
                    '/State5/State2': {
                      description: 'Convert disks',
                      message: 'Disks transformation succeeded.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:36:32Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:40:33Z',
                      weight: 85
                    },
                    '/State5/State4': {
                      description: 'Identify destination VM',
                      message: 'State4 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:40:48Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:07Z',
                      weight: 4
                    },
                    '/State5/State5': {
                      description: 'Update description of VM',
                      message: 'State5 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:43:23Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:43:59Z',
                      weight: 1
                    },
                    '/State5/State6': {
                      description: 'Enable Virtio-SCSI for VM',
                      message: 'State6 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:44:15Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:44:52Z',
                      weight: 1
                    },
                    '/State5/State8': {
                      description: 'Power-on VM',
                      message: 'State8 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:07Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:45:38Z',
                      weight: 1
                    },
                    '/State5/State9': {
                      description: 'Power-on VM',
                      message: 'State9 is finished.',
                      percent: 100.0,
                      started_on: '2018-04-06T12:45:54Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:48:12Z',
                      weight: 7
                    },
                    '/State6': {
                      description: 'Mark source as migrated',
                      message: 'exit',
                      percent: 100.0,
                      started_on: '2018-04-06T12:48:43Z',
                      status: 'finished',
                      updated_on: '2018-04-06T12:49:14Z',
                      weight: 1
                    },
                    '/State7': {
                      description: 'Virtual machine migrated',
                      message: 'Virtual machine migrated',
                      percent: 0.0,
                      started_on: '2018-04-06T12:49:30Z',
                      status: 'active',
                      weight: 1
                    }
                  }
                },
                requester_group: 'EvmGroup-super_administrator',
                src_id: '2',
                transformation_host_id: '1',
                transformation_host_name: 'rhvh01.example.com',
                virtv2v_disks: [
                  {
                    path: '[NFS_Datastore] test_migration/test_migration.vmdk',
                    percent: 100,
                    size: 17179869184,
                    weight: 100
                  }
                ],
                virtv2v_finished_on: '20180406_0840',
                virtv2v_networks: [
                  {
                    destination: 'VM_Network',
                    source: 'VM Network'
                  }
                ],
                virtv2v_started_on: '2018-04-06 08:35:45',
                virtv2v_status: 'active',
                virtv2v_wrapper: {
                  state_file: '/tmp/v2v-import-20180406T083602-116599.state',
                  v2v_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
                  wrapper_log:
                    '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
                },
                workflow_settings: {
                  resource_action_id: '22'
                }
              },
              phase: null,
              phase_context: {},
              request_state: 'Finished',
              request_type: 'transformation_plan',
              source_id: '26',
              source_type: 'VmOrTemplate',
              state: 'finished',
              status: '<REQUEST_TASK_FAILED>',
              tenant_id: '1',
              type: 'ServiceTemplateTransformationPlanTask',
              updated_on: '2018-04-06T12:49:30Z',
              userid: 'admin'
            }
          ]
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
