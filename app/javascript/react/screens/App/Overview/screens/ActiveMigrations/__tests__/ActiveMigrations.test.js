import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ActiveMigrations from '../ActiveMigrations';
import { coreComponents } from '../../../../../../../components';
import componentRegistry from '../../../../../../..//components/componentRegistry';
import { requestActiveServiceRequests } from '../activeMigrations.fixtures';
import * as MigrationsActions from '../ActiveMigrationsActions';

jest.mock('../../../../../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('ActiveMigrations component', () => {
  const getBaseProps = () => ({
    store: {},
    activeMigrations: requestActiveServiceRequests.response.data.resources,
    isFetchingActiveMigrations: false,
    isRejectedActiveMigrations: false,
    errorActiveMigrations: '',
    ...MigrationsActions
  });

  it('renders the ActiveMigrations', () => {
    const component = shallow(<ActiveMigrations {...getBaseProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
