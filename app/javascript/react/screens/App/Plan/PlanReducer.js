import Immutable from 'seamless-immutable';
import numeral from 'numeral';

import { FETCH_V2V_PLAN_REQUESTS } from './PlanConstants';

const initialState = Immutable({
  isFetchingPlanRequests: false,
  isRejectedPlanRequests: false,
  planRequestsPreviouslyFetched: false,
  errorPlanRequests: null,
  planRequestTasks: []
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
    case `${FETCH_V2V_PLAN_REQUESTS}_PENDING`:
      return state
        .set('isFetchingPlanRequests', true)
        .set('isRejectedPlanRequests', false);
    case `${FETCH_V2V_PLAN_REQUESTS}_FULFILLED`: {
      const { payload } = action;
      if (payload.data) {
        const newTasks = _formatPlanRequestDetails(payload.data);
        if (!_deepCompare(state.planRequestTasks, newTasks)) {
          return state
            .set('planRequestsPreviouslyFetched', true)
            .set('planName', payload.data && payload.data.description)
            .set('planRequestTasks', newTasks)
            .set('isRejectedPlanRequests', false)
            .set('errorPlanRequests', null)
            .set('isFetchingPlanRequests', false);
        }
      }
      return state
        .set('planRequestsPreviouslyFetched', true)
        .set('planName', payload.data && payload.data.description)
        .set('isRejectedPlanRequests', false)
        .set('errorPlanRequests', null)
        .set('isFetchingPlanRequests', false);
    }
    case `${FETCH_V2V_PLAN_REQUESTS}_REJECTED`:
      return state
        .set('errorPlanRequests', action.payload)
        .set('isRejectedPlanRequests', true)
        .set('isFetchingPlanRequests', false);
    default:
      return state;
  }
};
