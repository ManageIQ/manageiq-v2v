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
    isFetchingTransformationPlanRequests: false,
    isRejectedTransformationPlanRequests: false,
    errorTransformationPlanRequests: null,
    transformationMappings: []
  };
  let showMappingWizardAction;
  let showPlanWizardAction;
  let fetchTransformationMappingsAction;
  let fetchTransformationPlanRequestsAction;
  let fetchTransformationPlansAction;
  beforeEach(() => {
    showMappingWizardAction = jest.fn();
    showPlanWizardAction = jest.fn();
    fetchTransformationMappingsAction = jest.fn();
    fetchTransformationPlanRequestsAction = jest.fn();
    fetchTransformationPlansAction = jest.fn();
  });

  describe('overview sections', () => {
    test('does not render Migrations if there are no transformation mappings', () => {
      const wrapper = shallow(
        <Overview
          {...baseProps}
          showMappingWizardAction={showMappingWizardAction}
          showPlanWizardAction={showPlanWizardAction}
          fetchTransformationMappingsAction={fetchTransformationMappingsAction}
          fetchTransformationPlanRequestsAction={
            fetchTransformationPlanRequestsAction
          }
          fetchTransformationPlansAction={fetchTransformationPlansAction}
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
          fetchTransformationPlanRequestsAction={
            fetchTransformationPlanRequestsAction
          }
          fetchTransformationPlansAction={fetchTransformationPlansAction}
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
          fetchTransformationPlanRequestsAction={
            fetchTransformationPlanRequestsAction
          }
          fetchTransformationPlansAction={fetchTransformationPlansAction}
        />
      );
    });
    test('starts when the component is mounted', () => {
      expect(fetchTransformationPlanRequestsAction).toHaveBeenCalledTimes(1);
    });

    test('fetches transformation plan requests every 15 seconds', () => {
      jest.advanceTimersByTime(15000);
      expect(fetchTransformationPlanRequestsAction).toHaveBeenCalledTimes(2);
    });

    // TODO: Come back to these once the UI is closer to final form
    test.skip('stops if the mapping wizard is visible', () => {});

    test.skip('stops if the plan wizard is visible', () => {});
  });
});
