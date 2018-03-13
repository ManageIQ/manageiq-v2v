import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MigrationFailedVMsList from '../MigrationFailedVMsList';
import { coreComponents } from '../../../../../../../../components/index';
import componentRegistry from '../../../../../../../../components/componentRegistry';
import { requestCompletedServiceRequests } from '../migrationsCompleted.fixtures';

jest.mock('../../../../../../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('MigrationFailedVMsList component', () => {
  const migrations = requestCompletedServiceRequests.response.data.resources;

  it('renders the MigrationsCompletedCard', () => {
    const component = shallow(
      <MigrationFailedVMsList migration={migrations[1]} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });
});
