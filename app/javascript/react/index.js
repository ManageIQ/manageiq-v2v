import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import Routes from './config/Routes';
import NotificationList from './screens/App/common/NotificationList';
import createReducers from '../redux/reducers';

class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
  }

  render() {
    if (!this.props.isLoaded)
      return (
        <div className="row cards-pf">
          <Spinner loading />
        </div>
      );
    return (
      <BrowserRouter>
        <React.Fragment>
          <NotificationList />
          <Routes store={ManageIQ.redux.store} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  isLoaded: PropTypes.bool.isRequired
};

const mapStateToProps = ({ overview }) => ({ isLoaded: !!overview });

export default connect(mapStateToProps)(App);
