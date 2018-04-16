import React from 'react';
import { shallow } from 'enzyme';

import InfrastructureMappingsList from '../InfrastructureMappingsList';

let createInfraMappingClick;
beforeEach(() => {
  createInfraMappingClick = jest.fn();
});

test('it shows the empty state when there are no transformation mappings', () => {
  const wrapper = shallow(
    <InfrastructureMappingsList
      clusters={[]}
      transformationMappings={[]}
      createInfraMappingClick={createInfraMappingClick}
    />
  );

  expect(wrapper.find('OverviewEmptyState').exists()).toBe(true);
});
