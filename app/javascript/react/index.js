import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import Routes from './config/Routes';
import NotificationList from './screens/App/common/NotificationList';
import createReducers from '../redux/reducers';

// todo: convert this to use ManageIQ.redux.addReducer, ManageIQ.redux.store
// <Provider store={store}>{componentRegistry.markup(component, data, store)}</Provider>,
class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
    ManageIQ.redux.store.dispatch({ type: 'init' });
  }

  render() {
    if (!this.props.isLoaded)
      return (
        <div className="row cards-pf">
          <Spinner loading />
        </div>
      );
    return (
      <ConnectedRouter history={ManageIQ.redux.history}>
        <React.Fragment>
          <NotificationList />
          <Routes store={ManageIQ.redux.store} />
        </React.Fragment>
      </ConnectedRouter>
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = ({ overview }) => ({ isLoaded: !!overview });

export default connect(mapStateToProps)(App);
