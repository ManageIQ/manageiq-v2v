import { FINISHED, ERROR } from './screens/ConversionHostsSettings/ConversionHostsSettingsConstants';

export const getFormValuesFromApiSettings = payload => ({
  max_concurrent_tasks_per_host: payload.transformation.limits.max_concurrent_tasks_per_host,
  max_concurrent_tasks_per_ems: payload.transformation.limits.max_concurrent_tasks_per_ems
});

export const getApiSettingsFromFormValues = values => ({
  transformation: {
    limits: {
      max_concurrent_tasks_per_host: values.max_concurrent_tasks_per_host,
      max_concurrent_tasks_per_ems: values.max_concurrent_tasks_per_ems
    }
  }
});

export const parseConversionHostTasksMetadata = tasks => {
  // Example task name: "Configuring a conversion_host: operation=enable resource=(name: ims-conversion-host type: ManageIQ::Providers::Openstack::CloudManager::Vm id: 42000000000113)"
  const taskNameRegex = /operation=(\w+)\s+resource=\(name:\s(.+)\stype:\s+([\w:]+)\s+id:\s(.+)\)/;
  if (!tasks) return [];
  return tasks.map(task => {
    const result = taskNameRegex.exec(task.name);
    if (!result) return { ...task, meta: {} };
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

export const getActiveConversionHostEnableTasks = (tasksWithMetadata, conversionHosts) => {
  // Start with the latest task for each resource (filter out old failures if a new task exists)
  const mostRecentTasks = tasksWithMetadata.filter((task, index) =>
    tasksWithMetadata.every(
      (otherTask, otherIndex) =>
        otherIndex === index ||
        otherTask.meta.resourceType !== task.meta.resourceType ||
        otherTask.meta.resourceId !== task.meta.resourceId ||
        otherTask.updated_on <= task.updated_on
    )
  );
  // Filter to only enable tasks that are either unfinished or finished with errors, and don't match any enabled hosts.
  return mostRecentTasks.filter(
    task =>
      task.meta.operation === 'enable' &&
      (task.state !== FINISHED || task.status === ERROR) &&
      conversionHosts.every(
        ch => ch.resource.type !== task.meta.resourceType || ch.resource.id !== task.meta.resourceId
      )
  );
};

export const attachTasksToConversionHosts = (conversionHosts, tasksByResource) =>
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
  const activeEnableTasks = getActiveConversionHostEnableTasks(tasksWithMetadata, conversionHosts);
  const conversionHostsWithTasks = attachTasksToConversionHosts(conversionHosts, tasksByResource);
  return [...activeEnableTasks, ...conversionHostsWithTasks];
};

export const inferTransportMethod = conversionHostsListItem => {
  const vddk = __('VDDK');
  const ssh = __('SSH');
  if (conversionHostsListItem.meta.isTask) {
    const { request_params } = conversionHostsListItem.context_data;
    return request_params.vmware_vddk_package_url ? vddk : ssh;
  }
  if (conversionHostsListItem.vddk_transport_supported) return vddk;
  if (conversionHostsListItem.ssh_transport_supported) return ssh;
  return null;
};

export const getConversionHostTaskLogFile = task => {
  const {
    meta: { resourceName, operation },
    context_data: { conversion_host_enable, conversion_host_check, conversion_host_disable }
  } = task;
  const fileName = `${resourceName}-${operation}.log`;
  if (task.meta.operation === 'enable') {
    return { fileName, fileBody: [conversion_host_enable, conversion_host_check].join('\n\n') };
  }
  if (task.meta.operation === 'disable') {
    return { fileName, fileBody: conversion_host_disable };
  }
  return null;
};
