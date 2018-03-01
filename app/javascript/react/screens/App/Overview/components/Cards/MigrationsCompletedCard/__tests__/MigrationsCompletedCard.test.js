import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import MigrationsCompletedCard from '../MigrationsCompletedCard';
import { coreComponents } from '../../../../../../../../components/index';
import componentRegistry from '../../../../../../../../components/componentRegistry';
import { requestCompletedServiceRequests } from '../migrationsCompleted.fixtures';
import * as MigrationsCompletedActions from '../MigrationsCompletedActions';

jest.mock('../../../../../../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('MigrationsCompletedCard component', () => {
  const getBaseProps = () => ({
    store: {},
    migrationsCompleted:
      requestCompletedServiceRequests.response.data.resources,
    isFetchingMigrationsCompleted: false,
    isRejectedMigrationsCompleted: false,
    errorMigrationsCompleted: null,
    ...MigrationsCompletedActions
  });

  it('renders the MigrationsCompletedCard', () => {
    const component = shallow(<MigrationsCompletedCard {...getBaseProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
