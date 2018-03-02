import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  completedMigrations: [],
  isFetchingCompletedMigrations: false,
  isRejectedCompletedMigrations: false,
  errorCompletedMigrations: ''
});

export const completedServiceRequests = Immutable({
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
      state: 'finished',
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
          id: '21',
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
          id: '22',
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
          id: '23',
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
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/16',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Another Migration Plan',
      id: '16',
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '24',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '25',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '26',
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
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/17',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Provision Old VMs to New VMs',
      id: '17',
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '27',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '28',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '29',
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
      href: 'http://localhost:3000/api/service_requests/18',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Update the lab',
      id: '18',
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
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
      href: 'http://localhost:3000/api/service_requests/19',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'My next provision plan',
      id: '46',
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
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
          id: '51',
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
          id: '52',
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
          id: '53',
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
          id: '54',
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
          id: '55',
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
          id: '56',
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
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/21',
      status: 'Ok',
      options: {
        initiator: null,
        src_id: '4',
        cart_state: 'ordered',
        requester_group: 'EvmGroup-super_administrator',
        delivered_on: '2018-01-19T21:16:00.967Z',
        user_message: '[EVM] Service [vmmigrate] Provisioned Successfully'
      },
      description: 'Migrate some stuff. Fun stuff...',
      id: '21',
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '57',
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
          id: '58',
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
          id: '59',
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
          id: '61',
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
        }
      ]
    },
    {
      href: 'http://localhost:3000/api/service_requests/22',
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
      state: 'finished',
      miq_request_tasks: [
        {
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '62',
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
          id: '63',
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
          href: 'http://localhost:3000/api/request_tasks/19',
          id: '64',
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
          id: '65',
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
          id: '66',
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
          id: '67',
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
          id: '68',
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
          id: '69',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
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
              states: {} // states would be here
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
          href: 'http://localhost:3000/api/request_tasks/19',
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
