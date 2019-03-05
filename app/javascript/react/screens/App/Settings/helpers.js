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

// Example task name: "Configuring a conversion_host: operation=enable resource=(type: ManageIQ::Providers::Openstack::CloudManager::Vm id:42000000000113)"
const conversionHostTaskNameRegex = /operation=(\w+)\s+resource=\(type:\s+([\w:]+)\s+id:(\d+)\)/;

export const parseConversionHostTasksMetadata = tasks =>
  tasks &&
  tasks.map(task => {
    const result = conversionHostTaskNameRegex.exec(task.name);
    return {
      ...task,
      nameMeta: {
        operation: result[1],
        resourceType: result[2],
        resourceId: result[3]
      }
    };
  });
