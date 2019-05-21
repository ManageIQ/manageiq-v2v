import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardAuthenticationStep from '../ConversionHostWizardAuthenticationStep';
import ConversionHostWizardAuthenticationStepContainer from '../index';
import { RHV } from '../../../../../../../../../../common/constants';

describe('ConversionHostWizardAuthenticationStep integration test', () => {
  const store = generateStore(
    { form: formReducer },
    { form: { conversionHostWizardLocationStep: { values: { providerType: RHV } } } }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostWizardAuthenticationStepContainer />
      </Provider>
    );

  it('should mount ConversionHostWizardAuthenticationStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizardAuthenticationStep);
    expect(component.props()).toMatchSnapshot();
  });
});
