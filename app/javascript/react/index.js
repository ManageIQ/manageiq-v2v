import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { connect } from 'react-redux';
import { Spinner } from 'patternfly-react';
import PropTypes from 'prop-types';
import Routes from './config/Routes';
import NotificationList from './screens/App/common/NotificationList';
import createReducers from '../redux/reducers';

const onHashChange = event => {
  // Forces the jQuery-based nav to update its active item when the route changes
  const hash = event.newURL.split('#')[1];
  const href = hash !== '/' ? `/migration#${hash}` : '/migration';
  const navItem = $('.nav-pf-vertical')
    .find(`a[href="${href}"]`)
    .closest('.list-group-item');
  if (!navItem.hasClass('active')) {
    navItem.trigger('click');
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    ManageIQ.redux.addReducer(createReducers());
  }

  componentDidMount() {
    window.addEventListener('hashchange', onHashChange);
  }

  componentWillUnmount() {
    window.removeEventListener('hashchange', onHashChange);
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
