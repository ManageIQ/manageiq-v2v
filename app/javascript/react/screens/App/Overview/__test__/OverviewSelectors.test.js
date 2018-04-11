import {
  pendingTransformationPlansFilter,
  activeTransformationPlansFilter
} from '../OverviewSelectors';

import { transformationPlans } from '../overview.transformationPlans.fixtures';

const { resources: plans } = transformationPlans;

describe('pendingTransformationPlansFilter', () => {
  test('returns all pending transformation plans', () => {
    const [pendingPlan] = plans;
    const result = pendingTransformationPlansFilter(plans);

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
