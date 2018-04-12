import React from 'react';
import { shallow } from 'enzyme';

import ActiveTransformationPlans from '../ActiveTransformationPlans';
import { activeTransformationPlansFilter } from '../../../../OverviewSelectors';
import { transformationPlans } from '../../../../overview.transformationPlans.fixtures';

const { resources: plans } = transformationPlans;
const activePlans = activeTransformationPlansFilter(plans);

test('displays the number of active transformation plans with an error', () => {
  const [, activePlan, erroredPlan] = activePlans;
  const wrapper = shallow(
    <ActiveTransformationPlans activePlans={[activePlan, erroredPlan]} />
  );

  expect(wrapper.find('Icon').prop('name')).toBe('error-circle-o');
  expect(
    wrapper
      .find('AggregateStatusNotification')
      .childAt(2)
      .text()
  ).toBe('1');
});
