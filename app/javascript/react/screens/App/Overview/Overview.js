import React from 'react';
import PropTypes from 'prop-types';
import {
  bindMethods,
  Card,
  Breadcrumb,
  CardGrid,
  Spinner
} from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
import componentRegistry from '../../../../components/componentRegistry';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasMadeInitialPlansFetch: false
    };

    bindMethods(this, [
      'stopPolling',
      'startPolling',
      'createTransformationPlanRequest',
      'redirectTo'
    ]);

    this.mappingWizard = componentRegistry.markup(
      'MappingWizardContainer',
      props.store
    );
    this.planWizard = componentRegistry.markup(
      'PlanWizardContainer',
      props.store
    );
  }

  componentDidMount() {
    const {
      fetchClustersUrl,
      fetchClustersAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction
    } = this.props;

    fetchClustersAction(fetchClustersUrl);
    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchTransformationPlansAction(fetchTransformationPlansUrl).then(() => {
      this.setState(() => ({
        hasMadeInitialPlansFetch: true
      }));
      if (!this.pollingInterval) {
        this.startPolling();
      }
    });
  }
  componentWillReceiveProps(nextProps) {
    const {
      isContinuingToPlan,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction,
      planWizardId,
      continueToPlanAction,
      shouldReloadMappings
    } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (
      shouldReloadMappings !== nextProps.shouldReloadMappings &&
      nextProps.shouldReloadMappings
    ) {
      // refetech our mappings so that plan wizard has this newly created mapping
      fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    } else if (
      isContinuingToPlan !== nextProps.isContinuingToPlan &&
      !nextProps.isContinuingToPlan
    ) {
      continueToPlanAction(planWizardId);
    }

    // kill interval if a wizard becomes visble
    if (nextProps.mappingWizardVisible || nextProps.planWizardVisible) {
      this.stopPolling();
    } else if (
      !nextProps.mappingWizardVisible &&
      !nextProps.planWizardVisible &&
      hasMadeInitialPlansFetch &&
      !this.pollingInterval
    ) {
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
      this.startPolling();
    }
  }

  componentDidUpdate(prevProps) {
    const { finishedTransformationPlans, addNotificationAction } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (
      hasMadeInitialPlansFetch &&
      finishedTransformationPlans.length >
        prevProps.finishedTransformationPlans.length
    ) {
      const oldTransformationPlanIds = prevProps.finishedTransformationPlans.map(
        plan => plan.id
      );
      const freshTransformationPlans = finishedTransformationPlans.filter(
        plan => !oldTransformationPlanIds.includes(plan.id)
      );

      freshTransformationPlans.forEach(plan => {
        const [mostRecentRequest] = plan.miq_requests.slice(-1);
        const planStatus =
          mostRecentRequest.status.toLowerCase() === 'complete';
        const planStatusMessage = planStatus
          ? `${mostRecentRequest.status}.`
          : __('completed with errors.');

        addNotificationAction({
          message: `${plan.name} ${planStatusMessage}`,
          notificationType: planStatus ? 'success' : 'error',
          data: {
            id: plan.id
          },
          persistent: !planStatus,
          timerdelay: planStatus ? 8000 : null,
          actionEnabled: true
        });
      });
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling() {
    const {
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl
    } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
    }, 3000);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  createTransformationPlanRequest(url, planId) {
    const {
      createTransformationPlanRequestAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      setMigrationsFilterAction
    } = this.props;

    createTransformationPlanRequestAction(url, planId).then(() => {
      setMigrationsFilterAction('Migration Plans in Progress');
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
    });
  }

  redirectTo(path) {
    const { history } = this.props;
    history.push(path);
  }

  render() {
    const {
      showMappingWizardAction,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      transformationMappings,
      isFetchingTransformationMappings,
      isRejectedTransformationMappings, // eslint-disable-line no-unused-vars
      transformationPlans,
      isFetchingTransformationPlans,
      plansPreviouslyFetched,
      notStartedTransformationPlans,
      activeTransformationPlans,
      finishedTransformationPlans,
      isCreatingTransformationPlanRequest,
      clusters,
      migrationsFilter,
      setMigrationsFilterAction
    } = this.props;

    const aggregateDataCards = (
      <div className="row-cards-pf">
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.NotStartedTransformationPlans
              notStartedPlans={notStartedTransformationPlans}
              loading={isFetchingTransformationPlans && !plansPreviouslyFetched}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ActiveTransformationPlans
              activePlans={activeTransformationPlans}
              loading={isFetchingTransformationPlans && !plansPreviouslyFetched}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.FinishedTransformationPlans
              finishedPlans={finishedTransformationPlans}
              loading={isFetchingTransformationPlans && !plansPreviouslyFetched}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.InfrastructureMappings
              mappings={transformationMappings}
              loading={isFetchingTransformationMappings}
            />
          </CardGrid.Col>
        </Card.HeightMatching>
      </div>
    );

    const overviewContent = (
      <div
        className="row cards-pf"
        style={{ overflow: 'auto', paddingBottom: 1, height: '100%' }}
      >
        {aggregateDataCards}
        <Spinner
          loading={
            isFetchingTransformationMappings ||
            (isFetchingTransformationPlans && !plansPreviouslyFetched)
          }
          style={{ marginTop: 200 }}
        >
          {transformationMappings.length > 0 && (
            <Migrations
              activeFilter={migrationsFilter}
              setActiveFilter={setMigrationsFilterAction}
              transformationPlans={transformationPlans}
              notStartedPlans={notStartedTransformationPlans}
              activeTransformationPlans={activeTransformationPlans}
              finishedTransformationPlans={finishedTransformationPlans}
              createMigrationPlanClick={showPlanWizardAction}
              createTransformationPlanRequestClick={
                this.createTransformationPlanRequest
              }
              isCreatingTransformationPlanRequest={
                isCreatingTransformationPlanRequest
              }
              redirectTo={this.redirectTo}
            />
          )}
          <InfrastructureMappingsList
            clusters={clusters}
            transformationMappings={transformationMappings}
            createInfraMappingClick={showMappingWizardAction}
          />
        </Spinner>
      </div>
    );

    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">
          Compute
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Migration</Breadcrumb.Item>
      </Toolbar>
    );

    return (
      <React.Fragment>
        {toolbarContent}
        {overviewContent}
        {mappingWizardVisible && this.mappingWizard}
        {planWizardVisible && this.planWizard}
      </React.Fragment>
    );
  }
}
Overview.propTypes = {
  store: PropTypes.object,
  showMappingWizardAction: PropTypes.func,
  showPlanWizardAction: PropTypes.func,
  addNotificationAction: PropTypes.func,
  mappingWizardVisible: PropTypes.bool,
  planWizardVisible: PropTypes.bool,
  transformationPlans: PropTypes.array,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  isFetchingTransformationPlans: PropTypes.bool,
  plansPreviouslyFetched: PropTypes.bool,
  notStartedTransformationPlans: PropTypes.array,
  activeTransformationPlans: PropTypes.array,
  finishedTransformationPlans: PropTypes.array,
  transformationMappings: PropTypes.array,
  fetchTransformationMappingsUrl: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  createTransformationPlanRequestAction: PropTypes.func,
  isCreatingTransformationPlanRequest: PropTypes.string,
  isContinuingToPlan: PropTypes.bool,
  planWizardId: PropTypes.string,
  continueToPlanAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool,
  fetchClustersAction: PropTypes.func,
  fetchClustersUrl: PropTypes.string,
  clusters: PropTypes.array,
  migrationsFilter: PropTypes.string,
  setMigrationsFilterAction: PropTypes.func,
  history: PropTypes.object
};
export default Overview;
