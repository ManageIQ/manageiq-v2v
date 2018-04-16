import {
  notStartedTransformationPlansFilter,
  activeTransformationPlansFilter,
  finishedTransformationPlansFilter
} from '../OverviewSelectors';

import { transformationPlans } from '../overview.transformationPlans.fixtures';

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
    const [, activePlanOne, activePlanTwo, , , activePlanThree] = plans;
    const result = activeTransformationPlansFilter(plans);

    expect(result).toEqual([activePlanOne, activePlanTwo, activePlanThree]);
  });
});

describe('finishedTransformationPlansFilter', () => {
  test('returns all finished (complete or failed) transformation plans', () => {
    const [, , , finishedPlanOne, finishedPlanTwo] = plans;
    const result = finishedTransformationPlansFilter(plans);

    expect(result).toEqual([finishedPlanOne, finishedPlanTwo]);
  });
});
