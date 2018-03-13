import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MigrationsInProgressCard from '../MigrationsInProgressCard';
import { coreComponents } from '../../../../../../../../components/index';
import componentRegistry from '../../../../../../../../components/componentRegistry';
import { requestActiveServiceRequests } from '../migrationsInProgress.fixtures';
import * as MigrationsInProgressActions from '../MigrationsInProgressActions';

jest.mock('../../../../../../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('MigrationsInProgressCard component', () => {
  const getBaseProps = () => ({
    store: {},
    migrationsInProgress: requestActiveServiceRequests.response.data.resources,
    isFetchingMigrationsInProgress: false,
    isRejectedMigrationsInProgress: false,
    errorMigrationsInProgress: null,
    ...MigrationsInProgressActions
  });

  it('renders the ActiveMigrations', () => {
    const component = shallow(<MigrationsInProgressCard {...getBaseProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
