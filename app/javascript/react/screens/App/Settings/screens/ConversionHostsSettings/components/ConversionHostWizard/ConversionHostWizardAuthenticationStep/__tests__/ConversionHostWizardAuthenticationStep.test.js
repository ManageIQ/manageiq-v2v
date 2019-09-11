import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
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
    verifyOpenstackCerts: null,
    store
  };

  const ProviderWrapper = ({ children }) => <Provider store={store}>{children}</Provider>; // eslint-disable-line react/prop-types

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
    expect(component.find('Field[controlId="openstack-user-input"]')).toHaveLength(0);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-openstack-certs"]')).toHaveLength(0);
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for OSP', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} />
      </ProviderWrapper>
    );
    expect(component.find('input[name="openstackUser"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('#verify-openstack-certs-switch')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(0);
  });

  it('renders the verify TLS certs switch correctly', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} />
      </ProviderWrapper>
    );
    const onSwitchChange = jest.fn();
    const switchRenderProp = component
      .find('Field[controlId="verify-openstack-certs"]')
      .first()
      .props().children;
    const renderedSwitch = switchRenderProp({ input: { value: false, onChange: onSwitchChange } });
    mount(renderedSwitch)
      .props()
      .onChange(null, true);
    expect(onSwitchChange).toHaveBeenCalledWith(true);
  });

  it('renders correctly with verify OSP TLS certs turned on', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} verifyOpenstackCerts />
      </ProviderWrapper>
    );
    expect(component.find('TextFileField[controlId="openstack-ca-certs-input"]')).toHaveLength(1);
  });

  it('renders correctly with SSH transformation method selected', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={SSH} />
      </ProviderWrapper>
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(1);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
  });

  it('renders correctly with VDDK transformation method selected', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={VDDK} />
      </ProviderWrapper>
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('input[name="vddkLibraryPath"]')).toHaveLength(1);
  });
});
