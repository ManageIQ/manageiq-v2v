import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../migrationsCompleted.fixtures';
import { initialState as overviewInitialState } from '../../../../overview.fixtures';
import { reducers as overviewReducer } from '../../../../index';
import MigrationsCompletedCard from '../index';
import reducer from '../MigrationsCompletedReducer';

import { coreComponents } from '../../../../../../../../components';
import componentRegistry from '../../../../../../../../components/componentRegistry';

jest.mock('../../../../../../../../components/componentRegistry.js');
componentRegistry.registerMultiple(coreComponents);

const reducers = { migrationsCompleted: reducer };

describe('MigrationsCompletedCard integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers, overview: overviewReducer.overview }),
      {
        migrationsCompleted: initialState,
        overview: overviewInitialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <MigrationsCompletedCard />
      </Provider>
    );

  it('should mount the MigrationsCompletedCard with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(MigrationsCompletedCard);
    expect(component.props()).toMatchSnapshot();
  });
});
