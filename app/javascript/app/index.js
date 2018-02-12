import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './config/Routes';
import store from '../redux';

// todo: convert this to use ManageIQ.redux.addReducer, ManageIQ.redux.store
// <Provider store={store}>{componentRegistry.markup(component, data, store)}</Provider>,
export default () => (
  <Provider store={store}>
    <Router>
      <Routes store={store} />
    </Router>
  </Provider>
);
