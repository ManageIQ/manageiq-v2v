import React from 'react';
import PropTypes from 'prop-types';
import { Card, Breadcrumb, CardGrid, Spinner } from 'patternfly-react';

import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import Migrations from './components/Migrations/Migrations';
import ShowWizardEmptyState from '../common/ShowWizardEmptyState/ShowWizardEmptyState';
import componentRegistry from '../../../../components/componentRegistry';
import getMostRecentRequest from '../common/getMostRecentRequest';
import ConfirmModal from '../common/ConfirmModal';
import EditPlanNameModal from './components/EditPlanNameModal';
import {
  MIGRATIONS_FILTERS,
  FETCH_TRANSFORMATION_PLANS_URL,
  FETCH_ARCHIVED_TRANSFORMATION_PLANS_URL
} from './OverviewConstants';
import { FETCH_TRANSFORMATION_MAPPINGS_URL } from '../Mappings/MappingsConstants';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.planWizard = componentRegistry.markup('PlanWizardContainer', props.store);
  }

  state = {
    hasMadeInitialPlansFetch: false
  };

  componentDidMount() {
    const {
      fetchProvidersAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction,
      fetchArchivedTransformationPlansUrl,
      fetchServiceTemplateAnsiblePlaybooksAction,
      fetchServiceTemplateAnsiblePlaybooksUrl
    } = this.props;

    fetchProvidersAction();
    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);

    const p1 = fetchTransformationPlansAction({
      url: fetchTransformationPlansUrl,
      archived: false
    });
    // fetch archived plans initially so we have them for plan name validation in plan wizard
    const p2 = fetchTransformationPlansAction({
      url: fetchArchivedTransformationPlansUrl,
      archived: true
    });

    const p3 = fetchServiceTemplateAnsiblePlaybooksAction(fetchServiceTemplateAnsiblePlaybooksUrl);

    Promise.all([p1, p2, p3]).then(() => {
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
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction,
      planWizardId,
      showPlanWizardAction
    } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (isContinuingToPlan !== nextProps.isContinuingToPlan && !nextProps.isContinuingToPlan) {
      showPlanWizardAction(planWizardId);
    }

    // kill interval if a wizard becomes visble
    if (nextProps.planWizardVisible) {
      this.stopPolling();
    } else if (!nextProps.planWizardVisible && hasMadeInitialPlansFetch && !this.pollingInterval) {
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
      this.startPolling();
    }
  }

  componentDidUpdate(prevProps) {
    const { finishedTransformationPlans, addNotificationAction } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (hasMadeInitialPlansFetch && finishedTransformationPlans.length > prevProps.finishedTransformationPlans.length) {
      const oldTransformationPlanIds = prevProps.finishedTransformationPlans.map(plan => plan.id);
      const freshTransformationPlans = finishedTransformationPlans.filter(
        plan => !oldTransformationPlanIds.includes(plan.id)
      );

      freshTransformationPlans.forEach(plan => {
        const mostRecentRequest = getMostRecentRequest(plan.miq_requests);

        let planStatusMessage = sprintf(__('%s completed with errors'), plan.name);
        let planStatus = false;
        if (mostRecentRequest.status === 'Ok') {
          planStatusMessage = sprintf(__('%s completed successfully'), plan.name);
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
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => {
    const { fetchTransformationPlansAction, fetchTransformationPlansUrl } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
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
      setMigrationsFilterAction(MIGRATIONS_FILTERS.inProgress);
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
    });
  };

  redirectTo = path => this.props.redirectTo(path);

  render() {
    const {
      isFetchingProviders,
      hasSufficientProviders,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      editPlanNameModalVisible,
      showEditPlanNameModalAction,
      hideEditPlanNameModalAction,
      transformationMappings,
      isFetchingTransformationMappings,
      transformationPlans,
      allRequestsWithTasks,
      reloadCard,
      isFetchingAllRequestsWithTasks,
      requestsWithTasksPreviouslyFetched,
      notStartedTransformationPlans,
      activeTransformationPlans,
      serviceTemplatePlaybooks,
      finishedTransformationPlans,
      isCreatingTransformationPlanRequest,
      migrationsFilter,
      setMigrationsFilterAction,
      confirmModalVisible,
      confirmModalOptions,
      showConfirmModalAction,
      hideConfirmModalAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      fetchArchivedTransformationPlansUrl,
      archivedTransformationPlans,
      allArchivedPlanRequestsWithTasks,
      archiveTransformationPlanAction,
      archiveTransformationPlanUrl,
      deleteTransformationPlanAction,
      deleteTransformationPlanUrl,
      isFetchingArchivedTransformationPlans,
      addNotificationAction,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      showPlanWizardEditModeAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction
    } = this.props;

    const aggregateDataCards = (
      <div className="row-cards-pf">
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.NotStartedTransformationPlans
              notStartedPlans={notStartedTransformationPlans}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ActiveTransformationPlans
              activePlans={activeTransformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
              reloadCard={reloadCard}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.FinishedTransformationPlans
              finishedPlans={finishedTransformationPlans}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
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
      <div className="row cards-pf" style={{ overflow: 'auto', paddingBottom: 1, height: '100%' }}>
        {aggregateDataCards}
        <Spinner
          loading={
            isFetchingProviders ||
            isFetchingTransformationMappings ||
            (isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched)
          }
          style={{ marginTop: 200 }}
        >
          {hasSufficientProviders ? (
            (!!transformationMappings.length ||
              !!transformationPlans.length ||
              !!archivedTransformationPlans.length) && (
              <Migrations
                activeFilter={migrationsFilter}
                setActiveFilter={setMigrationsFilterAction}
                transformationPlans={transformationPlans}
                allRequestsWithTasks={allRequestsWithTasks}
                archivedTransformationPlans={archivedTransformationPlans}
                allArchivedPlanRequestsWithTasks={allArchivedPlanRequestsWithTasks}
                reloadCard={reloadCard}
                notStartedPlans={notStartedTransformationPlans}
                activeTransformationPlans={activeTransformationPlans}
                serviceTemplatePlaybooks={serviceTemplatePlaybooks}
                finishedTransformationPlans={finishedTransformationPlans}
                createMigrationPlanClick={showPlanWizardAction}
                createTransformationPlanRequestClick={this.createTransformationPlanRequest}
                isCreatingTransformationPlanRequest={isCreatingTransformationPlanRequest}
                redirectTo={this.redirectTo}
                showConfirmModalAction={showConfirmModalAction}
                hideConfirmModalAction={hideConfirmModalAction}
                fetchTransformationPlansAction={fetchTransformationPlansAction}
                fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                fetchArchivedTransformationPlansUrl={fetchArchivedTransformationPlansUrl}
                isFetchingArchivedTransformationPlans={isFetchingArchivedTransformationPlans}
                archiveTransformationPlanAction={archiveTransformationPlanAction}
                archiveTransformationPlanUrl={archiveTransformationPlanUrl}
                deleteTransformationPlanAction={deleteTransformationPlanAction}
                deleteTransformationPlanUrl={deleteTransformationPlanUrl}
                addNotificationAction={addNotificationAction}
                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                scheduleMigrationModal={scheduleMigrationModal}
                scheduleMigrationPlan={scheduleMigrationPlan}
                scheduleMigration={scheduleMigration}
                showPlanWizardEditModeAction={showPlanWizardEditModeAction}
                fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
                fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                showEditPlanNameModalAction={showEditPlanNameModalAction}
              />
            )
          ) : (
            <ShowWizardEmptyState
              description={
                __('The VMWare and Red Hat Virtualization providers must be configured before attempting a migration.') // prettier-ignore
              }
              buttonText={__('Configure Providers')}
              buttonHref="/ems_infra/show_list"
              className="full-page-empty"
            />
          )}
        </Spinner>
        <ConfirmModal show={confirmModalVisible} onCancel={hideConfirmModalAction} {...confirmModalOptions} />
        <EditPlanNameModal
          editPlanNameModalVisible={editPlanNameModalVisible}
          hideEditPlanNameModalAction={hideEditPlanNameModalAction}
          transformationPlans={transformationPlans}
          archivedTransformationPlans={archivedTransformationPlans}
          fetchTransformationPlansAction={fetchTransformationPlansAction}
          fetchTransformationPlansUrl={fetchTransformationPlansUrl}
          fetchArchivedTransformationPlansUrl={fetchArchivedTransformationPlansUrl}
        />
      </div>
    );

    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{__('Migration')}</Breadcrumb.Item>
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
  editPlanNameModalVisible: PropTypes.bool,
  showEditPlanNameModalAction: PropTypes.func,
  hideEditPlanNameModalAction: PropTypes.func,
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
  showPlanWizardEditModeAction: PropTypes.func,
  migrationsFilter: PropTypes.string,
  setMigrationsFilterAction: PropTypes.func,
  retryMigrationAction: PropTypes.func,
  history: PropTypes.object,
  yesToDeleteInfrastructureMappingAction: PropTypes.func,
  deleteInfrastructureMappingAction: PropTypes.func,
  yesToDeleteInfrastructureMapping: PropTypes.bool,
  fetchProvidersAction: PropTypes.func,
  isFetchingProviders: PropTypes.bool,
  hasSufficientProviders: PropTypes.bool,
  confirmModalVisible: PropTypes.bool,
  confirmModalOptions: PropTypes.object,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  fetchArchivedTransformationPlansUrl: PropTypes.string,
  archivedTransformationPlans: PropTypes.array,
  allArchivedPlanRequestsWithTasks: PropTypes.array,
  isFetchingArchivedTransformationPlans: PropTypes.string,
  archiveTransformationPlanAction: PropTypes.func,
  archiveTransformationPlanUrl: PropTypes.string,
  deleteTransformationPlanAction: PropTypes.func,
  deleteTransformationPlanUrl: PropTypes.string,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  fetchServiceTemplateAnsiblePlaybooksAction: PropTypes.func,
  fetchServiceTemplateAnsiblePlaybooksUrl: PropTypes.string,
  serviceTemplatePlaybooks: PropTypes.array,
  redirectTo: PropTypes.func.isRequired
};

Overview.defaultProps = {
  archiveTransformationPlanUrl: '/api/service_templates',
  deleteTransformationPlanUrl: '/api/service_templates',
  fetchTransformationMappingsUrl: FETCH_TRANSFORMATION_MAPPINGS_URL,
  fetchTransformationPlansUrl: FETCH_TRANSFORMATION_PLANS_URL,
  fetchServiceTemplateAnsiblePlaybooksUrl:
    '/api/service_templates/?' +
    "filter[]=type='ServiceTemplateAnsiblePlaybook'" +
    '&expand=resources' +
    '&attributes=name,description,created_at',
  fetchArchivedTransformationPlansUrl: FETCH_ARCHIVED_TRANSFORMATION_PLANS_URL
};

export default Overview;
