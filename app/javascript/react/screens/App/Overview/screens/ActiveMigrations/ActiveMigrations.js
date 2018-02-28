import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Spinner } from 'patternfly-react';
import ActiveMigrationCard from './ActiveMigrationCard';

class ActiveMigrations extends React.Component {
  componentDidMount() {
    const { fetchActiveMigrationsAction } = this.props;
    fetchActiveMigrationsAction();
  }

  renderActiveMigrations() {
    const { activeMigrations } = this.props;

    return (
      <Grid fluid>
        <Grid.Row>
          {activeMigrations.map(migration => (
            <ActiveMigrationCard migration={migration} key={migration.id} />
          ))}
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    const {
      isRejectedActiveMigrations,
      isFetchingActiveMigrations,
      errorActiveMigrations,
      activeMigrations
    } = this.props;

    return (
      <div className="card-pf card-pf-multi-card-container">
        <div className="card-pf-heading">
          <h2>
            {sprintf(__('%s Migrations in Progress'), activeMigrations.length)}
          </h2>
        </div>
        <div className="card-pf-body">
          {isFetchingActiveMigrations && (
            <React.Fragment>
              <Spinner size="xs" inline loading />
              <span className="message-text">
                {__('Loading migrations in progress')}
              </span>
            </React.Fragment>
          )}
          {isRejectedActiveMigrations && (
            <React.Fragment>
              <Icon type="pf" name="error-circle-o" />
              <span className="message-text">
                {errorActiveMigrations ||
                  __('Error retrieving active migrations')}
              </span>
            </React.Fragment>
          )}
          {activeMigrations.length > 0 && this.renderActiveMigrations()}
        </div>
      </div>
    );
  }
}

ActiveMigrations.propTypes = {
  fetchActiveMigrationsAction: PropTypes.func,
  isFetchingActiveMigrations: PropTypes.bool,
  activeMigrations: PropTypes.arrayOf(PropTypes.object),
  isRejectedActiveMigrations: PropTypes.bool,
  errorActiveMigrations: PropTypes.string
};
ActiveMigrations.defaultProps = {
  activeMigrations: [],
  isFetchingActiveMigrations: false,
  isRejectedActiveMigrations: false,
  errorActiveMigrations: ''
};

export default ActiveMigrations;
