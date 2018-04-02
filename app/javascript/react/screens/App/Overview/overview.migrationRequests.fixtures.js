import Immutable from 'seamless-immutable';

// export const initialState = Immutable({
//   completedMigrations: [],
//   isFetchingCompletedMigrations: false,
//   isRejectedCompletedMigrations: false,
//   errorCompletedMigrations: ''
// });

export const completedServiceRequests = Immutable({
  name: 'service_requests',
  count: 2,
  subcount: 1,
  subquery_count: 1,
  pages: 1,
  resources: [
    {
      href: 'http://localhost:3000/api/service_requests/19',
      id: '19',
      description: 'Provisioning Service [vmmigrate] from [vmmigrate]',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/20',
          id: '20',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/20',
      id: '20',
      description: 'Another migration plan',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/22',
          id: '22',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/21',
      id: '21',
      description: 'Yet another migration plan',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/23',
          id: '21',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/24',
          id: '22',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/22',
      id: '22',
      description: 'Return of the migration plan',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/25',
          id: '25',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/26',
          id: '26',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/23',
      id: '23',
      description: 'The Migration Plan Strikes Back',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/27',
          id: '27',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/28',
          id: '28',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/24',
      id: '24',
      description: 'The Migration Plans Guide to the Galaxy',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/29',
          id: '30',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'finished',
          request_type: 'transformation_plan',
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
          miq_request_id: '19',
          source_id: '6', // This is the id of the VM
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        },
        {
          href: 'http://localhost:3000/api/request_tasks/30',
          id: '30',
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
          miq_request_id: '19',
          source_id: '3',
          source_type: 'VmOrTemplate',
          destination_id: null,
          destination_type: null,
          miq_request_task_id: null,
          phase: null,
          phase_context: {},
          tenant_id: '1'
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/25',
      id: '25',
      description: 'Migration Plan: The Next Generation',
      approval_state: 'approved',
      type: 'ServiceTemplateTransformationPlanRequest',
      created_on: '2018-01-24T22:36:59Z',
      updated_on: '2018-01-30T21:13:06Z',
      fulfilled_on: '2018-01-30T21:13:06Z',
      requester_id: '1',
      requester_name: 'Administrator',
      request_type: 'migration_plan',
      request_state: 'finished',
      message: '[EVM] VM Migrated Successfully',
      status: 'Ok',
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      userid: 'admin',
      source_id: '6',
      source_type: 'ServiceTemplate',
      destination_id: null,
      destination_type: null,
      tenant_id: '1',
      service_order_id: '30',
      process: true,
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/31',
          id: '31',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/32',
          id: '32',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/33',
          id: '33',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/34',
          id: '34',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/35',
          id: '35',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/36',
          id: '36',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/37',
          id: '37',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/38',
          id: '38',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/39',
          id: '39',
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
          miq_request_id: '14',
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
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/41',
          id: '41',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/42',
          id: '42',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/43',
          id: '43',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/44',
          id: '44',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/45',
          id: '45',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/46',
          id: '46',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/47',
          id: '47',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/48',
          id: '48',
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
          miq_request_id: '14',
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
          href: 'http://localhost:3000/api/request_tasks/49',
          id: '49',
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
          miq_request_id: '14',
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
          message: 'Service_Template_Provisioning completed',
          status: 'Ok',
          type: 'ServiceTemplateTransformationPlanTask',
          miq_request_id: '14',
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

export const requestCompletedServiceRequests = {
  method: 'GET',
  fetchCompletedMigrationsUrl:
    '/api/service_requests?' +
    "filter[]=state='finished'" +
    "&filter[]=type='ServiceTemplateMigrationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks',
  response: { data: completedServiceRequests }
};
