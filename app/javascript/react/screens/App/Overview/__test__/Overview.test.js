import React from 'react';
import { shallow } from 'enzyme';
import Overview from '../Overview';
import { coreComponents } from '../../../../../components';
import componentRegistry from '../../../../../components/componentRegistry';
import { transformationMappings } from '../overview.fixtures';

jest.mock('../../../../../components/componentRegistry');
jest.useFakeTimers();

componentRegistry.registerMultiple(coreComponents);

describe('Overview component', () => {
  const baseProps = {
    store: {},
    mappingWizardVisible: false,
    planWizardVisible: false,
    isFetchingTransformationMappings: false,
    isRejectedTransformationMappings: false,
    transformationMappings: [],
    transformationPlans: [],
    clusters: [],
    fetchTransformationPlansUrl: ''
  };
  let showMappingWizardAction;
  let showPlanWizardAction;
  let fetchTransformationMappingsAction;
  let fetchTransformationPlansAction;
  let fetchClustersAction;
  beforeEach(() => {
    showMappingWizardAction = jest.fn();
    showPlanWizardAction = jest.fn();
    fetchTransformationMappingsAction = jest.fn();
    fetchTransformationPlansAction = jest.fn();
    fetchClustersAction = jest.fn();
    fetchTransformationPlansAction.mockReturnValue(Promise.resolve());
  });

  describe('overview sections', () => {
    test('does not render Migrations if there are no transformation mappings', () => {
      const wrapper = shallow(
        <Overview
          {...baseProps}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchClustersAction={fetchClustersAction}
        />
      );

      expect(wrapper.find('Migrations').exists()).toBe(false);
    });

    test('renders Migrations if there are transformation mappings', () => {
      const wrapper = shallow(
        <Overview
          {...baseProps}
          transformationMappings={transformationMappings}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchClustersAction={fetchClustersAction}
        />
      );

      expect(wrapper.find('Migrations').exists()).toBe(true);
    });
  });

  describe('polling', () => {
    let wrapper; // eslint-disable-line no-unused-vars
    beforeEach(() => {
      wrapper = shallow(
        <Overview
          {...baseProps}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchClustersAction={fetchClustersAction}
        />
      );
    });
    test('starts when the component is mounted', () => {
      expect(fetchTransformationPlansAction).toHaveBeenCalledTimes(1);
    });

    test('fetches transformation plan requests every 15 seconds', () => {
      jest.advanceTimersByTime(15000);
      expect(fetchTransformationPlansAction).toHaveBeenCalledTimes(2);
    });

    // TODO: Come back to these once the UI is closer to final form
    test.skip('stops if the mapping wizard is visible', () => {});

    test.skip('stops if the plan wizard is visible', () => {});
  });
});
