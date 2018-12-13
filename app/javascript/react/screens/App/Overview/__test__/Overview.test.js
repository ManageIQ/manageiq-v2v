import React from 'react';
import { shallow } from 'enzyme';

import Overview from '../Overview';
import { coreComponents } from '../../../../../components';
import componentRegistry from '../../../../../components/componentRegistry';

jest.mock('../../../../../components/componentRegistry');
jest.useFakeTimers();

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  const getBaseProps = () => ({
    store: {},
    planWizardVisible: false,
    isFetchingTransformationMappings: false,
    isRejectedTransformationMappings: false,
    transformationMappings: [],
    transformationPlans: [],
    fetchTransformationPlansUrl: '',
    fetchServiceTemplateAnsiblePlaybooksUrl: '',
    archivedTransformationPlans: [],
    showPlanWizardAction: jest.fn(),
    fetchProvidersAction: jest.fn(),
    fetchTransformationMappingsAction: jest.fn(),
    fetchTransformationPlansAction: jest.fn().mockReturnValue(Promise.resolve()),
    fetchServiceTemplateAnsiblePlaybooksAction: jest.fn().mockReturnValue(Promise.resolve()),
    fetchCloudTenantsAction: jest.fn(),
    redirectTo: jest.fn()
  });

  describe('polling', () => {
    test('starts when the component is mounted', () => {
      const props = getBaseProps();
      const wrapper = shallow(<Overview {...props} />); // eslint-disable-line no-unused-vars
      expect(props.fetchTransformationPlansAction).toHaveBeenCalled();
    });

    test('fetches transformation plan requests every 15 seconds', () => {
      const props = getBaseProps();
      const wrapper = shallow(<Overview {...props} />); // eslint-disable-line no-unused-vars
      jest.advanceTimersByTime(15000);
      expect(props.fetchTransformationPlansAction).toHaveBeenCalledTimes(2);
    });
  });

  describe('checks for necessary providers', () => {
    test('and displays empty state if insufficient', () => {
      const props = getBaseProps();
      const wrapper = shallow(<Overview {...props} hasSufficientProviders={false} />); // eslint-disable-line no-unused-vars
      expect(wrapper.find('ShowWizardEmptyState')).toMatchSnapshot();
    });
  });
});
