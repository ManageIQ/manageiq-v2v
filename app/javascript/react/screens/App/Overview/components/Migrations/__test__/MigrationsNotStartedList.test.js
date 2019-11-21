import React from 'react';
import { mount } from 'enzyme';

import MigrationsNotStartedList from '../MigrationsNotStartedList';
import { transformationPlans } from '../../../overview.transformationPlans.fixtures';
import ListViewTableRow from '../../../../common/ListViewTable/ListViewTableRow';

const { resources: plans } = transformationPlans;
const [notStartedPlan] = plans;

let scheduleMigrationNow;
let redirectTo;
let wrapper;
beforeEach(() => {
  scheduleMigrationNow = jest.fn();
  redirectTo = jest.fn();
  wrapper = mount(
    <MigrationsNotStartedList
      scheduleMigrationNow={scheduleMigrationNow}
      redirectTo={redirectTo}
      loading=""
      notStartedPlans={[notStartedPlan]}
    />
  );
});

test('clicking on a plan fires redirectTo with the path to its details page', () => {
  wrapper
    .find(ListViewTableRow)
    .at(0)
    .simulate('click');

  expect(redirectTo).toHaveBeenLastCalledWith(`/plan/${notStartedPlan.id}`);
});

test.skip('clicking on the Migrate button fires scheduleMigrationNow with the correct API endpoint', () => {
  const e = {
    stopPropagation: jest.fn()
  };
  wrapper
    .find('ListViewItem')
    .prop('actions')
    .props.children.props.onClick(e);

  expect(scheduleMigrationNow).toHaveBeenLastCalledWith(`/api/service_templates/${notStartedPlan.id}`);
});
