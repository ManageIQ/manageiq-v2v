import React from 'react';
import { shallow } from 'enzyme';

import Migrations from '../Migrations';

let createMigrationPlanClick;
let setMigrationsFilterAction;
beforeEach(() => {
  createMigrationPlanClick = jest.fn();
  setMigrationsFilterAction = jest.fn();
});

test('shows the empty state when there are no transformation plans', () => {
  const wrapper = shallow(
    <Migrations
      transformationMappingsExist
      transformationPlans={[]}
      archivedTransformationPlans={[]}
      createMigrationPlanClick={createMigrationPlanClick}
      setMigrationsFilterAction={setMigrationsFilterAction}
    />
  );

  expect(wrapper.find('ShowWizardEmptyState').exists()).toBe(true);
});
