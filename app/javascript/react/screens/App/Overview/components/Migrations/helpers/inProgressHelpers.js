import getMostRecentVMTasksFromRequests from './getMostRecentVMTasksFromRequests';
import getMostRecentRequest from '../../../../common/getMostRecentRequest';
import { PLAN_JOB_STATES } from '../../../../../../../data/models/plans';
import { urlBuilder } from '../helpers';
import { TRANSFORMATION_PLAN_REQUESTS_URL } from '../../../OverviewConstants';

export const getRequestsOfPlan = (plan, allRequestsWithTasks) => {
  const requestsOfAssociatedPlan = allRequestsWithTasks.filter(request => request.source_id === plan.id);
  const mostRecentRequest = requestsOfAssociatedPlan.length > 0 && getMostRecentRequest(requestsOfAssociatedPlan);
  return { requestsOfAssociatedPlan, mostRecentRequest };
};

export const isWaitingForConversionHost = mostRecentRequest =>
  mostRecentRequest &&
  mostRecentRequest.approval_state === 'approved' &&
  mostRecentRequest.miq_request_tasks.length > 0 &&
  mostRecentRequest.miq_request_tasks.every(task => !task.conversion_host_id);

export const shouldDisableCancelButton = ({
  requestsProcessingCancellation,
  mostRecentRequest,
  isFetchingTransformationPlans,
  isFetchingAllRequestsWithTasks,
  isCancellingPlanRequest
}) => {
  const isProcessingCancellation = requestsProcessingCancellation.includes(
    urlBuilder(TRANSFORMATION_PLAN_REQUESTS_URL, mostRecentRequest.id)
  );

  return (
    isProcessingCancellation &&
    (isFetchingTransformationPlans ||
      isFetchingAllRequestsWithTasks ||
      isCancellingPlanRequest ||
      !!mostRecentRequest.cancelation_status)
  );
};

export const countFailedVms = mostRecentRequest => {
  let failed = false;
  let numFailedVms = 0;
  mostRecentRequest.miq_request_tasks.forEach(task => {
    if (task.status === 'Error') {
      failed = true;
      numFailedVms += 1;
    }
  });
  return { failed, numFailedVms };
};

export const getIndexedTasksOfPlan = (plan, requestsOfAssociatedPlan, mostRecentRequest) => {
  const tasksBySourceId = {};
  let tasksOfPlan = {};
  if (requestsOfAssociatedPlan.length > 0) {
    tasksOfPlan = getMostRecentVMTasksFromRequests(requestsOfAssociatedPlan, plan.options.config_info.actions);
  } else if (mostRecentRequest) {
    tasksOfPlan = mostRecentRequest.miq_request_tasks;
  }
  tasksOfPlan.forEach(task => {
    tasksBySourceId[task.source_id] = tasksBySourceId[task.source_id] || {};
    tasksBySourceId[task.source_id].completed = task.status === 'Ok' && task.state === 'finished';
    tasksBySourceId[task.source_id].virtv2v_disks = task.options.virtv2v_disks;
    tasksBySourceId[task.source_id].playbooks = task.options.playbooks;
  });
  return tasksBySourceId;
};

const isPlaybookRunning = playbook =>
  playbook && (playbook.job_state === PLAN_JOB_STATES.PENDING || playbook.job_state === PLAN_JOB_STATES.ACTIVE);

export const aggregateTasks = tasksBySourceId => {
  const sourceIds = Object.keys(tasksBySourceId);
  const numTotalVms = sourceIds.length;
  let numCompletedVms = 0;
  let taskRunningPreMigrationPlaybook = null;
  let taskRunningPostMigrationPlaybook = null;
  sourceIds.forEach(sourceId => {
    const task = tasksBySourceId[sourceId];
    if (task.completed) numCompletedVms += 1;
    // after we have assigned the latest tasks for each source, check the running playbook status
    if (task.playbooks) {
      if (isPlaybookRunning(task.playbooks.pre)) {
        taskRunningPreMigrationPlaybook = task;
      }
      if (isPlaybookRunning(task.playbooks.post)) {
        taskRunningPostMigrationPlaybook = task;
      }
    }
  });
  return { numTotalVms, numCompletedVms, taskRunningPreMigrationPlaybook, taskRunningPostMigrationPlaybook };
};

export const calculateTotalDiskSpace = tasksBySourceId => {
  let totalDiskSpace = 0;
  let totalMigratedDiskSpace = 0;
  Object.keys(tasksBySourceId).forEach(sourceId => {
    const taskDisks = tasksBySourceId[sourceId].virtv2v_disks;
    if (taskDisks && taskDisks.length) {
      const totalTaskDiskSpace = taskDisks.reduce((a, b) => a + b.size, 0);
      const percentComplete = taskDisks.reduce((a, b) => a + b.percent, 0) / (100 * taskDisks.length);
      const taskDiskSpaceCompleted = percentComplete * totalTaskDiskSpace;

      totalDiskSpace += totalTaskDiskSpace;
      totalMigratedDiskSpace += taskDiskSpaceCompleted;
    }
  });
  return { totalDiskSpace, totalMigratedDiskSpace };
};
