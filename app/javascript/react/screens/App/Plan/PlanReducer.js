import Immutable from 'seamless-immutable';
import numeral from 'numeral';
import commonUtilitiesHelper from '../common/commonUtilitiesHelper';
import getMostRecentVMTasksFromRequests from '../Overview/components/Migrations/helpers/getMostRecentVMTasksFromRequests';
import { IsoElapsedTime } from '../../../../components/dates/IsoElapsedTime';

import {
  FETCH_V2V_PLAN,
  FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE,
  FETCH_V2V_MIGRATION_TASK_LOG,
  DOWNLOAD_LOG_CLICKED,
  DOWNLOAD_LOG_COMPLETED,
  V2V_MIGRATION_STATUS_MESSAGES,
  STATUS_MESSAGE_KEYS
} from './PlanConstants';

export const initialState = Immutable({
  isFetchingPlanRequest: false,
  isRejectedPlanRequest: false,
  planRequestPreviouslyFetched: false,
  errorPlanRequest: null,
  planRequestTasks: [],
  planRequestFailed: false,
  isFetchingPlan: false,
  isRejectedPlan: false,
  errorPlan: null,
  plan: {},
  planArchived: false,
  isQueryingVms: false,
  isRejectedVms: false,
  errorVms: null,
  vms: []
});

const excludeDownloadDoneTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds.filter(element => element !== taskId);

const includeDownloadInProgressTaskId = (allDownloadLogInProgressTaskIds, taskId) =>
  allDownloadLogInProgressTaskIds ? allDownloadLogInProgressTaskIds.concat(taskId) : [taskId];

const processVMTasks = vmTasks => {
  const tasks = [];
  vmTasks.forEach(task => {
    const taskDetails = {
      id: task.id,
      message: V2V_MIGRATION_STATUS_MESSAGES[task.message],
      transformation_host_name: task.options && task.options.transformation_host_name,
      delivered_on: new Date(task.options.delivered_on),
      updated_on: new Date(task.updated_on),
      completed:
        task.message === STATUS_MESSAGE_KEYS.VM_MIGRATIONS_COMPLETED ||
        task.message === STATUS_MESSAGE_KEYS.VM_MIGRATIONS_FAILED,
      state: task.state,
      status: task.status,
      options: {}
    };

    taskDetails.options.progress = task.options.progress;
    taskDetails.options.virtv2v_wrapper = task.options.virtv2v_wrapper;

    if (!task.diskSpaceCompletedGb) {
      taskDetails.diskSpaceCompletedGb = '0';
    }

    if (!task.percentComplete) {
      taskDetails.percentComplete = 0;
    }

    if (!task.totalDiskSpaceGb) {
      taskDetails.totalDiskSpaceGb = '100%';
    }

    const grepVMName = task.description.match(/\[(.*?)\]/);

    if (grepVMName) {
      [taskDetails.descriptionPrefix, taskDetails.vmName] = grepVMName;
    }

    const startDateTime = taskDetails.delivered_on;
    const lastUpdateDateTime = taskDetails.updated_on;
    taskDetails.startDateTime = startDateTime;
    taskDetails.lastUpdateDateTime = lastUpdateDateTime;

    taskDetails.elapsedTime = IsoElapsedTime(new Date(startDateTime), new Date(lastUpdateDateTime));

    if (taskDetails.completed) {
      taskDetails.completedSuccessfully =
        task.options.progress.current_description === 'Virtual machine migrated' ||
        task.options.progress.current_description === 'Mark source as migrated';
    }
    if (task.options && task.options.virtv2v_disks && task.options.virtv2v_disks.length) {
      taskDetails.totalDiskSpace = task.options.virtv2v_disks.reduce((a, b) => a + b.size, 0);
      taskDetails.totalDiskSpaceGb = numeral(taskDetails.totalDiskSpace).format('0.00b');

      const percentComplete =
        task.options.virtv2v_disks.reduce((a, b) => a + b.percent, 0) / (100 * task.options.virtv2v_disks.length);

      taskDetails.diskSpaceCompleted = percentComplete * taskDetails.totalDiskSpace;
      taskDetails.diskSpaceCompletedGb = numeral(taskDetails.diskSpaceCompleted).format('0.00b');
      taskDetails.percentComplete = Math.round(percentComplete * 1000) / 10;
    }
    tasks.push(taskDetails);
  });
  return tasks;
};

