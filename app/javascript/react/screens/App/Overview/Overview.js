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
        const mostRecentRequest = plan.miq_requests.reduce(
          (prev, current) =>
            prev.updated_on > current.updated_on ? prev : current
        );

        let planStatusMessage = sprintf(
          __('%s completed with errors'),
          plan.name
        );
        let planStatus = false;
        if (mostRecentRequest.status === 'Ok') {
          planStatusMessage = sprintf(
            __('%s completed successfully'),
            plan.name
          );
          planStatus = true;
        }

        addNotificationAction({
          message: planStatusMessage,
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
    }, 15000);
  }

  stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }

  createTransformationPlanRequest(url) {
    const {
      createTransformationPlanRequestAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      setMigrationsFilterAction
    } = this.props;

    createTransformationPlanRequestAction(url).then(() => {
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
      allRequestsWithTasks,
      isFetchingAllRequestsWithTasks,
      requestsWithTasksPreviouslyFetched,
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
              loading={
                isFetchingAllRequestsWithTasks &&
                !requestsWithTasksPreviouslyFetched
              }
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ActiveTransformationPlans
              activePlans={activeTransformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
              loading={
                isFetchingAllRequestsWithTasks &&
                !requestsWithTasksPreviouslyFetched
              }
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.FinishedTransformationPlans
              finishedPlans={finishedTransformationPlans}
              loading={
                isFetchingAllRequestsWithTasks &&
                !requestsWithTasksPreviouslyFetched
              }
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
            (isFetchingAllRequestsWithTasks &&
              !requestsWithTasksPreviouslyFetched)
          }
          style={{ marginTop: 200 }}
        >
          {transformationMappings.length > 0 && (
            <Migrations
              activeFilter={migrationsFilter}
              setActiveFilter={setMigrationsFilterAction}
              transformationPlans={transformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
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
  allRequestsWithTasks: PropTypes.array,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  isFetchingAllRequestsWithTasks: PropTypes.bool,
  requestsWithTasksPreviouslyFetched: PropTypes.bool,
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
