import React from 'react';
import PropTypes from 'prop-types';
import { Card, Breadcrumb, CardGrid, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
import OverviewEmptyState from './components/OverviewEmptyState/OverviewEmptyState';
import componentRegistry from '../../../../components/componentRegistry';
import getMostRecentRequest from '../common/getMostRecentRequest';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.mappingWizard = componentRegistry.markup(
      'MappingWizardContainer',
      props.store
    );
    this.planWizard = componentRegistry.markup(
      'PlanWizardContainer',
      props.store
    );
  }

  state = {
    hasMadeInitialPlansFetch: false
  };

  componentDidMount() {
    const {
      fetchProvidersAction,
      fetchClustersUrl,
      fetchClustersAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction
    } = this.props;

    fetchProvidersAction();
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
    const {
      finishedTransformationPlans,
      addNotificationAction,
      yesToDeleteInfrastructureMapping
    } = this.props;
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
        const mostRecentRequest = getMostRecentRequest(plan.miq_requests);

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
          actionEnabled: true
        });
      });
    }

    if (yesToDeleteInfrastructureMapping) {
      const { deleteInfrastructureMappingAction, mappingToDelete } = this.props;
      deleteInfrastructureMappingAction(mappingToDelete);
    }
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => {
    const {
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl
    } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
    }, 15000);
  };

  stopPolling = () => {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  };

  createTransformationPlanRequest = (url, planId) => {
    const {
      createTransformationPlanRequestAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      setMigrationsFilterAction,
      retryMigrationAction
    } = this.props;

    createTransformationPlanRequestAction(url).then(() => {
      retryMigrationAction(planId);
      setMigrationsFilterAction('Migration Plans in Progress');
      fetchTransformationPlansAction(fetchTransformationPlansUrl);
    });
  };

  redirectTo = path => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const {
      isFetchingProviders,
      hasSufficientProviders,
      showMappingWizardAction,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      transformationMappings,
      isFetchingTransformationMappings,
      isRejectedTransformationMappings, // eslint-disable-line no-unused-vars
      transformationPlans,
      allRequestsWithTasks,
      reloadCard,
      isFetchingAllRequestsWithTasks,
      requestsWithTasksPreviouslyFetched,
      notStartedTransformationPlans,
      activeTransformationPlans,
      finishedTransformationPlans,
      finishedWithErrorTransformationPlans,
      isCreatingTransformationPlanRequest,
      clusters,
      migrationsFilter,
      setMigrationsFilterAction,
      showDeleteConfirmationModal,
      showDeleteConfirmationModalAction,
      hideDeleteConfirmationModalAction,
      setMappingToDeleteAction,
      mappingToDelete,
      yesToDeleteInfrastructureMappingAction,
      deleteInfrastructureMappingAction
    } = this.props;

    const inProgressRequestsTransformationMappings = () => {
      const mappings = [];

      if (activeTransformationPlans) {
        activeTransformationPlans.map(plan =>
          mappings.push(plan.options.config_info.transformation_mapping_id)
        );
      }
      return mappings;
    };

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
              reloadCard={reloadCard}
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
            isFetchingProviders ||
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
              reloadCard={reloadCard}
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
          {hasSufficientProviders ? (
            <InfrastructureMappingsList
              clusters={clusters}
              transformationMappings={transformationMappings}
              createInfraMappingClick={showMappingWizardAction}
              inProgressRequestsTransformationMappings={inProgressRequestsTransformationMappings()}
              showDeleteConfirmationModalAction={
                showDeleteConfirmationModalAction
              }
              setMappingToDeleteAction={setMappingToDeleteAction}
              showDeleteConfirmationModal={showDeleteConfirmationModal}
              hideDeleteConfirmationModalAction={
                hideDeleteConfirmationModalAction
              }
              mappingToDelete={mappingToDelete}
              yesToDeleteInfrastructureMappingAction={
                yesToDeleteInfrastructureMappingAction
              }
              notStartedTransformationPlans={notStartedTransformationPlans}
              finishedWithErrorTransformationPlans={
                finishedWithErrorTransformationPlans
              }
              deleteInfrastructureMappingAction={
                deleteInfrastructureMappingAction
              }
            />
          ) : (
            <OverviewEmptyState
              description="The VMWare and Red Hat Virtualization providers must be configured before attempting a migration."
              buttonText="Configure Providers"
              buttonHref="/ems_cloud/show_list"
              className="full-page-empty"
            />
          )}
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
  reloadCard: PropTypes.bool,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  isFetchingAllRequestsWithTasks: PropTypes.bool,
  requestsWithTasksPreviouslyFetched: PropTypes.bool,
  notStartedTransformationPlans: PropTypes.array,
  activeTransformationPlans: PropTypes.array,
  finishedTransformationPlans: PropTypes.array,
  finishedWithErrorTransformationPlans: PropTypes.array,
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
  retryMigrationAction: PropTypes.func,
  history: PropTypes.object,
  showDeleteConfirmationModal: PropTypes.bool,
  showDeleteConfirmationModalAction: PropTypes.func,
  hideDeleteConfirmationModalAction: PropTypes.func,
  setMappingToDeleteAction: PropTypes.func,
  mappingToDelete: PropTypes.object,
  yesToDeleteInfrastructureMappingAction: PropTypes.func,
  deleteInfrastructureMappingAction: PropTypes.func,
  yesToDeleteInfrastructureMapping: PropTypes.bool,
  fetchProvidersAction: PropTypes.func,
  isFetchingProviders: PropTypes.bool,
  hasSufficientProviders: PropTypes.bool
};
export default Overview;
