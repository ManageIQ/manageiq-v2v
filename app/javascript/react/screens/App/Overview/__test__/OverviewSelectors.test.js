import {
  activeTransformationPlanRequestsFilter,
  completeTransformationPlanRequestsFilter,
  pendingTransformationPlansFilter
} from '../OverviewSelectors';

import { transformationPlanRequests } from '../overview.transformationPlanRequests.fixtures';
import { transformationPlans } from '../overview.transformationPlans.fixtures';

const { resources: planRequests } = transformationPlanRequests;
const { resources: plans } = transformationPlans;

describe('activeTransformationPlanRequestsFilter', () => {
  test('returns all active transformation plan requests', () => {
    const [activePlanRequestOne, , activePlanRequestTwo] = planRequests;
    const result = activeTransformationPlanRequestsFilter(planRequests);

    expect(result).toEqual([activePlanRequestOne, activePlanRequestTwo]);
  });
});

describe('completeTransformationPlanRequestsFilter', () => {
  test('returns all complete transformation plan requests', () => {
    const [, , , , completePlanRequest] = planRequests;
    const result = completeTransformationPlanRequestsFilter(planRequests);

    expect(result).toEqual([completePlanRequest]);
  });
});

describe('pendingTransformationPlansFilter', () => {
  test('returns all not started transformation plans', () => {
    const [pendingPlan] = plans;
    const result = pendingTransformationPlansFilter(plans);

    expect(result).toEqual([pendingPlan]);
  });
});
