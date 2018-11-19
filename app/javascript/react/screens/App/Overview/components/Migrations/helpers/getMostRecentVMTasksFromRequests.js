import commonUtilitiesHelper from '../../../../common/commonUtilitiesHelper';

const getMostRecentVMTasksFromRequests = (requests, actions) => {
  const vm_ids = actions.map(a => a.vm_id);

  const allTasks = requests.map(request => request.miq_request_tasks);

  const flattenAllTasks = [];
  commonUtilitiesHelper.flatten(allTasks, flattenAllTasks);

  const groupedByVMId = commonUtilitiesHelper.groupBy(flattenAllTasks, 'source_id');

  const vmTasksForRequestOfPlan = [];
  vmTasksForRequestOfPlan.push(
    vm_ids.reduce((tasks, id) => {
      const task = commonUtilitiesHelper.getMostRecentEntityByCreationDate(groupedByVMId[id]);
      if (task) {
        return [...tasks, task];
      }
      return tasks;
    }, [])
  );

  const flattenVMTasksForRequestOfPlan = [];
  commonUtilitiesHelper.flatten(vmTasksForRequestOfPlan, flattenVMTasksForRequestOfPlan);

  return flattenVMTasksForRequestOfPlan;
};

export default getMostRecentVMTasksFromRequests;
