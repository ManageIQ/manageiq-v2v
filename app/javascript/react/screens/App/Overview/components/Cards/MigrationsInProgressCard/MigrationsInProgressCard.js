import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon, bindMethods } from 'patternfly-react';
import MigrationInProgressCard from './MigrationInProgressCard';

class MigrationsInProgressCard extends React.Component {
  constructor(props) {
    super(props);
    bindMethods(this, ['stopPolling', 'startPolling']);
  }
  componentDidMount() {
    const { fetchMigrationsInProgressAction } = this.props;
    // fetch migrations in progress initially, then poll them
    fetchMigrationsInProgressAction();
    this.startPolling();
  }

  componentWillReceiveProps(nextProps) {
    // kill interval if a wizard becomes visble
    if (nextProps.mappingWizardVisible || nextProps.planWizardVisible) {
      this.stopPolling();
    } else if (
      !nextProps.mappingWizardVisible &&
      !nextProps.planWizardVisible &&
      !this.pollingInterval
    ) {
      this.startPolling();
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    const { fetchMigrationsInProgressAction } = this.props;
    this.pollingInterval = setInterval(fetchMigrationsInProgressAction, 3000);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
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
      errorMigrationsInProgress,
      migrationsInProgress
    } = this.props;

    return (
      <div className="card-pf card-pf-multi-card-container">
        <div className="card-pf-heading">
          <h2 className="card-pf-title">
            {sprintf(
              __('%s Migrations in Progress'),
              migrationsInProgress.length
            )}
          </h2>
        </div>
        <div className="card-pf-body">
          {/** isFetchingMigrationsInProgress && (
            <React.Fragment>
              <Spinner size="xs" inline loading />
              <span className="message-text">
                {__('Loading migrations in progress')}
              </span>
            </React.Fragment>
          )* */}
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
  /** isFetchingMigrationsInProgress: PropTypes.bool, */
  migrationsInProgress: PropTypes.arrayOf(PropTypes.object),
  isRejectedMigrationsInProgress: PropTypes.bool,
  errorMigrationsInProgress: PropTypes.object,
  mappingWizardVisible: PropTypes.bool,
  planWizardVisible: PropTypes.bool
};
MigrationsInProgressCard.defaultProps = {
  migrationsInProgress: [],
  /** isFetchingMigrationsInProgress: false, */
  isRejectedMigrationsInProgress: false,
  errorMigrationsInProgress: null,
  mappingWizardVisible: false,
  planWizardVisible: false
};

export default MigrationsInProgressCard;
