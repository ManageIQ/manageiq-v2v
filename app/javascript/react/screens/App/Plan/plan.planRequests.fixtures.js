import Immutable from 'seamless-immutable';
import moment from 'moment';

const sampleTask = {
  created_on: '2018-04-06T12:31:30Z',
  description: 'Transforming VM [test_migration]',
  destination_id: null,
  destination_type: null,
  href: 'https://miq.example.com/api/request_tasks/18',
  id: '18',
  message: 'VM Transformations completed',
  miq_request_id: '18',
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
      // Mostly interested in "current_description" and "percent". Drill down to "states" for histories.
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
    virtv2v_disks: [
      {
        path: '[NFS_Datastore] test_migration/test_migration.vmdk',
        percent: 50,
        size: 17179869184,
        weight: 100
      },
      {
        path: '[NFS_Datastore] test_migration/test_migration.vmdk',
        percent: 50,
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
      v2v_log: '/var/log/vdsm/import/v2v-import-20180406T083602-116599.log',
      wrapper_log: '/var/log/vdsm/import/v2v-import-20180406T083602-116599-wrapper.log'
    },
    workflow_settings: {
      resource_action_id: '22'
    }
  },
  phase: null,
  phase_context: {},
  request_type: 'transformation_plan',
  source_id: '26', // This is the id of the VM.
  source_type: 'VmOrTemplate',
  state: 'finished',
  status: 'Ok',
  tenant_id: '1',
  type: 'ServiceTemplateTransformationPlanTask',
  updated_on: '2018-04-06T12:49:30Z',
  userid: 'admin'
};

const sampleTasks = [];

for (let i = 0; i < 30; i += 1) {
  const copy = JSON.parse(JSON.stringify(sampleTask));
  copy.id = i;
  copy.miq_request_id = i;
  copy.options.delivered_on = moment(copy.options.delivered_on)
    .subtract(Math.floor(Math.random() * 48), 'hours')
    .format();
  copy.options.updated_on = moment(copy.options.delivered_on)
    .add(Math.floor(Math.random() * 100), 'm')
    .format();

  if (i % 5 === 0) {
    copy.message = 'Pending';
    copy.options.progress.current_description = 'Pending Migration';
  } else if (i % 5 === 1) {
    copy.message = 'Validating';
    copy.options.progress.current_description = 'Assess Migration';
  } else if (i % 5 === 2) {
    copy.message = 'Pre-migration';
    copy.options.progress.current_description = 'Acquire Transformation Host';
  } else if (i % 5 === 3) {
    copy.message = 'Migrating';
    copy.options.progress.current_description = 'Transform VM';
  } else if (i % 5 === 4) {
    copy.message = 'VM Transformations completed';
    if (i % 2 === 0) {
      copy.options.progress.current_description = 'Virtual machine migration failed.';
    } else {
      copy.options.progress.current_description = 'Virtual machine migrated';
    }
  }

  for (let j = 0; j < copy.options.virtv2v_disks.length; j += 1) {
    copy.options.virtv2v_disks[j].percent = Math.floor(Math.random() * 100);
    copy.options.virtv2v_disks[j].size = Math.floor(Math.random() * 17179869184);
  }
  sampleTasks.push(copy);
}

const completeSampleTasksWithFailures = [];

for (let i = 0; i < 30; i += 1) {
  const copy = JSON.parse(JSON.stringify(sampleTask));
  copy.id = i;
  copy.miq_request_id = i;
  copy.options.delivered_on = moment(copy.options.delivered_on)
    .subtract(Math.floor(Math.random() * 48), 'hours')
    .format();
  copy.options.updated_on = moment(copy.options.delivered_on)
    .add(Math.floor(Math.random() * 100), 'm')
    .format();
  copy.message = 'VM Transformations completed';

  if (i % 5 === 4) {
    copy.options.progress.current_description = 'Virtual machine migration failed.';
    copy.status = 'Error';
    for (let j = 0; j < copy.options.virtv2v_disks.length; j += 1) {
      copy.options.virtv2v_disks[j].percent = Math.floor(Math.random() * 100);
      copy.options.virtv2v_disks[j].size = Math.floor(Math.random() * 17179869184);
    }
  } else {
    copy.options.progress.current_description = 'Virtual machine migrated';
    for (let j = 0; j < copy.options.virtv2v_disks.length; j += 1) {
      copy.options.virtv2v_disks[j].percent = 100;
      copy.options.virtv2v_disks[j].size = Math.floor(Math.random() * 17179869184);
    }
  }

  completeSampleTasksWithFailures.push(copy);
}

