import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter,
  requestsProcessingCancellationFilter
} from '../OverviewSelectors';
import { urlBuilder } from '../components/Migrations/helpers';

import { transformationPlans } from '../overview.transformationPlans.fixtures';
import { TRANSFORMATION_PLAN_REQUESTS_URL } from '../OverviewConstants';

const { resources: plans } = transformationPlans;

describe('notStartedTransformationPlansFilter', () => {
  test('returns all pending transformation plans', () => {
    const [pendingPlan] = plans;
    const result = notStartedTransformationPlansFilter(plans);

    expect(result).toEqual([pendingPlan]);
  });
});

describe('activeTransformationPlansFilter', () => {
  test('returns all active transformation plans', () => {
    const [, activePlanOne, activePlanTwo, , , activePlanThree, activePlanFour, activePlan5] = plans;
    const result = activeTransformationPlansFilter(plans);

    expect(result).toEqual([activePlanOne, activePlanTwo, activePlanThree, activePlanFour, activePlan5]);
  });
});

describe('finishedTransformationPlansFilter', () => {
  test('returns all finished (complete or failed) transformation plans', () => {
    const [, , , finishedPlanOne, finishedPlanTwo] = plans;
    const result = finishedTransformationPlansFilter(plans);

    expect(result).toEqual([finishedPlanOne, finishedPlanTwo]);
  });
});

describe('requestsProcessingCancellationFilter', () => {
  test('returns all requests processing cancellation', () => {
    const plan = plans[6];
    const [requestProcessingCancellation] = plan.miq_requests;
    const url = urlBuilder(TRANSFORMATION_PLAN_REQUESTS_URL, requestProcessingCancellation.id);
    const result = requestsProcessingCancellationFilter(plans);

    expect(result).toEqual([url]);
  });
});
