import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../overview.fixtures';
import OverviewContainer, { reducers } from '../index';

import { coreComponents } from '../../../../../components';
import componentRegistry from '../../../../../components/componentRegistry';

jest.mock('../../../../../components/componentRegistry');
componentRegistry.registerMultiple(coreComponents);

describe('Overview integration test', () => {
  const middlewares = [thunk, promiseMiddleware()];
  const generateStore = () =>
    createStore(
      combineReducers({ ...reducers }),
      {
        overview: initialState
      },
      applyMiddleware(...middlewares)
    );

  const mountComponent = store =>
    mount(
      <Provider store={store}>
        <OverviewContainer />
      </Provider>
    );

  it('should mount the Overview with mapStateToProps reduced', () => {
    const store = generateStore();
    const wrapper = mountComponent(store);

    // * query the unconnected component to assert reduced props
    // * because we are async loading Overview with react-loadable, we need to
    //   refer to it as 'LoadableComponent'
    const component = wrapper.find('LoadableComponent');

    expect(component.props()).toMatchSnapshot();
  });
});
