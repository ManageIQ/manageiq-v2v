import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import Settings from '../Settings';
import SettingsContainer, { reducers } from '../index';
import { initialState } from '../SettingsReducer';
import { servers, settings } from '../settings.fixures';

import { mockRequest } from '../../../../../common/mockRequests';

describe('Settings integration test', () => {
  global.$ = jest.fn(() => ({
    TouchSpin: jest.fn(),
    on: jest.fn(),
    off: jest.fn()
  }));
  mockRequest({
    url: '/api/servers',
    response: { data: servers }
  });
  mockRequest({
    url: '/api/settings',
    response: { data: settings }
  });

  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({
        ...reducers,
        form: formReducer
      }),
      {
        settings: initialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <SettingsContainer />
      </Provider>
    );

  it('should mount the Settings page with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);
    const component = wrapper.find(Settings);
    expect(component.props()).toMatchSnapshot();
  });
});
