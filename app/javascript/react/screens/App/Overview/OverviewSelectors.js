export const pendingTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(
    transformationPlan => transformationPlan.miq_requests.length === 0
  );

export const activeTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const [mostRecentRequest] = transformationPlan.miq_requests.slice(-1);
      return mostRecentRequest.status === 'active';
    }
    return false;
  });

export const finishedTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(transformationPlan => {
    if (transformationPlan.miq_requests.length > 0) {
      const [mostRecentRequest] = transformationPlan.miq_requests.slice(-1);
      return (
        mostRecentRequest.status === 'complete' ||
        mostRecentRequest.status === 'failed'
      );
    }
    return false;
  });
