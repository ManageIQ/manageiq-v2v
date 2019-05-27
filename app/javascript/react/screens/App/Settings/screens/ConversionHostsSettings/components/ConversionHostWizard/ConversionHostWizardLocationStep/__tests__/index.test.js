import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardLocationStep from '../ConversionHostWizardLocationStep';
import ConversionHostWizardLocationStepContainer from '../index';
import { RHV } from '../../../../../../../../../../common/constants';

describe('ConversionHostWizardLocationStep integration test', () => {
  const store = generateStore(
    { form: formReducer },
    {
      form: { conversionHostWizardLocationStep: { values: { providerType: RHV, provider: '1' } } },
      providers: { providers: [{ id: '1', name: 'Mock Provider', type: 'ManageIQ::Providers::Redhat::InfraManager' }] },
      targetResources: { targetClusters: [], isFetchingTargetClusters: false }
    }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <ConversionHostWizardLocationStepContainer />
      </Provider>
    );

  it('should mount ConversionHostWizardLocationStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ConversionHostWizardLocationStep);
    expect(component.props()).toMatchSnapshot();
  });
});
