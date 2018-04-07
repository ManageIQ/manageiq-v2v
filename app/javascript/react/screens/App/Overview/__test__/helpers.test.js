import { planRequestWithPlanId, planRequestsWithPlanIds } from '../helpers';

import { transformationPlans } from '../overview.transformationPlans.fixtures';
import { transformationPlanRequests } from '../overview.transformationPlanRequests.fixtures';

const { resources: plans } = transformationPlans;
const { resources: planRequests } = transformationPlanRequests;

test('planRequestWithPlanId returns a plan request with its plans id', () => {
  const [transformationPlanRequest] = planRequests;
  const [, matchingPlan] = plans;
  const requestWithPlanId = planRequestWithPlanId(
    transformationPlanRequest,
    plans
  );

  expect(requestWithPlanId).toEqual({
    ...transformationPlanRequest,
    plan_id: matchingPlan.id
  });
});

test('planRequestsWithPlanIds returns a collection of plan requests with their plan ids added', () => {
  const [
    transformationPlanRequestOne,
    transformationPlanRequestTwo
  ] = planRequests;
  const [, matchingPlanOne, matchingPlanTwo] = plans;
  const result = planRequestsWithPlanIds(
    [transformationPlanRequestOne, transformationPlanRequestTwo],
    plans
  );

  expect(result).toEqual([
    {
      ...transformationPlanRequestOne,
      plan_id: matchingPlanOne.id
    },
    {
      ...transformationPlanRequestTwo,
      plan_id: matchingPlanTwo.id
    }
  ]);
});
