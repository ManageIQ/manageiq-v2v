import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import Routes from './config/Routes';
import NotificationList from './screens/App/common/NotificationList';
import createReducers from '../redux/reducers';
import { updateVerticalMenu } from '../common/menu';

class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
    updateVerticalMenu(ManageIQ.redux.store.getState().router.location.pathname);
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

  componentDidMount() {
    this.unlisten = ManageIQ.redux.history.listen(location => {
      updateVerticalMenu(location.pathname);
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = ({ overview }) => ({ isLoaded: !!overview });

export default connect(mapStateToProps)(App);