const completeSampleTasks = [];

for (let i = 0; i < 30; i += 1) {
  const copy = JSON.parse(JSON.stringify(sampleTask));
  copy.id = i;
  copy.miq_request_id = i;
  copy.options.delivered_on = moment(copy.options.delivered_on)
    .subtract(Math.floor(Math.random() * 48), 'hours')
    .format();
  copy.options.updated_on = moment(copy.options.delivered_on)
    .add(Math.floor(Math.random() * 100), 'm')
    .format();
  copy.message = 'VM Transformations completed';

  copy.options.progress.current_description = 'Virtual machine migrated';
  for (let j = 0; j < copy.options.virtv2v_disks.length; j += 1) {
    copy.options.virtv2v_disks[j].percent = 100;
    copy.options.virtv2v_disks[j].size = Math.floor(Math.random() * 17179869184);
  }

  completeSampleTasks.push(copy);
}

export const planRequestResult = Immutable({
  href: 'http://localhost:3000/api/service_requests/19',
  id: '19',
  description: 'Migration Plan 1',
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
  status: 'active',
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
  miq_request_tasks: [...sampleTasks],
  actions: [
    {
      name: 'approve',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'deny',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'add_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'remove_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'edit',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'delete',
      href: 'http://localhost:3000/api/service_requests/19'
    }
  ]
});

export const failedPlanRequestResult = Immutable({
  href: 'http://localhost:3000/api/service_requests/19',
  id: '19',
  description: 'Migration Plan 1',
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
  status: 'failed',
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
  miq_request_tasks: [...completeSampleTasksWithFailures],
  actions: [
    {
      name: 'approve',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'deny',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'add_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'remove_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'edit',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'delete',
      href: 'http://localhost:3000/api/service_requests/19'
    }
  ]
});

export const completePlanRequestResult = Immutable({
  href: 'http://localhost:3000/api/service_requests/19',
  id: '19',
  description: 'Migration Plan 1',
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
  status: 'complete',
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
  miq_request_tasks: [...completeSampleTasks],
  actions: [
    {
      name: 'approve',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'deny',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'add_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'remove_approver',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'edit',
      method: 'post',
      href: 'http://localhost:3000/api/service_requests/19'
    },
    {
      name: 'delete',
      method: 'delete',
      href: 'http://localhost:3000/api/service_requests/19'
    }
  ]
});

export const planRequestStore = {
  '3001': {
    ...planRequestResult,
    href: 'http://localhost:3000/api/service_requests/3001',
    id: '3001',
    description: 'Migration Plan C-0'
  },
  '4000': {
    ...failedPlanRequestResult,
    href: 'http://localhost:3000/api/service_requests/4000',
    id: '4000',
    description: 'Migration Plan D-0'
  },
  '5000': {
    ...completePlanRequestResult,
    href: 'http://localhost:3000/api/service_requests/5000',
    id: '5000',
    description: 'Migration Plan E-0'
  },
  '6000': {
    ...planRequestResult,
    href: 'http://localhost:3000/api/service_requests/6000',
    id: '6000',
    description: 'Migration Plan F-0'
  }
};

export const requestPlanRequestData = id => ({
  method: 'GET',
  fetchPlanRequestUrl: '/api/dummyPlanRequest',
  response: { data: planRequestStore[id] }
});
