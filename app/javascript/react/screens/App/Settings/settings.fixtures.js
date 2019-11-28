import Immutable from 'seamless-immutable';

export const servers = Immutable({
  name: 'servers',
  count: 2,
  subcount: 2,
  pages: 1,
  resources: [
    {
      href: 'http://0.0.0.0:8080/api/servers/42000000000001'
    },
    {
      href: 'http://0.0.0.0:8080/api/servers/42000000000002'
    }
  ]
});

export const settings = Immutable({
  transformation: {
    limits: {
      max_concurrent_tasks_per_conversion_host: 10,
      max_concurrent_tasks_per_ems: 10,
      cpu_limit_per_host: 10
    }
  },
  otherSettings: {
    mock: 'data'
  }
});

export const settingsFormValues = Immutable({
  max_concurrent_tasks_per_conversion_host: 10,
  max_concurrent_tasks_per_ems: 10,
  cpu_limit_per_host: 10
});

export const fetchServersData = {
  method: 'GET',
  fetchServersUrl: '/api/servers?expand=resources',
  response: { data: servers }
};

export const fetchSettingsData = {
  method: 'GET',
  fetchSettingsUrl: '/api/settings',
  response: { data: settings }
};

export const patchSettingsData = {
  method: 'PATCH',
  response: { data: settings }
};

export const exampleConversionHostType = 'ManageIQ::Providers::Openstack::CloudManager::Vm';
export const inProgress = { state: 'Active', status: 'Ok', message: 'Example progress message' };
export const failed = { state: 'Finished', status: 'Error', message: 'Example error message' };
export const success = { state: 'Finished', status: 'Ok', message: 'Example success message' };

const exampleTask = (updated_on, operation, id) => ({
  name: `Configuring a conversion_host: operation=${operation} resource=(name: example-host-${id} type: ${exampleConversionHostType} id: ${id})`,
  updated_on
});

const exampleConversionHost = resourceId => ({
  id: `ch-${resourceId}`,
  resource: { id: resourceId, name: `example-host-${resourceId}`, type: exampleConversionHostType, ems_id: '123' }
});

// Example tasks to try and show a resource in each possible enablement state
export const exampleConversionHostTasks = [
  // VM ID 1: enable in progress (active enable task)
  { ...exampleTask(1, 'enable', '1'), ...inProgress },
  // VM ID 2: enable failed (active enable task)
  { ...exampleTask(2, 'enable', '2'), ...failed },
  // VM ID 3: enable success (has CH)
  { ...exampleTask(3, 'enable', '3'), ...success },
  // VM ID 4: enable success, then disable in progress (has CH)
  { ...exampleTask(4, 'enable', '4'), ...success },
  { ...exampleTask(5, 'disable', '4'), ...inProgress },
  // VM ID 5: enable success, then disable failed (has CH)
  { ...exampleTask(6, 'enable', '5'), ...success },
  { ...exampleTask(7, 'disable', '5'), ...failed },
  // VM ID 6: enable success, then disable success (not shown in list)
  { ...exampleTask(8, 'enable', '6'), ...success },
  { ...exampleTask(9, 'disable', '6'), ...success },
  // VM ID 7: enable failed, then retry enable in progress (active enable task)
  { ...exampleTask(10, 'enable', '7'), ...failed },
  { ...exampleTask(11, 'enable', '7'), ...inProgress },
  // VM ID 8: enable failed, then retry enable success (has CH)
  { ...exampleTask(12, 'enable', '8'), ...failed },
  { ...exampleTask(13, 'enable', '8'), ...success },
  // VM ID 9: enable failed, then retry enable success, then disable in progress (has CH)
  { ...exampleTask(14, 'enable', '9'), ...failed },
  { ...exampleTask(15, 'enable', '9'), ...success },
  { ...exampleTask(16, 'disable', '9'), ...inProgress },
  // VM ID 10: enable failed, then retry enable success, then disable failed (has CH)
  { ...exampleTask(17, 'enable', '10'), ...failed },
  { ...exampleTask(18, 'enable', '10'), ...success },
  { ...exampleTask(19, 'disable', '10'), ...failed },
  // VM ID 11: enable failed, then retry enable success, then disable success (not shown in list)
  { ...exampleTask(20, 'enable', '11'), ...failed },
  { ...exampleTask(21, 'enable', '11'), ...success },
  { ...exampleTask(22, 'disable', '11'), ...success }
];

// Conversion hosts exist for VMs 3, 4, 5, 8, 9, 10, 12 (VM 12 was configured manually and has no tasks)
export const exampleConversionHosts = ['3', '4', '5', '8', '9', '10', '12'].map(exampleConversionHost);
