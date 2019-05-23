import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import settingsReducer, { initialState as settingsInitialState } from '../../../../../SettingsReducer';
import RetryConversionHostConfirmationModal from '../RetryConversionHostConfirmationModal';
import RetryConversionHostConfirmationModalContainer from '../index';

describe('ConversionHostWizardLocationStep integration test', () => {
  const store = generateStore(
    { form: formReducer, settings: settingsReducer },
    {
      form: { retryConversionHost: {} },
      settings: {
        ...settingsInitialState,
        conversionHostTaskToRetry: {
          context_data: { request_params: { mock: 'params', vmware_vddk_package_url: 'mock vddk path' } }
        }
      }
    }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <RetryConversionHostConfirmationModalContainer />
      </Provider>
    );

  it('should mount ConversionHostWizardLocationStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(RetryConversionHostConfirmationModal);
    expect(component.props()).toMatchSnapshot();
  });
});
