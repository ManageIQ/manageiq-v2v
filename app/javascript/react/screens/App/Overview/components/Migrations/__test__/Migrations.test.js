import React from 'react';
import { shallow } from 'enzyme';

import Migrations from '../Migrations';

let createMigrationPlanClick;
beforeEach(() => {
  createMigrationPlanClick = jest.fn();
});

test('shows the empty state when there are no transformation plans', () => {
  const wrapper = shallow(
    <Migrations
      transformationMappingsExist
      transformationPlans={[]}
      archivedTransformationPlans={[]}
      createMigrationPlanClick={createMigrationPlanClick}
    />
  );

  expect(wrapper.find('ShowWizardEmptyState').exists()).toBe(true);
});
