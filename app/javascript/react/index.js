import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './config/Routes';
import store from '../redux';
import NotificationList from './screens/App/common/NotificationList';

import { globalLocalStorageMode } from '../common/API';
import migrationEmulator from './migrationEmulator';

if (globalLocalStorageMode) {
  migrationEmulator.run();
}

// todo: convert this to use ManageIQ.redux.addReducer, ManageIQ.redux.store
// <Provider store={store}>{componentRegistry.markup(component, data, store)}</Provider>,
export default () => (
  <Provider store={store}>
    <Router>
      <React.Fragment>
        <NotificationList />
        <Routes store={store} />
      </React.Fragment>
    </Router>
  </Provider>
);
