import {
  parseConversionHostTasksMetadata,
  indexConversionHostTasksByResource,
  getActiveConversionHostEnableTasks,
  attachTasksToConversionHosts,
  getCombinedConversionHostListItems,
  getConversionHostTaskLogFile,
  getConversionHostSshKeyInfoMessage,
  inferTransportMethod
} from '../helpers';

import {
  exampleConversionHostTasks as exampleTasks,
  exampleConversionHostType as exampleType,
  exampleConversionHosts,
  inProgress
} from '../settings.fixtures';
import { RHV, OPENSTACK } from '../../../../../common/constants';

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
        resourceType: exampleType,
        resourceId: '1',
        unparsedTaskName: exampleTasks[0].name
      }
    });
  });

  it('has no errors when tasks are not defined', () => {
    expect(parseConversionHostTasksMetadata()).toEqual([]);
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
      [exampleType]: {
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

describe('transport method helper', () => {
  describe('for an enablement task', () => {
    it('detects VDDK properly', () => {
      const task = {
        meta: { isTask: true },
        context_data: {
          request_params: {
            vmware_vddk_package_url: 'foo'
          }
        }
      };
      expect(inferTransportMethod(task)).toEqual(__('VDDK'));
    });

    it('detects SSH properly', () => {
      const task = {
        meta: { isTask: true },
        context_data: {
          request_params: {
            vmware_ssh_private_key: 'foo'
          }
        }
      };
      expect(inferTransportMethod(task)).toEqual(__('SSH'));
    });

    it('returns null if neither match', () => {
      const task = {
        meta: { isTask: true },
        context_data: {
          request_params: {}
        }
      };
      expect(inferTransportMethod(task)).toEqual(null);
    });
  });

  describe('for a conversion host', () => {
    it('detects VDDK properly', () => {
      const host = {
        meta: { isTask: false },
        vddk_transport_supported: true
      };
      expect(inferTransportMethod(host)).toEqual(__('VDDK'));
    });

    it('detects SSH properly', () => {
      const host = {
        meta: { isTask: false },
        ssh_transport_supported: true
      };
      expect(inferTransportMethod(host)).toEqual(__('SSH'));
    });

    it('returns null if neither match', () => {
      const host = {
        meta: { isTask: false }
      };
      expect(inferTransportMethod(host)).toEqual(null);
    });
  });
});

describe('conversion host log file helper', () => {
  it('generates a file from an enable task', () => {
    const task = {
      meta: { resourceName: 'hostname', operation: 'enable' },
      context_data: {
        conversion_host_enable: 'MOCK PLAYBOOK LOG CONTENTS: ENABLE',
        conversion_host_check: 'MOCK PLAYBOOK LOG CONTENTS: CHECK'
      }
    };
    const { fileName, fileBody } = getConversionHostTaskLogFile(task);
    expect(fileName).toBe('hostname-enable.log');
    expect(fileBody).toBe('MOCK PLAYBOOK LOG CONTENTS: ENABLE\n\nMOCK PLAYBOOK LOG CONTENTS: CHECK');
  });

  it('generates a file from a disable task', () => {
    const task = {
      meta: { resourceName: 'hostname', operation: 'disable' },
      context_data: {
        conversion_host_disable: 'MOCK PLAYBOOK LOG CONTENTS: DISABLE'
      }
    };
    const { fileName, fileBody } = getConversionHostTaskLogFile(task);
    expect(fileName).toBe('hostname-disable.log');
    expect(fileBody).toBe('MOCK PLAYBOOK LOG CONTENTS: DISABLE');
  });

  it('returns null for an unknown task operation', () => {
    const task = {
      meta: { resourceName: 'hostname', operation: 'unknown' },
      context_data: {}
    };
    expect(getConversionHostTaskLogFile(task)).toBe(null);
  });
});

describe('conversion host ssh key info message', () => {
  it('has a message for RHV hosts', () => {
    expect(getConversionHostSshKeyInfoMessage(RHV).length).toBeGreaterThan(0);
  });

  it('has a message for OSP hosts', () => {
    expect(getConversionHostSshKeyInfoMessage(OPENSTACK).length).toBeGreaterThan(0);
  });

  it('returns empty string for unknown hosts', () => {
    expect(getConversionHostSshKeyInfoMessage('unknown')).toBe('');
  });
});
