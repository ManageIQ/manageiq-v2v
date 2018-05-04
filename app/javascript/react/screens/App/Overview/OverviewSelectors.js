const getMostRecentRequest = plan =>
  plan.miq_requests.reduce(
    (prev, current) => (prev.updated_on > current.updated_on ? prev : current)
  );

export const notStartedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(
    transformationPlan => transformationPlan.miq_requests.length === 0
  );

export const activeTransformationPlansFilter = (transformationPlans, planId) =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.id === planId) {
      return true;
    }
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan);
      return (
        mostRecentRequest.request_state === 'active' ||
        mostRecentRequest.request_state === 'pending'
      );
    }
    return false;
  });

export const finishedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const mostRecentRequest = getMostRecentRequest(transformationPlan);
      return (
        mostRecentRequest.request_state === 'finished' ||
        mostRecentRequest.request_state === 'failed'
      );
    }
    return false;
  });
