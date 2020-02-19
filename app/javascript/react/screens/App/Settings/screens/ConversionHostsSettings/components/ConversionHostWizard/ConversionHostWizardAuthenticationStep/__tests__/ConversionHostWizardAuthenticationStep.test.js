import React from 'react';
import { shallow, mount } from 'enzyme';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardAuthenticationStep from '../ConversionHostWizardAuthenticationStep';
import { RHV, OPENSTACK } from '../../../../../../../../../../common/constants';
import { SSH, VDDK } from '../../ConversionHostWizardConstants';

describe('conversion host wizard authentication step', () => {
  const store = generateStore({ form: formReducer }, {});

  const baseProps = {
    selectedProviderType: RHV,
    selectedTransformationMethod: null,
    verifyCaCerts: null,
    store
  };

  const shallowDive = jsx => {
    const connectWrapper = shallow(jsx); // <Connect(Form(ConversionHostWizardAuthenticationStep))>
    const formWrapper = connectWrapper.dive(); // <Form(ConversionHostWizardAuthenticationStep)>
    const componentWrapper = formWrapper.dive(); // <ConversionHostWizardAuthenticationStep>
    return componentWrapper.dive(); // shallow-rendered ConversionHostWizardAuthenticationStep
  };

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<ConversionHostWizardAuthenticationStep {...baseProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for RHV', () => {
    const component = shallowDive(<ConversionHostWizardAuthenticationStep {...baseProps} />);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-ca-certs"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for OSP', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-ca-certs"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders the verify TLS certs switch correctly', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} />
    );
    const onSwitchChange = jest.fn();
    const switchRenderProp = component.find('Field[controlId="verify-ca-certs"]').props().children;
    const renderedSwitch = switchRenderProp({ input: { value: false, onChange: onSwitchChange } });
    expect(renderedSwitch).toMatchSnapshot();
    mount(renderedSwitch)
      .props()
      .onChange(null, true);
    expect(onSwitchChange).toHaveBeenCalledWith(true);
  });

  it('renders correctly with verify TLS certs turned on', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} verifyCaCerts />
    );
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with SSH transformation method selected', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={SSH} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(1);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with VDDK transformation method selected', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={VDDK} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
