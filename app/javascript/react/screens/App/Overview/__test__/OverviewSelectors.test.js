import { pendingTransformationPlansFilter } from '../OverviewSelectors';

import { transformationPlans } from '../overview.transformationPlans.fixtures';

const { resources: plans } = transformationPlans;

describe('pendingTransformationPlansFilter', () => {
  test('returns all pending transformation plans', () => {
    const [pendingPlan] = plans;
    const result = pendingTransformationPlansFilter(plans);

    expect(result).toEqual([pendingPlan]);
  });
});
