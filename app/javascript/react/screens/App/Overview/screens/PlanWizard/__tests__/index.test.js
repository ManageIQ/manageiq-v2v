import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../../../overview.fixtures';
import PlanWizard from '../PlanWizard';
import PlanWizardContainer from '../index';
import { reducers } from '../../../index';

import { coreComponents } from '../../../../../../../components/';
import componentRegistry from '../../../../../../../components/componentRegistry';

jest.mock('../../../../../../../components/componentRegistry');
componentRegistry.registerMultiple(coreComponents);

describe('Plan Wizard integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers }),
      {
        overview: initialState,
        form: {
          planWizardGeneralStep: {},
          planWizardCSVStep: {}
        }
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <PlanWizardContainer />
      </Provider>
    );

  it('should mount the PlanWizard with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(PlanWizard);

    expect(component.props()).toMatchSnapshot();
  });
});
