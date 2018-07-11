import React from 'react';
import { shallow } from 'enzyme';

import ActiveTransformationPlans from '../ActiveTransformationPlans';
import { activeTransformationPlansFilter } from '../../../../OverviewSelectors';
import { transformationPlans } from '../../../../overview.transformationPlans.fixtures';
import { allRequestsWithTasks } from '../../../../overview.requestWithTasks.fixtures';

const { resources: plans } = transformationPlans;
const { results: requests } = allRequestsWithTasks;
const activePlans = activeTransformationPlansFilter(plans);

test('displays the number of active transformation plans with an error', () => {
  const wrapper = shallow(<ActiveTransformationPlans activePlans={activePlans} allRequestsWithTasks={requests} />);

  expect(wrapper.find('Icon').prop('name')).toBe('error-circle-o');
  expect(
    wrapper
      .find('AggregateStatusNotification')
      .childAt(2)
      .text()
  ).toBe('1');
});
