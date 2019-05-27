import React from 'react';
import { shallow } from 'enzyme';
import ConversionHostWizard from '../ConversionHostWizard';
import ConversionHostWizardBody from '../ConversionHostWizardBody';
import ConversionHostWizardLocationStep from '../ConversionHostWizardLocationStep';
import ConversionHostWizardHostsStep from '../ConversionHostWizardHostsStep';
import ConversionHostWizardAuthenticationStep from '../ConversionHostWizardAuthenticationStep';
import ConversionHostWizardResultsStep from '../ConversionHostWizardResultsStep';
import { stepIDs } from '../ConversionHostWizardConstants';

describe('conversion host wizard', () => {
  const getBaseProps = () => ({
    hideConversionHostWizardAction: jest.fn(),
    conversionHostWizardExitedAction: jest.fn(),
    conversionHostWizardVisible: true,
    isPostingConversionHosts: false,
    forms: {
      conversionHostWizardLocationStep: {},
      conversionHostWizardHostsStep: {},
      conversionHostWizardAuthenticationStep: {},
      conversionHostWizardResultsStep: {}
    }
  });

  it('renders correctly', () => {
    const component = shallow(<ConversionHostWizard {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders the correct component in each step', () => {
    const component = shallow(<ConversionHostWizard {...getBaseProps()} />);
    const steps = component.find(ConversionHostWizardBody).props().wizardSteps;
    expect(steps[0].render().type.displayName).toBe(ConversionHostWizardLocationStep.displayName);
    expect(steps[1].render().type.displayName).toBe(ConversionHostWizardHostsStep.displayName);
    expect(steps[2].render().type.displayName).toBe(ConversionHostWizardAuthenticationStep.displayName);
    expect(steps[3].render().type.displayName).toBe(ConversionHostWizardResultsStep.displayName);
  });

  it('navigates between steps correctly', () => {
    const props = getBaseProps();
    const component = shallow(<ConversionHostWizard {...props} />);
    const findBackButton = () => component.find('Icon[name="angle-left"]').parent();
    const findNextButton = () => component.find('Button[bsStyle="primary"]');
    expect(component.state().activeStepIndex).toBe(0);

    findBackButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(0); // Can't go below 0

    findNextButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(1);

    findNextButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(2);

    findBackButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(1);

    findNextButton().simulate('click');
    findNextButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(3);

    expect(props.hideConversionHostWizardAction).toHaveBeenCalledTimes(0);
    findNextButton().simulate('click');
    expect(component.state().activeStepIndex).toBe(3); // Can't go above steps.length
    expect(props.hideConversionHostWizardAction).toHaveBeenCalledTimes(1);

    component.instance().goToStepId(stepIDs.hostsStep);
    expect(component.state().activeStepIndex).toBe(1);
  });
});
