export const getFormValuesFromApiSettings = payload => ({
  max_concurrent_tasks_per_host: payload.transformation.limits.max_concurrent_tasks_per_host
});

export const getApiSettingsFromFormValues = values => ({
  transformation: {
    limits: {
      max_concurrent_tasks_per_host: values.max_concurrent_tasks_per_host
    }
  }
});

export const parseConversionHostTasksMetadata = tasks => {
  // Example task name: "Configuring a conversion_host: operation=enable resource=(name: ims-conversion-host type: ManageIQ::Providers::Openstack::CloudManager::Vm id: 42000000000113)"
  const taskNameRegex = /operation=(\w+)\s+resource=\(name:\s(.+)\stype:\s+([\w:]+)\s+id:\s(.+)\)/;
  if (!tasks) return [];
  return tasks.map(task => {
    const result = taskNameRegex.exec(task.name);
    if (!result) return task;
    const [, operation, resourceName, resourceType, resourceId] = result;
    return {
      ...task,
      meta: {
        isTask: true, // To distinguish when part of combinedListItems
        operation,
        resourceName,
        resourceType,
        resourceId,
        unparsedTaskName: task.name
      },
      name: resourceName // For sorting and filtering
    };
  });
};

export const indexConversionHostTasksByResource = tasksWithMetadata => {
  const tasksByResource = {};
  tasksWithMetadata.forEach(task => {
    if (!task.meta) return;
    const { resourceType: type, resourceId: id, operation } = task.meta;
    if (!tasksByResource[type]) tasksByResource[type] = {};
    if (!tasksByResource[type][id]) tasksByResource[type][id] = {};
    if (!tasksByResource[type][id][operation]) tasksByResource[type][id][operation] = [];
    tasksByResource[type][id][operation].push(task);
  });
  return tasksByResource;
};

const getActiveConversionHostEnableTasks = tasksWithMetadata =>
  tasksWithMetadata.filter(
    task => task.meta.operation === 'enable' && (task.state !== 'Finished' || task.status === 'Error')
  );

const attachTasksToConversionHosts = (conversionHosts, tasksByResource) =>
  conversionHosts.filter(conversionHost => !!conversionHost.resource).map(conversionHost => {
    const { type, id } = conversionHost.resource;
    return {
      ...conversionHost,
      meta: {
        tasksByOperation: (tasksByResource[type] && tasksByResource[type][id]) || {}
      }
    };
  });

export const getCombinedConversionHostListItems = (conversionHosts, tasksWithMetadata, tasksByResource) => {
  const activeEnableTasks = getActiveConversionHostEnableTasks(tasksWithMetadata);
  const conversionHostsWithTasks = attachTasksToConversionHosts(conversionHosts, tasksByResource);
  return [...activeEnableTasks, ...conversionHostsWithTasks];
};
