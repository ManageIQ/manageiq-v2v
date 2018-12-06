import React from 'react';
import { reducer as formReducer } from 'redux-form';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import { initialState } from '../mappingWizardClustersStep.fixtures';
import { initialState as generalStepInitialState } from '../../MappingWizardGeneralStep/MappingWizardGeneralStepReducer';
import { reducers as generalStepReducers } from '../../MappingWizardGeneralStep/index';
import MappingWizardClustersStep from '../MappingWizardClustersStep';
import MappingWizardClustersStepContainer, { reducers } from '../index';

describe('Mapping Wizard integration test', () => {
  const store = generateStore(
    { ...reducers, ...generalStepReducers, form: formReducer },
    {
      mappingWizardClustersStep: initialState,
      mappingWizardGeneralStep: generalStepInitialState,
      form: { mappingWizardGeneralStep: { values: { targetProvider: 'rhevm' } } }
    }
  );

  const mountComponent = () =>
    mount(
      <Provider store={store}>
        <MappingWizardClustersStepContainer />
      </Provider>
    );

  it('should mount the MappingWizardClusterStep with mapStateToProps reduced', () => {
    const wrapper = mountComponent();

    // query the unconnected component to assert reduced props
    const component = wrapper.find(MappingWizardClustersStep);
    expect(component.props()).toMatchSnapshot();

    // isFetching set true after fetch called in `componentDidMount`
    expect(component.props().isFetchingSourceClusters).toBeTruthy();
    expect(component.props().isFetchingTargetClusters).toBeTruthy();
  });
});
