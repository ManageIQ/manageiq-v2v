import Immutable from 'seamless-immutable';
import numeral from 'numeral';

import {
  FETCH_V2V_PLAN_REQUEST,
  FETCH_V2V_PLAN,
  QUERY_V2V_PLAN_VMS,
  RESET_PLAN_STATE
} from './PlanConstants';

export const initialState = Immutable({
  isFetchingPlanRequest: false,
  isRejectedPlanRequest: false,
  planRequestPreviouslyFetched: false,
  errorPlanRequest: null,
  planRequestTasks: [],
  isFetchingPlan: false,
  isRejectedPlan: false,
  errorPlan: null,
  plan: {},
  isQueryingVms: false,
  isRejectedVms: false,
  errorVms: null,
  vms: []
});

const _formatPlanRequestDetails = data => {
  const tasks = [];
  if (data.miq_request_tasks && data.miq_request_tasks.length) {
    data.miq_request_tasks.forEach(task => {
      const taskDetails = {
        id: task.id,
        message: task.message,
        transformation_host_name:
          task.options && task.options.transformation_host_name,
        delivered_on: new Date(task.options.delivered_on),
        updated_on: new Date(task.updated_on),
        completed: task.message === 'VM Transformations completed',
        state: task.state,
        status: task.status,
        options: {}
      };

      taskDetails.options.progress = task.options.progress;
      taskDetails.options.virtv2v_wrapper = task.options.virtv2v_wrapper;

      if (taskDetails.completed) {
        taskDetails.completedSuccessfully =
          task.options.progress.current_description ===
          'Virtual machine migrated';
      }
      if (
        task.options &&
        task.options.virtv2v_disks &&
        task.options.virtv2v_disks.length
      ) {
        taskDetails.totalDiskSpace = task.options.virtv2v_disks.reduce(
          (a, b) => a + b.size,
          0
        );
        taskDetails.totalDiskSpaceGb = numeral(
          taskDetails.totalDiskSpace
        ).format('0.00b');

        const percentComplete =
          task.options.virtv2v_disks.reduce((a, b) => a + b.percent, 0) /
          (100 * task.options.virtv2v_disks.length);

        taskDetails.diskSpaceCompleted =
          percentComplete * taskDetails.totalDiskSpace;
        taskDetails.diskSpaceCompletedGb = numeral(
          taskDetails.diskSpaceCompleted
        ).format('0.00b');
        taskDetails.percentComplete = Math.round(percentComplete * 1000) / 10;
      }
      tasks.push(taskDetails);
    });
  }
  return tasks;
};

const _deepCompare = (prevTasks, newTasks) =>
  JSON.stringify(prevTasks) === JSON.stringify(newTasks);

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PLAN_REQUEST}_PENDING`:
      return state
        .set('isFetchingPlanRequest', true)
        .set('isRejectedPlanRequest', false);
    case `${FETCH_V2V_PLAN_REQUEST}_FULFILLED`: {
      const { payload } = action;
      if (payload.data) {
        const newTasks = _formatPlanRequestDetails(payload.data);
        if (!_deepCompare(state.planRequestTasks, newTasks)) {
          return state
            .set('planRequestPreviouslyFetched', true)
            .set('planRequestTasks', newTasks)
            .set('isRejectedPlanRequest', false)
            .set('errorPlanRequest', null)
            .set('isFetchingPlanRequest', false);
        }
      }
      return state
        .set('planRequestPreviouslyFetched', true)
        .set('isRejectedPlanRequest', false)
        .set('errorPlanRequest', null)
        .set('isFetchingPlanRequest', false);
    }
    case `${FETCH_V2V_PLAN_REQUEST}_REJECTED`:
      return state
        .set('errorPlanRequest', action.payload)
        .set('isRejectedPlanRequest', true)
        .set('isFetchingPlanRequest', false);

    case `${FETCH_V2V_PLAN}_PENDING`:
      return state.set('isFetchingPlan', true).set('isRejectedPlan', false);
    case `${FETCH_V2V_PLAN}_FULFILLED`:
      return state
        .set('plan', action.payload.data)
        .set('planName', action.payload.data.name)
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', false)
        .set('errorPlan', null);
    case `${FETCH_V2V_PLAN}_REJECTED`:
      return state
        .set('isFetchingPlan', false)
        .set('isRejectedPlan', true)
        .set('errorPlan', action.payload);

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
      return state.set('planRequestTasks', []).set('vms', []);
    default:
      return state;
  }
};