const allVMTasksForRequestOfPlan = (requestWithTasks, actions) => {
  const tasksOfPlan = getMostRecentVMTasksFromRequests(requestWithTasks, actions);
  return processVMTasks(tasksOfPlan);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PLAN}_PENDING`:
      return state.set('isFetchingPlan', true).set('isRejectedPlan', false);
    case `${FETCH_V2V_PLAN}_FULFILLED`:
      return state
        .set('plan', action.payload.data)
        .set('planName', action.payload.data.name)
        .set('planArchived', !!action.payload.data.archived)
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', false)
        .set('errorPlan', null);
    case `${FETCH_V2V_PLAN}_REJECTED`:
      return state
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', true)
        .set('errorPlan', action.payload);

    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_PENDING`:
      return state.set('isFetchingPlanRequest', true).set('isRejectedPlanRequest', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_FULFILLED`:
      if (action.payload.data) {
        return state
          .set(
            'planRequestTasks',
            allVMTasksForRequestOfPlan(action.payload.data.results, state.plan.options.config_info.actions)
          )
          .set('allRequestsWithTasksForPlan', action.payload.data.results)
          .set('planRequestPreviouslyFetched', true)
          .set(
            'planRequestFailed',
            commonUtilitiesHelper.getMostRecentEntityByCreationDate(action.payload.data.results).status === 'Error'
          )
          .set('isRejectedPlanRequest', false)
          .set('errorPlanRequest', null)
          .set('isFetchingPlanRequest', false);
      }
      return state
        .set('planRequestPreviouslyFetched', true)
        .set('isRejectedPlanRequest', false)
        .set('errorPlanRequest', null)
        .set('isFetchingPlanRequest', false);
    case `${FETCH_V2V_ALL_REQUESTS_WITH_TASKS_FOR_PLAN}_REJECTED`:
      return state
        .set('errorPlanRequest', action.payload)
        .set('isRejectedPlanRequest', true)
        .set('isFetchingPlanRequest', false);

    case `${QUERY_V2V_PLAN_VMS}_PENDING`:
      return state.set('isQueryingVms', true).set('isRejectedVms', false);
    case `${QUERY_V2V_PLAN_VMS}_FULFILLED`:
      return state
        .set('vms', action.payload.data.results)
        .set('isQueryingVms', false)
        .set('isRejectedVms', false)
        .set('errorVms', null);
    case `${QUERY_V2V_PLAN_VMS}_REJECTED`:
      return state
        .set('isQueryingVms', false)
        .set('isRejectedVms', true)
        .set('errorVms', action.payload);

    case RESET_PLAN_STATE:
      return state
        .set('planRequestTasks', [])
        .set('vms', [])
        .set('planRequestPreviouslyFetched', false);

    case `${FETCH_V2V_MIGRATION_TASK_LOG}_PENDING`:
      return state.set('isFetchingMigrationTaskLog', true).set('isRejectedMigrationTaskLog', false);
    case `${FETCH_V2V_MIGRATION_TASK_LOG}_FULFILLED`:
      return state
        .set('isFetchingMigrationTaskLog', false)
        .set('isRejectedMigrationTaskLog', false)
        .set('errorMigrationTaskLog', null);
    case `${FETCH_V2V_MIGRATION_TASK_LOG}_REJECTED`:
      return state
        .set('isFetchingMigrationTaskLog', false)
        .set('isRejectedMigrationTaskLog', true)
        .set('errorMigrationTaskLog', action.payload);

    case DOWNLOAD_LOG_CLICKED:
      return state.set(
        'downloadLogInProgressTaskIds',
        includeDownloadInProgressTaskId(state.downloadLogInProgressTaskIds, action.payload)
      );
    case DOWNLOAD_LOG_COMPLETED:
      return state.set(
        'downloadLogInProgressTaskIds',
        excludeDownloadDoneTaskId(state.downloadLogInProgressTaskIds, action.payload)
      );

    default:
      return state;
  }
};
