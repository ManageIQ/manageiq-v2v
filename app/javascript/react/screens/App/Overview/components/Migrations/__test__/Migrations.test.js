import React from 'react';
import { shallow } from 'enzyme';

import { transformationPlans } from '../../../overview.transformationPlans.fixtures';
import Migrations from '../Migrations';

const { resources: plans } = transformationPlans;

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

test('selecting Archived Plans triggers an API call to fetch all archived plans', () => {
  const fetchTransformationPlansAction = jest.fn();
  const setActiveFilter = jest.fn();
  const url = '/api/dummy';
  const wrapper = shallow(
    <Migrations
      setActiveFilter={setActiveFilter}
      transformationPlans={plans}
      fetchTransformationPlansAction={fetchTransformationPlansAction}
      fetchArchivedTransformationPlansUrl={url}
    />
  );

  wrapper.find('DropdownButton').prop('onSelect')('Archived Plans');

  expect(fetchTransformationPlansAction).toHaveBeenLastCalledWith({
    archived: true,
    url
  });
});
