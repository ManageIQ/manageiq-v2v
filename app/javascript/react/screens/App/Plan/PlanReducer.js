import Immutable from 'seamless-immutable';
import numeral from 'numeral';

import { FETCH_V2V_PLAN_REQUESTS } from './PlanConstants';

const initialState = Immutable({
  isFetchingPlanRequests: false,
  isRejectedPlanRequests: false,
  errorPlanRequests: null,
  planRequestDetails: {}
});

const _formatPlanRequestDetails = data => {
  const planRequestDetails = {
    name: data.description,
    tasks: []
  };
  if (data.miq_request_tasks && data.miq_request_tasks.length) {
    data.miq_request_tasks.forEach(task => {
      const taskDetails = {
        id: task.id,
        message: task.message,
        transformation_host_name:
          task.options && task.options.transformation_host_name,
        delivered_on: task.options.delivered_on,
        updated_on: task.updated_on,
        completed: task.message === 'VM Transformations completed'
      };
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
        taskDetails.percentComplete = percentComplete * 100;
      }
      planRequestDetails.tasks.push(taskDetails);
    });
  }
  return planRequestDetails;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PLAN_REQUESTS}_PENDING`:
      return state
        .set('isFetchingPlanRequests', true)
        .set('isRejectedPlanRequests', false);
    case `${FETCH_V2V_PLAN_REQUESTS}_FULFILLED`: {
      const { payload } = action;
      if (payload && payload.data) {
        return state
          .set('planRequestDetails', _formatPlanRequestDetails(payload.data))
          .set('isRejectedPlanRequests', false)
          .set('isFetchingPlanRequests', false);
      }
      return state
        .set('planRequestDetails', {})
        .set('isRejectedPlanRequests', false)
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
