import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import settingsReducer, { initialState as settingsInitialState } from '../../../../../../SettingsReducer';
import ConversionHostWizardResultsStep from '../ConversionHostWizardResultsStep';
import ConversionHostWizardResultsStepContainer from '../index';
import { RHV } from '../../../../../../../../../../common/constants';
import { VDDK } from '../../ConversionHostWizardConstants';

describe('ConversionHostWizardLocationStep integration test', () => {
  const store = generateStore(
    { form: formReducer, settings: settingsReducer },
    {
      form: {
        conversionHostWizardLocationStep: { values: { providerType: RHV } },
        conversionHostWizardHostsStep: { values: { hosts: [{ id: '1', type: 'mock host type', name: 'Mock Host' }] } },
        conversionHostWizardAuthenticationStep: {
          values: {
            conversionHostSshKey: { body: 'mock conversion host SSH key body' },
            caCerts: { body: '' },
            transformationMethod: VDDK,
            vddkLibraryPath: 'mock VDDK path'
          }
        }
      },
      settings: settingsInitialState
    }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostWizardResultsStepContainer />
      </Provider>
    );

  it('should mount ConversionHostWizardLocationStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizardResultsStep);
    expect(component.props()).toMatchSnapshot();
  });
});
