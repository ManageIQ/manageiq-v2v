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
      return (
        mostRecentRequest.request_state === 'active' ||
        mostRecentRequest.request_state === 'pending' ||
        (mostRecentRequest.approval_state === 'denied' && !mostRecentRequest.options.denial_acknowledged)
      );
    }
    return false;
  });

export const finishedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return (
        (mostRecentRequest.request_state === 'finished' && mostRecentRequest.approval_state !== 'denied') ||
        mostRecentRequest.request_state === 'failed' ||
        (mostRecentRequest.approval_state === 'denied' && mostRecentRequest.options.denial_acknowledged)
      );
    }
    return false;
  });

export const finishedWithErrorTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan.miq_requests);
      return (
        (mostRecentRequest.request_state === 'finished' && mostRecentRequest.status === 'Error') ||
        mostRecentRequest.approval_state === 'denied'
      );
    }
    return false;
  });
