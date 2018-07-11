import getMostRecentRequest from '../common/getMostRecentRequest';

export const notStartedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => transformationPlan.miq_requests.length === 0);

export const activeTransformationPlansFilter = (transformationPlans, planId) =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.id === planId) {
      return true;
    }
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return mostRecentRequest.request_state === 'active' || mostRecentRequest.request_state === 'pending';
    }
    return false;
  });

export const finishedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return mostRecentRequest.request_state === 'finished' || mostRecentRequest.request_state === 'failed';
    }
    return false;
  });

export const finishedWithErrorTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return mostRecentRequest.request_state === 'finished' && mostRecentRequest.status === 'Error';
    }
    return false;
  });
