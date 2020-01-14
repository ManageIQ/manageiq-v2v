import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardHostsStep from '../ConversionHostWizardHostsStep';
import ConversionHostWizardHostsStepContainer from '../index';
import { RHV } from '../../../../../../../../../../common/constants';

describe('ConversionHostWizardHostsStep integration test', () => {
  const store = generateStore(
    { form: formReducer },
    {
      form: { conversionHostWizardLocationStep: { values: { providerType: RHV, cluster: '1' } } },
      targetResources: { targetClusters: [{ mock: 'cluster', id: '1', vms: [] }] },
      settings: {
        conversionHosts: [{ mock: 'conversionHost1' }, { mock: 'conversionHost2' }],
        conversionHostTasksByResource: { mock: 'tasksByResource' }
      }
    }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostWizardHostsStepContainer />
      </Provider>
    );

  it('should mount ConversionHostWizardHostsStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizardHostsStep);
    expect(component.props()).toMatchSnapshot();
  });
});
