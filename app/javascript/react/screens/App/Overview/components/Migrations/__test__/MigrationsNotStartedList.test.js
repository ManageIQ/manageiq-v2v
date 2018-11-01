import React from 'react';
import { mount } from 'enzyme';

import MigrationsNotStartedList from '../MigrationsNotStartedList';
import { transformationPlans } from '../../../overview.transformationPlans.fixtures';

const { resources: plans } = transformationPlans;
const [notStartedPlan] = plans;

let migrateClick;
let redirectTo;
let wrapper;
beforeEach(() => {
  migrateClick = jest.fn();
  redirectTo = jest.fn();
  wrapper = mount(
    <MigrationsNotStartedList
      migrateClick={migrateClick}
      redirectTo={redirectTo}
      loading=""
      notStartedPlans={[notStartedPlan]}
    />
  );
});

test('clicking on a plan fires redirectTo with the path to its details page', () => {
  wrapper
    .find('ListViewItem')
    .at(0)
    .simulate('click');

  expect(redirectTo).toHaveBeenLastCalledWith(`/migration/plan/${notStartedPlan.id}`);
});

test.skip('clicking on the Migrate button fires migrateClick with the correct API endpoint', () => {
  const e = {
    stopPropagation: jest.fn()
  };
  wrapper
    .find('ListViewItem')
    .prop('actions')
    .props.children.props.onClick(e);

  expect(migrateClick).toHaveBeenLastCalledWith(`/api/service_templates/${notStartedPlan.id}`);
});
