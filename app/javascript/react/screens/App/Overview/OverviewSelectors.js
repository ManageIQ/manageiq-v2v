export const pendingTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(
    transformationPlan => transformationPlan.miq_requests.length === 0
  );
