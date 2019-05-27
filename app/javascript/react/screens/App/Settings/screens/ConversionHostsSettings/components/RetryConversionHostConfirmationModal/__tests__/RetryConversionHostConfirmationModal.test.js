import React from 'react';
import { shallow } from 'enzyme';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import RetryConversionHostConfirmationModal from '../RetryConversionHostConfirmationModal';

const flushPromises = () => new Promise(setImmediate); // https://stackoverflow.com/a/51045733

const mockVddkTask = {
  name: 'Mock Host',
  context_data: { request_params: { mock: 'params', vmware_vddk_package_url: 'mock vddk path' } }
};
const mockSshTask = { name: 'Mock Host', context_data: { request_params: { mock: 'params' } } };

const mockVddkForm = {
  values: { conversionHostSshKey: { body: 'mock conversion host key' } }
};
const mockSshForm = {
  values: {
    conversionHostSshKey: { body: 'mock conversion host key' },
    vmwareSshKey: { body: 'mock vmware key' }
  }
};

describe('retry conversion host confirmation modal', () => {
  const store = generateStore({ form: formReducer }, {});

  const getBaseProps = () => ({
    show: true,
    conversionHostTaskToRetry: mockVddkTask,
    isPostingConversionHosts: false,
    hideConversionHostRetryModalAction: jest.fn(),
    conversionHostRetryModalExitedAction: jest.fn(),
    postConversionHostsAction: jest.fn(() => Promise.resolve()),
    postConversionHostsUrl: '/api/mock/conversion_hosts',
    retryForm: mockVddkForm,
    store
  });

  const shallowDive = jsx => {
    const connectWrapper = shallow(jsx); // <Connect(Form(RetryConversionHostConfirmationModal))>
    const formWrapper = connectWrapper.dive(); // <Form(RetryConversionHostConfirmationModal)>
    const componentWrapper = formWrapper.dive(); // <RetryConversionHostConfirmationModal>
    return componentWrapper.dive(); // shallow-rendered RetryConversionHostConfirmationModal
  };

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<RetryConversionHostConfirmationModal {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for a VDDK task', () => {
    const component = shallowDive(<RetryConversionHostConfirmationModal {...getBaseProps()} />);
    expect(component.find('TextFileField')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for an SSH task', () => {
    const component = shallowDive(
      <RetryConversionHostConfirmationModal
        {...getBaseProps()}
        conversionHostTaskToRetry={mockSshTask}
        retryForm={mockSshForm}
      />
    );
    expect(component.find('TextFileField')).toHaveLength(2);
    expect(component).toMatchSnapshot();
  });

  it('disables the retry button when there are validation errors', () => {
    const component = shallowDive(
      <RetryConversionHostConfirmationModal {...getBaseProps()} retryForm={{ syncErrors: { mock: 'errors' } }} />
    );
    expect(component.find('Button[bsStyle="primary"]').props().disabled).toBeTruthy();
  });

  it('disables the retry button when already retrying', () => {
    const component = shallowDive(
      <RetryConversionHostConfirmationModal {...getBaseProps()} isPostingConversionHosts />
    );
    expect(component.find('Button[bsStyle="primary"]').props().disabled).toBeTruthy();
  });

  it('constructs the postBody correctly and calls postConversionHostsAction for a VDDK task', async () => {
    const props = getBaseProps();
    const component = shallowDive(<RetryConversionHostConfirmationModal {...props} />);
    component.find('Button[bsStyle="primary"]').simulate('click');
    expect(props.postConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(props.postConversionHostsAction).toHaveBeenCalledWith(props.postConversionHostsUrl, [
      {
        mock: 'params',
        vmware_vddk_package_url: 'mock vddk path',
        conversion_host_ssh_private_key: 'mock conversion host key'
      }
    ]);
    expect(props.hideConversionHostRetryModalAction).toHaveBeenCalledTimes(0);
    await flushPromises();
    expect(props.hideConversionHostRetryModalAction).toHaveBeenCalledTimes(1);
  });

  it('constructs the postBody correctly and calls postConversionHostsAction for an SSH task', async () => {
    const props = getBaseProps();
    const component = shallowDive(
      <RetryConversionHostConfirmationModal
        {...props}
        conversionHostTaskToRetry={mockSshTask}
        retryForm={mockSshForm}
      />
    );
    component.find('Button[bsStyle="primary"]').simulate('click');
    expect(props.postConversionHostsAction).toHaveBeenCalledTimes(1);
    expect(props.postConversionHostsAction).toHaveBeenCalledWith(props.postConversionHostsUrl, [
      {
        mock: 'params',
        conversion_host_ssh_private_key: 'mock conversion host key',
        vmware_ssh_private_key: 'mock vmware key'
      }
    ]);
    expect(props.hideConversionHostRetryModalAction).toHaveBeenCalledTimes(0);
    await flushPromises();
    expect(props.hideConversionHostRetryModalAction).toHaveBeenCalledTimes(1);
  });
});
