export const notStartedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(
    transformationPlan => transformationPlan.miq_requests.length === 0
  );

export const activeTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const [mostRecentRequest] = transformationPlan.miq_requests.slice(-1);
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
      const [mostRecentRequest] = transformationPlan.miq_requests.slice(-1);
      return (
        mostRecentRequest.request_state === 'finished' ||
        mostRecentRequest.request_state === 'failed'
      );
    }
    return false;
  });
