import commonUtilitiesHelper from '../../../../common/commonUtilitiesHelper';

const getMostRecentVMTasksFromRequests = (requests, vm_ids) => {
  const allTasks = requests.map(request => request.miq_request_tasks);

  const flattenAllTasks = [];
  commonUtilitiesHelper.flatten(allTasks, flattenAllTasks);

  const groupedByVMId = commonUtilitiesHelper.groupBy(flattenAllTasks, 'source_id');

  const vmTasksForRequestOfPlan = [];
  vmTasksForRequestOfPlan.push(
    vm_ids.map(vmId => commonUtilitiesHelper.getMostRecentEntityByCreationDate(groupedByVMId[vmId]))
  );

  const flattenVMTasksForRequestOfPlan = [];
  commonUtilitiesHelper.flatten(vmTasksForRequestOfPlan, flattenVMTasksForRequestOfPlan);

  return flattenVMTasksForRequestOfPlan;
};

export default getMostRecentVMTasksFromRequests;
