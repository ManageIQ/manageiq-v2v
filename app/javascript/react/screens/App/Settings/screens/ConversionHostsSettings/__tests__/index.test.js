import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { generateStore } from '../../../../common/testReduxHelpers';
import settingsReducer, { initialState as settingsInitialState } from '../../../SettingsReducer';
import providersReducer, {
  initialState as providersInitialState
} from '../../../../../../../redux/common/providers/providersReducer';
import ConversionHostsSettings from '../ConversionHostsSettings';
import ConversionHostsSettingsContainer from '../index';

describe('ConversionHostsSettings integration test', () => {
  const store = generateStore(
    { settings: settingsReducer, providers: providersReducer },
    { settings: settingsInitialState, providers: providersInitialState }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostsSettingsContainer />
      </Provider>
    );

  it('should mount ConversionHostsSettings with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostsSettings);
    expect(component.props()).toMatchSnapshot();

    // isFetching set true after fetch called in `componentDidMount`
    expect(component.props().isFetchingProviders).toBeTruthy();
  });
});
