import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { reducer as formReducer } from 'redux-form';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../mappingWizardClustersStep.fixtures';
import MappingWizardClustersStep from '../MappingWizardClustersStep';
import MappingWizardClustersStepContainer, { reducers } from '../index';

describe('Mapping Wizard integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers, form: formReducer }),
      {
        mappingWizardClustersStep: initialState,
        form: { mappingWizardGeneralStep: { values: { targetProvider: 'rhevm' } } }
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <MappingWizardClustersStepContainer />
      </Provider>
    );

  it('should mount the MappingWizardClusterStep with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(MappingWizardClustersStep);
    expect(component.props()).toMatchSnapshot();

    // isFetching set true after fetch called in `componentDidMount`
    expect(component.props().isFetchingSourceClusters).toBeTruthy();
    expect(component.props().isFetchingTargetClusters).toBeTruthy();
  });
});
