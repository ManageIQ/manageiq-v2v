export const planRequestWithPlanId = (
  transformationPlanRequest,
  transformationPlans
) => {
  const matchingPlan = transformationPlans.find(transformationPlan =>
    transformationPlan.miq_requests.some(
      request => request.id === transformationPlanRequest.id
    )
  );

  return matchingPlan
    ? { ...transformationPlanRequest, plan_id: matchingPlan.id }
    : transformationPlanRequest;
};

export const planRequestsWithPlanIds = (
  transformationPlanRequests,
  transformationPlans
) =>
  transformationPlanRequests.map(transformationPlanRequest =>
    planRequestWithPlanId(transformationPlanRequest, transformationPlans)
  );
