import React from 'react';
import { shallow } from 'enzyme';

import InfrastructureMappingsList from '../InfrastructureMappingsList';
import ShowWizardEmptyState from '../../../../common/ShowWizardEmptyState/ShowWizardEmptyState';

let createInfraMappingClick;
beforeEach(() => {
  createInfraMappingClick = jest.fn();
});

test('it shows the create infra mapping empty state when there are no transformation mappings', () => {
  const wrapper = shallow(
    <InfrastructureMappingsList
      clusters={[]}
      transformationMappings={[]}
      createInfraMappingClick={createInfraMappingClick}
    />
  );
  expect(wrapper.find(ShowWizardEmptyState).props().buttonText).toBe('Create Infrastructure Mapping');
});

test('it shows the error empty state when there is an error loading mappings', () => {
  const wrapper = shallow(
    <InfrastructureMappingsList
      clusters={[{ dummyCluster: 1 }]}
      transformationMappings={[{ dummyMappings: 1 }]}
      error
    />
  );
  expect(wrapper.find(ShowWizardEmptyState).props().iconName).toBe('error-circle-o');
});
