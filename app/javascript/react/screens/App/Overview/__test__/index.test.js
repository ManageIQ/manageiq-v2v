import React from 'react';
import thunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { initialState } from '../overview.fixtures';
import { initialState as providersInitialState } from '../../../../../redux/common/providers/providersReducer';
import Overview from '../Overview';
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
        overview: initialState,
        providers: providersInitialState
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

    // query the unconnected component to assert reduced props
    const component = wrapper.find(Overview);

    expect(component.props()).toMatchSnapshot();
  });
});
