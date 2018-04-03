import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Overview from '../Overview';
import { coreComponents } from '../../../../../components';
import componentRegistry from '../../../../../components/componentRegistry';

jest.mock('../../../../../components/componentRegistry');

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  const getBaseProps = () => ({
    store: {},
    showMappingWizardAction: jest.fn(),
    showPlanWizardAction: jest.fn(),
    mappingWizardVisible: false,
    planWizardVisible: false,
    fetchTransformationMappingsAction: jest.fn(),
    isFetchingTransformationMappings: false,
    isRejectedTransformationMappings: false,
    fetchTransformationPlanRequestsAction: jest.fn(),
    isFetchingTransformationPlanRequests: false,
    isRejectedTransformationPlanRequests: false,
    errorTransformationPlanRequests: null
  });

  it('renders the overview', () => {
    const component = shallow(<Overview {...getBaseProps()} />);
    expect(toJson(component)).toMatchSnapshot();
  });
});
