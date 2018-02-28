import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  activeMigrations: [],
  isFetchingActiveMigrations: false,
  isRejectedActiveMigrations: false,
  errorActiveMigrations: ''
});

export const activeServiceRequests = Immutable({
  name: 'service_requests',
  count: 2,
  subcount: 1,
  subquery_count: 1,
  pages: 1,
  resources: [
    {
      href: 'http://localhost:3000/api/service_requests/14',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Provisioning Service [debug1] from [debug1]',
      id: '14',
      state: 'active',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
    },
    {
      href: 'http://localhost:3000/api/service_requests/14',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Migration Plan Number 2',
      id: '15',
      state: 'active',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
            }
          },
          created_on: '2018-01-19T21:16:01Z',
          updated_on: '2018-01-19T23:10:27Z',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '19',
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
              states: {} // states would be here
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
      'http://localhost:3000/api/service_requests?filter[]=state=%27active%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0',
    first:
      'http://localhost:3000/api/service_requests?filter[]=state=%27active%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0',
    last:
      'http://localhost:3000/api/service_requests?filter[]=state=%27active%27&filter[]=type=%27ServiceTemplateProvisionRequest%27&expand=resources&attributes=status,state,options,description,miq_request_tasks&offset=0'
  }
});

export const requestActiveServiceRequests = {
  method: 'GET',
  fetchActiveMigrationsUrl:
    '/api/service_requests?' +
    "filter[]=state='active'" +
    "&filter[]=type='ServiceTemplateMigrationPlanRequest'" +
    '&expand=resources' +
    '&attributes=status,state,options,description,miq_request_tasks',
  response: { data: activeServiceRequests }
};
