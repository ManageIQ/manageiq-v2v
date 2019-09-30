import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import RetryConversionHostConfirmationModalConnected, {
  RetryConversionHostConfirmationModal
} from '../RetryConversionHostConfirmationModal';

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

  const ProviderWrapper = ({ children }) => <Provider store={store}>{children}</Provider>; // eslint-disable-line react/prop-types

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

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<RetryConversionHostConfirmationModalConnected {...getBaseProps()} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for a VDDK task', () => {
    const component = shallow(<RetryConversionHostConfirmationModal {...getBaseProps()} />);
    expect(component.find('TextFileField')).toHaveLength(1);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly for an SSH task', () => {
    const component = shallow(
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
    const component = mount(
      <ProviderWrapper>
        <RetryConversionHostConfirmationModalConnected
          {...getBaseProps()}
          retryForm={{ syncErrors: { mock: 'errors' } }}
        />
      </ProviderWrapper>
    );
    expect(component.find('Button[bsStyle="primary"]').props().disabled).toBeTruthy();
  });

  it('disables the retry button when already retrying', () => {
    const component = mount(
      <ProviderWrapper>
        <RetryConversionHostConfirmationModalConnected {...getBaseProps()} isPostingConversionHosts />
      </ProviderWrapper>
    );
    expect(component.find('Button[bsStyle="primary"]').props().disabled).toBeTruthy();
  });

  it('constructs the postBody correctly and calls postConversionHostsAction for a VDDK task', async () => {
    const props = getBaseProps();
    const component = mount(
      <ProviderWrapper>
        <RetryConversionHostConfirmationModalConnected {...props} />
      </ProviderWrapper>
    );
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
    const component = mount(
      <ProviderWrapper>
        <RetryConversionHostConfirmationModalConnected
          {...props}
          conversionHostTaskToRetry={mockSshTask}
          retryForm={mockSshForm}
        />
      </ProviderWrapper>
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
