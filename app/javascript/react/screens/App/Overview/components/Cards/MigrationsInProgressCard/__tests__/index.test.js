import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../migrationsInProgress.fixtures';
import MigrationsInProgressCard from '../index';
import reducer from '../MigrationsInProgressReducer';

const reducers = { migrationsInProgress: reducer };

describe('Active ActiveMigrations integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers }),
      {
        migrationsInProgress: initialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <MigrationsInProgressCard />
      </Provider>
    );

  it('should mount the ActiveMigrations with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(MigrationsInProgressCard);
    expect(component.props()).toMatchSnapshot();
  });
});
