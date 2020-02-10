import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardAuthenticationStepConnected, {
  ConversionHostWizardAuthenticationStep
} from '../ConversionHostWizardAuthenticationStep';
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

  const ProviderWrapper = ({ children }) => <Provider store={store}>{children}</Provider>; // eslint-disable-line react/prop-types

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<ConversionHostWizardAuthenticationStep {...baseProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for RHV', () => {
    const component = shallow(<ConversionHostWizardAuthenticationStep {...baseProps} />);
    expect(component.find('Field[controlId="openstack-user-input"]')).toHaveLength(0);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-ca-certs"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the initial state for OSP', () => {
    const component = shallow(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} />
    );
    expect(component.find('Field[controlId="openstack-user-input"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component.find('Field[controlId="verify-ca-certs"]')).toHaveLength(1);
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders the verify TLS certs switch correctly', () => {
    const component = mount(
      <ProviderWrapper>
        <ConversionHostWizardAuthenticationStepConnected {...baseProps} selectedProviderType={OPENSTACK} />
      </ProviderWrapper>
    );
    const onSwitchChange = jest.fn();
    const switchRenderProp = component
      .find('Field[controlId="verify-ca-certs"]')
      .first()
      .props().children;
    const renderedSwitch = switchRenderProp({ input: { value: false, onChange: onSwitchChange } });
    mount(renderedSwitch)
      .props()
      .onChange(null, true);
    expect(onSwitchChange).toHaveBeenCalledWith(true);
  });

  it('renders correctly with verify TLS certs turned on', () => {
    const component = shallow(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedProviderType={OPENSTACK} verifyCaCerts />
    );
    expect(component.find('TextFileField[controlId="ca-certs-input"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with SSH transformation method selected', () => {
    const component = shallow(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={SSH} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(1);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(0);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with VDDK transformation method selected', () => {
    const component = shallow(
      <ConversionHostWizardAuthenticationStep {...baseProps} selectedTransformationMethod={VDDK} />
    );
    expect(component.find('TextFileField[controlId="vmware-ssh-key-input"]')).toHaveLength(0);
    expect(component.find('Field[controlId="vddk-library-path"]')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });
});
