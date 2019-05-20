import React from 'react';
import { shallow, mount } from 'enzyme';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardAuthenticationStep from '../ConversionHostWizardAuthenticationStep';
import { RHV, OPENSTACK } from '../../../../../../../../../../common/constants';
import { SSH, VDDK } from '../../ConversionHostWizardConstants';

describe('conversion host wizard authentication step', () => {
  const store = generateStore({ form: formReducer }, {});

  const getBaseProps = () => ({
    selectedProviderType: RHV,
    selectedTransformationMethod: null,
    verifyOpenstackCerts: null,
    store
  });

  const shallowDive = jsx => {
    const connectWrapper = shallow(jsx); // <Connect(Form(ConversionHostWizardAuthenticationStep))>
    const formWrapper = connectWrapper.dive(); // <Form(ConversionHostWizardAuthenticationStep)>
    const componentWrapper = formWrapper.dive(); // <ConversionHostWizardAuthenticationStep>
    return componentWrapper.dive(); // shallow-rendered ConversionHostWizardAuthenticationStep
  };

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<ConversionHostWizardAuthenticationStep {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for RHV', () => {
    const component = shallowDive(<ConversionHostWizardAuthenticationStep {...getBaseProps()} />);
    expect(component.find('Field[controlId="openstack-user-input"]')).toHaveLength(0);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-openstack-certs"]')).toHaveLength(0);
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for OSP', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...getBaseProps()} selectedProviderType={OPENSTACK} />
    );
    expect(component.find('Field[controlId="openstack-user-input"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-openstack-certs"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders the verify TLS certs switch correctly', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...getBaseProps()} selectedProviderType={OPENSTACK} />
    );
    const onSwitchChange = jest.fn();
    const switchRenderProp = component.find('Field[controlId="verify-openstack-certs"]').props().children;
    const renderedSwitch = switchRenderProp({ input: { value: false, onChange: onSwitchChange } });
    expect(renderedSwitch).toMatchSnapshot();
    mount(renderedSwitch)
      .props()
      .onChange(null, true);
    expect(onSwitchChange).toHaveBeenCalledWith(true);
  });

  it('renders correctly with verify OSP TLS certs turned on', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep
        {...getBaseProps()}
        selectedProviderType={OPENSTACK}
        verifyOpenstackCerts
      />
    );
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with SSH transformation method selected', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...getBaseProps()} selectedTransformationMethod={SSH} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(1);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with VDDK transformation method selected', () => {
    const component = shallowDive(
      <ConversionHostWizardAuthenticationStep {...getBaseProps()} selectedTransformationMethod={VDDK} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
