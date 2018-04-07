import Immutable from 'seamless-immutable';

export const transformationPlanRequests = Immutable({
  name: 'service_requests',
  count: 2,
  subcount: 1,
  subquery_count: 1,
  pages: 1,
  resources: [
    // In progress, no failures
    // Task 1 - active
    // Task 2 - active
    {
      href: 'http://localhost:3000/api/service_requests/2000',
      id: '2000',
      description: 'Migration Plan B-0',
      state: 'active',
      approval_state: 'approved',
      status: 'Ok', // What is the difference between status and state?
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/200',
          id: '200',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'active',
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
                  status: 'active',
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
          href: 'http://localhost:3000/api/request_tasks/201',
          id: '201',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'active',
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
    // Finished, failed - Migration Plan C-0
    // Task 1 - failed
    {
      href: 'http://localhost:3000/api/service_requests/3000',
      id: '3000',
      description: 'Migration Plan C-0',
      state: 'failed',
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
          href: 'http://localhost:3000/api/request_tasks/300',
          id: '300',
          description: 'Migration Plan C-0 Task 1',
          state: 'failed',
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
                  status: 'failed',
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
        }
      ]
    },
    // In progress - Migration Plan C-0 Retry
    // Task 1 - active
    {
      href: 'http://localhost:3000/api/service_requests/3001',
      id: '3001',
      description: 'Migration Plan C-0',
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
          href: 'http://localhost:3000/api/request_tasks/301',
          id: '301',
          description: 'Migration Plan C-0 Task 1',
          state: 'active',
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
                  status: 'active',
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
        }
      ]
    },
    // Finished, failed - Migration Plan D-0
    // Task 1 - succeed
    // Task 2 - failed
    {
      href: 'http://localhost:3000/api/service_requests/4000',
      id: '4000',
      description: 'Migration Plan D-0',
      state: 'failed',
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
          href: 'http://localhost:3000/api/request_tasks/401',
          id: '50',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'succeed',
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
          href: 'http://localhost:3000/api/request_tasks/402',
          id: '402',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'failed',
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
    // Finished, succeed - Migration Plan E-0
    // Task 1 - succeed
    // Task 2 - succeed
    {
      href: 'http://localhost:3000/api/service_requests/5000',
      id: '5000',
      description: 'Migration Plan E-0',
      state: 'complete',
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
          href: 'http://localhost:3000/api/request_tasks/500',
          id: '500',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'succeed',
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
                  status: 'finished',
                  weight: 95,
                  description: 'Transform VM',
                  message: 'Disks transformation succeeded.',
                  started_on: '2018-02-26 11:14:18 UTC',
                  percent: 100,
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
                  percent: 100,
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
          href: 'http://localhost:3000/api/request_tasks/501',
          id: '501',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'succeed',
          request_type: 'transformation_plan',
          userid: 'admin',
          options: {
            src_id: '6',
            cart_state: 'ordered',
            delivered_on: '2018-01-30T21:12:34.808Z',
            progress: {
              percentage: 100,
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
    // In progress, failed
    // Task 1 - active
    // Task 2 - failed
    {
      href: 'http://localhost:3000/api/service_requests/6000',
      id: '6000',
      description: 'Migration Plan F-0',
      state: 'failed',
      approval_state: 'approved',
      status: 'Ok', // What is the difference between status and state?
      options: {
        src_id: '6',
        cart_state: 'ordered',
        delivered_on: '2018-01-30T21:12:34.808Z', // can use this timestamp as the starting time for this request
        user_message: '[EVM] VM Migrated Successfully'
      },
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/600',
          id: '600',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'active',
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
                  status: 'active',
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
          href: 'http://localhost:3000/api/request_tasks/601',
          id: '601',
          description: 'Provisioning [vmmigrate] for Service [vmmigrate]',
          state: 'failed',
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
