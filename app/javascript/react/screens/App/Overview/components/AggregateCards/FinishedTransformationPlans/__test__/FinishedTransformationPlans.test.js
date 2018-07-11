import React from 'react';
import { shallow } from 'enzyme';

import FinishedTransformationPlans from '../FinishedTransformationPlans';
import { finishedTransformationPlansFilter } from '../../../../OverviewSelectors';
import { transformationPlans } from '../../../../overview.transformationPlans.fixtures';

const { resources: plans } = transformationPlans;
const finishedPlans = finishedTransformationPlansFilter(plans);

test('displays the number of finished transformation plans with an error', () => {
  const [failedPlan, completePlan] = finishedPlans;
  const wrapper = shallow(<FinishedTransformationPlans finishedPlans={[failedPlan, completePlan]} />);

  expect(wrapper.find('Icon').prop('name')).toBe('error-circle-o');
  expect(
    wrapper
      .find('AggregateStatusNotification')
      .childAt(2)
      .text()
  ).toBe('1');
});
