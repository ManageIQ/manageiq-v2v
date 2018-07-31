import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { initialState } from '../../../overview.fixtures';
import MappingWizard from '../MappingWizard';
import MappingWizardContainer from '../index';
import { reducers } from '../../../index';

import { coreComponents } from '../../../../../../../components/';
import componentRegistry from '../../../../../../../components/componentRegistry';

jest.mock('../../../../../../../components/componentRegistry');
componentRegistry.registerMultiple(coreComponents);

jest.mock('../components/MappingWizardGeneralStep/MappingWizardGeneralStep');

describe('Mapping Wizard integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers, form: formReducer }),
      {
        overview: initialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <MappingWizardContainer />
      </Provider>
    );

  it('should mount the MappingWizard with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(MappingWizard);

    expect(component.props()).toMatchSnapshot();
  });
});
