export const activeTransformationPlanRequestsFilter = transformationPlanRequests =>
  transformationPlanRequests.filter(
    transformationPlanRequest => transformationPlanRequest.state === 'active'
  );

export const completeTransformationPlanRequestsFilter = transformationPlanRequests =>
  transformationPlanRequests.filter(
    transformationPlanRequest => transformationPlanRequest.state === 'complete'
  );

export const pendingTransformationPlansFilter = transformationPlans =>
  transformationPlans.filter(
    transformationPlan => transformationPlan.miq_requests.length === 0
  );
