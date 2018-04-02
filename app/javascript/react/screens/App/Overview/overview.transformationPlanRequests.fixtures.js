import Immutable from 'seamless-immutable';

export const transformationPlanRequests = Immutable({
  name: 'service_requests',
  count: 2,
  subcount: 1,
  subquery_count: 1,
  pages: 1,
  resources: [
    {
      href: 'http://localhost:3000/api/service_requests/100',
      id: '100',
      description: 'Pending Migration Plan',
      state: 'pending',
      status: 'Ok',
      approval_state: 'pending_approval',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '4321'
        },
        initiator: null,
        src_id: '36',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator'
      },
      miq_request_tasks: []
    },
    {
      href: 'http://localhost:3000/api/service_requests/101',
      id: '101',
      description: 'Another Pending Migration Plan',
      state: 'pending',
      status: 'Ok',
      approval_state: 'pending_approval',
      options: {
        dialog: null,
        workflow_settings: {
          resource_action_id: '4412'
        },
        initiator: null,
        src_id: '37',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator'
      },
      miq_request_tasks: []
    },
    {
      href: 'http://localhost:3000/api/service_requests/1',
      id: '1',
      description: 'A New Migration Plan',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/10',
          id: '10',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '1',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/11',
          id: '11',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '1',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/2',
      id: '2',
      description: 'The Migration Plan Strikes Back',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/20',
          id: '20',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '2',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/21',
          id: '21',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '2',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/3',
      id: '3',
      description: 'Return of the Migration Plan',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/30',
          id: '30',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '3',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/31',
          id: '31',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '3',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/4',
      id: '4',
      description: 'An Unexpected Migration Plan',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/40',
          id: '40',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '4',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/41',
          id: '41',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '4',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/5',
      id: '5',
      description: 'The Desolation of Migration Plan',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/50',
          id: '50',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '5',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/51',
          id: '51',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '5',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/6',
      id: '6',
      description: 'The Battle of the Five Migration Plans',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/60',
          id: '60',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'VM Migrations completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '6',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/61',
          id: '61',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 40,
              transferred: '500MB'
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: '[EVM] VM Migrated Successfully',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '6',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/7',
      id: '7',
      description: 'The One Migration Plan to Rule Them All',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/70',
          id: '70',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/71',
          id: '71',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T24:14:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/72',
          id: '72',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/73',
          id: '73',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/74',
          id: '74',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/75',
          id: '75',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/76',
          id: '76',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/77',
          id: '77',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/78',
          id: '78',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/79',
          id: '79',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/80',
          id: '80',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/81',
          id: '81',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/82',
          id: '82',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/83',
          id: '83',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/84',
          id: '84',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/85',
          id: '85',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/86',
          id: '86',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning failed',
          status: 'Error',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/87',
          id: '87',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning failed',
          status: 'Error',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/88',
          id: '88',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/89',
          id: '89',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'clone_to_service',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z', // Use this timestamp for starting time for this VM
            progress: {
              // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
              current_state: '/State5/State3',
              current_description: 'Initiate Disks Sysprep',
              percent: 61.362500000000026,
              states: {
                '/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Assess Migration',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:06 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:07 UTC'
                },
                '/State2': {
                  status: 'finished',
                  weight: 1,
                  description: 'Collapse Snapshots',
                  message: 'State2 is finished.',
                  started_on: '2018-02-26 11:14:08 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:10 UTC'
                },
                '/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Power off',
                  message: 'State3 is finished.',
                  started_on: '2018-02-26 11:14:11 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:13 UTC'
                },
                '/State4': {
                  status: 'finished',
                  weight: 1,
                  description: 'Acquire Transformation Host',
                  message: 'State4 is finished.',
                  started_on: '2018-02-26 11:14:14 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:17 UTC'
                },
                '/State5': {
                  status: 'active',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 32.8,
                  updated_on: '2018-02-26 11:17:11 UTC'
                },
                '/State5/State1': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Transformation',
                  message: 'State1 is finished.',
                  started_on: '2018-02-26 11:14:19 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:14:24 UTC'
                },
                '/State5/State2': {
                  status: 'finished',
                  weight: 80,
                  description: 'Transform Disks',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:26 UTC',
                  percent: 100,
                  updated_on: '2018-02-26 11:16:56 UTC'
                },
                '/State5/State3': {
                  status: 'finished',
                  weight: 1,
                  description: 'Initiate Disks Sysprep',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:16:58 UTC',
                  percent: 90,
                  updated_on: '2018-02-26 11:16:59 UTC'
                }
              }
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T21:44:27Z',
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '7',
          source_id: '6',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: '18',
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    }
  ],
  actions: [
    {
      name: 'query',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'approve',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'deny',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'delete',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'add_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'remove_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    },
    {
      name: 'edit',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests'
    }
  ],
  links: {
    self:
      'http://localhost:3000/api/service_requests?filter[]=state=%27finished%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0',
    first:
      'http://localhost:3000/api/service_requests?filter[]=state=%27finished%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0',
    last:
      'http://localhost:3000/api/service_requests?filter[]=state=%27finished%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0'
  }
});

export const requestTransformationPlanRequestsData = {
  method: 'GET',
  fetchTransformationPlanRequestsUrl: '/api/dummyPlanRequests',
  response: { data: transformationPlanRequests }
};
