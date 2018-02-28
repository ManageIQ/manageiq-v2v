import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../activeMigrations.fixtures';
import ActiveMigrations from '../index';
import reducer from '../ActiveMigrationsReducer';

const reducers = { activeMigrations: reducer };

describe('Active ActiveMigrations integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers }),
      {
        activeMigrations: initialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <ActiveMigrations />
      </Provider>
    );

  it('should mount the ActiveMigrations with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // query the unconnected component to assert reduced props
    const component = wrapper.find(ActiveMigrations);
    expect(component.props()).toMatchSnapshot();
  });
});
