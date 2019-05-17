import React from 'react';
import { shallow } from 'enzyme';
import ConversionHostWizardBody from '../ConversionHostWizardBody';

describe('conversion host wizard body', () => {
  const getBaseProps = () => ({
    wizardSteps: [{ mock: 'step' }, { mock: 'step' }],
    loaded: true,
    activeStepIndex: 0,
    activeStep: '1',
    goToStep: jest.fn(),
    disableNextStep: false,
    plansBody: {}
  });

  it('renders correctly', () => {
    const component = shallow(<ConversionHostWizardBody {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('performs deep props comparison on shouldComponentUpdate', () => {
    const referencedObject = { someProperty: 'initialValue' };
    const copyObject = { someProperty: 'initialValue' };
    const changedObject = { someProperty: 'differentValue' };
    const baseProps = {
      ...getBaseProps(),
      plansBody: referencedObject
    };
    const component = shallow(<ConversionHostWizardBody {...baseProps} />);
    expect(
      component.instance().shouldComponentUpdate({
        ...baseProps,
        plansBody: copyObject
      })
    ).toBeFalsy();
    expect(
      component.instance().shouldComponentUpdate({
        ...baseProps,
        plansBody: changedObject
      })
    ).toBeTruthy();
  });
});
