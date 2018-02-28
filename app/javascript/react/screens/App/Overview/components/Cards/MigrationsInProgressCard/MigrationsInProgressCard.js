import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, Spinner } from 'patternfly-react';
import MigrationInProgressCard from './MigrationInProgressCard';

class MigrationsInProgressCard extends React.Component {
  componentDidMount() {
    const { fetchMigrationsInProgressAction } = this.props;
    fetchMigrationsInProgressAction();
  }

  renderActiveMigrations() {
    const { migrationsInProgress } = this.props;

    return (
      <Grid fluid>
        <Grid.Row>
          {migrationsInProgress.map(migration => (
            <MigrationInProgressCard migration={migration} key={migration.id} />
          ))}
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    const {
      isRejectedMigrationsInProgress,
      isFetchingMigrationsInProgress,
      errorMigrationsInProgress,
      migrationsInProgress
    } = this.props;

    return (
      <div className="card-pf card-pf-multi-card-container">
        <div className="card-pf-heading">
          <h2>
            {sprintf(
              __('%s Migrations in Progress'),
              migrationsInProgress.length
            )}
          </h2>
        </div>
        <div className="card-pf-body">
          {isFetchingMigrationsInProgress && (
            <React.Fragment>
              <Spinner size="xs" inline loading />
              <span className="message-text">
                {__('Loading migrations in progress')}
              </span>
            </React.Fragment>
          )}
          {isRejectedMigrationsInProgress && (
            <React.Fragment>
              <Icon type="pf" name="error-circle-o" />
              <span className="message-text">
                {errorMigrationsInProgress
                  ? errorMigrationsInProgress.message
                  : __('Error retrieving active migrations')}
              </span>
            </React.Fragment>
          )}
          {migrationsInProgress.length > 0 && this.renderActiveMigrations()}
        </div>
      </div>
    );
  }
}

MigrationsInProgressCard.propTypes = {
  fetchMigrationsInProgressAction: PropTypes.func,
  isFetchingMigrationsInProgress: PropTypes.bool,
  migrationsInProgress: PropTypes.arrayOf(PropTypes.object),
  isRejectedMigrationsInProgress: PropTypes.bool,
  errorMigrationsInProgress: PropTypes.object
};
MigrationsInProgressCard.defaultProps = {
  migrationsInProgress: [],
  isFetchingMigrationsInProgress: false,
  isRejectedMigrationsInProgress: false,
  errorMigrationsInProgress: null
};

export default MigrationsInProgressCard;
