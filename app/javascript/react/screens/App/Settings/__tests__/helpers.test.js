import {
  parseConversionHostTasksMetadata,
  indexConversionHostTasksByResource,
  getActiveConversionHostEnableTasks,
  attachTasksToConversionHosts,
  getCombinedConversionHostListItems
} from '../helpers';

const defaultType = 'ManageIQ::Providers::Openstack::CloudManager::Vm';
const inProgress = { state: 'Active', status: 'Ok', message: 'Example progress message' };
const failed = { state: 'Finished', status: 'Error', message: 'Example error message' };
const success = { state: 'Finished', status: 'Ok', message: 'Example success message' };

const exampleTask = (updated_on, operation, id) => ({
  name: `Configuring a conversion_host: operation=${operation} resource=(name: example-host-${id} type: ${defaultType} id: ${id})`,
  updated_on
});

const exampleConversionHost = resourceId => ({
  id: `ch-${resourceId}`,
  resource: { id: resourceId, name: `example-host-${resourceId}`, type: defaultType }
});

// Example tasks to try and show a resource in each possible enablement state
const exampleTasks = [
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
const exampleConversionHosts = ['3', '4', '5', '8', '9', '10', '12'].map(exampleConversionHost);

describe('conversion host task parsing and indexing', () => {
  it('parses tasks correctly', () => {
    const tasks = parseConversionHostTasksMetadata(exampleTasks);
    expect(tasks[0]).toEqual({
      name: 'example-host-1',
      updated_on: 1,
      ...inProgress,
      meta: {
        isTask: true,
        operation: 'enable',
        resourceName: 'example-host-1',
        resourceType: defaultType,
        resourceId: '1',
        unparsedTaskName: exampleTasks[0].name
      }
    });
  });

  it('defines a meta object even if the task name is malformed', () => {
    const badTask = { name: 'bad-task-name', updated_on: 7, ...inProgress };
    const tasks = parseConversionHostTasksMetadata([badTask]);
    expect(tasks[0]).toEqual({ ...badTask, meta: {} });
  });

  it('indexes tasks properly by resource type, id, and operation', () => {
    const tasks = [...parseConversionHostTasksMetadata(exampleTasks), { extraTaskWithNoMeta: 'toBeIgnored' }];
    const tasksByResource = indexConversionHostTasksByResource(tasks);
    expect(tasksByResource).toEqual({
      [defaultType]: {
        '1': { enable: [tasks[0]] },
        '2': { enable: [tasks[1]] },
        '3': { enable: [tasks[2]] },
        '4': { enable: [tasks[3]], disable: [tasks[4]] },
        '5': { enable: [tasks[5]], disable: [tasks[6]] },
        '6': { enable: [tasks[7]], disable: [tasks[8]] },
        '7': { enable: [tasks[9], tasks[10]] },
        '8': { enable: [tasks[11], tasks[12]] },
        '9': { enable: [tasks[13], tasks[14]], disable: [tasks[15]] },
        '10': { enable: [tasks[16], tasks[17]], disable: [tasks[18]] },
        '11': { enable: [tasks[19], tasks[20]], disable: [tasks[21]] }
      }
    });
  });
});

describe('conversion host list item filtering and metadata', () => {
  const tasks = parseConversionHostTasksMetadata(exampleTasks);
  const tasksByResource = indexConversionHostTasksByResource(tasks);

  it('gets active enable tasks properly', () => {
    const activeEnableTasks = getActiveConversionHostEnableTasks(tasks, exampleConversionHosts);
    expect(activeEnableTasks).toEqual([tasks[0], tasks[1], tasks[10]]);
  });

  it('attaches tasks to conversion host objects', () => {
    const conversionHosts = [...exampleConversionHosts, { extraHostWithNoResource: 'toBeIgnored' }];
    const conversionHostsWithTasks = attachTasksToConversionHosts(conversionHosts, tasksByResource);
    expect(conversionHostsWithTasks).toEqual([
      { ...conversionHosts[0], meta: { tasksByOperation: { enable: [tasks[2]] } } },
      { ...conversionHosts[1], meta: { tasksByOperation: { enable: [tasks[3]], disable: [tasks[4]] } } },
      { ...conversionHosts[2], meta: { tasksByOperation: { enable: [tasks[5]], disable: [tasks[6]] } } },
      { ...conversionHosts[3], meta: { tasksByOperation: { enable: [tasks[11], tasks[12]] } } },
      { ...conversionHosts[4], meta: { tasksByOperation: { enable: [tasks[13], tasks[14]], disable: [tasks[15]] } } },
      { ...conversionHosts[5], meta: { tasksByOperation: { enable: [tasks[16], tasks[17]], disable: [tasks[18]] } } },
      { ...conversionHosts[6], meta: { tasksByOperation: {} } }
    ]);
  });

  it('represents each enabled or enabling resource exactly once in the list', () => {
    const combinedListItems = getCombinedConversionHostListItems(exampleConversionHosts, tasks, tasksByResource);
    const resourceIds = combinedListItems.map(item => (item.meta.isTask ? item.meta.resourceId : item.resource.id));
    expect(resourceIds).toEqual(['1', '2', '7', '3', '4', '5', '8', '9', '10', '12']);
  });
});
