import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import settingsReducer, { initialState as settingsInitialState } from '../../../../../SettingsReducer';
import ConversionHostWizard from '../ConversionHostWizard';
import ConversionHostWizardContainer from '../index';

describe('ConversionHostWizard integration test', () => {
  const store = generateStore({ settings: settingsReducer, form: formReducer }, { settings: settingsInitialState });

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostWizardContainer />
      </Provider>
    );

  it('should mount ConversionHostWizard with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizard);
    expect(component.props()).toMatchSnapshot();
  });
});
