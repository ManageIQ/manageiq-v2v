import React from 'react';
import PropTypes from 'prop-types';
import { Card, Breadcrumb, CardGrid, Spinner, Icon } from 'patternfly-react';

import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import Migrations from './components/Migrations/Migrations';
import ShowWizardEmptyState from '../common/ShowWizardEmptyState/ShowWizardEmptyState';
import componentRegistry from '../../../../components/componentRegistry';
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

    const p1 = fetchTransformationPlansAction({
      url: fetchTransformationPlansUrl,
      archived: false
    });
    const p2 = fetchTransformationPlansAction({
      url: fetchArchivedTransformationPlansUrl,
      archived: true
    });
    const p3 = fetchServiceTemplateAnsiblePlaybooksAction(fetchServiceTemplateAnsiblePlaybooksUrl);
    const p4 = fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    const p5 = fetchProvidersAction();

    Promise.all([p1, p2, p3, p4, p5]).then(() => {
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
      planWizardId
    } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (isContinuingToPlan !== nextProps.isContinuingToPlan && !nextProps.isContinuingToPlan) {
      this.showPlanWizardOrError(planWizardId);
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

  componentWillUnmount() {
    this.stopPolling();
  }

  showPlanWizardOrError = planWizardId => {
    const { transformationMappings, showPlanWizardAction } = this.props;
    if (transformationMappings.length > 0) {
      showPlanWizardAction(planWizardId);
    } else {
      this.showNoMappingsError();
    }
  };

  showPlanWizardEditModeOrError = editingPlanId => {
    const { transformationMappings, showPlanWizardEditModeAction } = this.props;
    if (transformationMappings.length > 0) {
      showPlanWizardEditModeAction(editingPlanId);
    } else {
      this.showNoMappingsError();
    }
  };

  showNoMappingsError = () => {
    const { showConfirmModalAction, hideConfirmModalAction } = this.props;
    showConfirmModalAction({
      title: __('Migration plan error'),
      icon: <Icon className="confirm-warning-icon" type="pf" name="error-circle-o" />,
      body: (
        <React.Fragment>
          <h3 style={{ marginTop: 0 }}>{__('No infrastructure mapping exists')}</h3>
          <p>
            {__('A migration plan must include an infrastructure mapping.')}{' '}
            <a href="/migration#/mappings">{__('Go to the Infrastructure Mappings page to create one.')}</a>
          </p>
        </React.Fragment>
      ),
      cancelButtonLabel: null,
      confirmButtonLabel: __('Close'),
      onConfirm: hideConfirmModalAction
    });
  };

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

  renderAggregateDataCards = () => {
    const {
      activeTransformationPlans,
      allRequestsWithTasks,
      archivedTransformationPlans,
      finishedTransformationPlans,
      isFetchingAllRequestsWithTasks,
      migrationsFilter,
      notStartedTransformationPlans,
      reloadCard,
      requestsWithTasksPreviouslyFetched,
      setMigrationsFilterAction
    } = this.props;
    return (
      <div className="row-cards-pf">
        <Card.HeightMatching selector={['.card-pf-match-height']}>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.NotStartedTransformationPlans
              notStartedPlans={notStartedTransformationPlans}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
              migrationsFilter={migrationsFilter}
              setMigrationsFilterAction={setMigrationsFilterAction}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ActiveTransformationPlans
              activePlans={activeTransformationPlans}
              allRequestsWithTasks={allRequestsWithTasks}
              reloadCard={reloadCard}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
              migrationsFilter={migrationsFilter}
              setMigrationsFilterAction={setMigrationsFilterAction}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.FinishedTransformationPlans
              finishedPlans={finishedTransformationPlans}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
              migrationsFilter={migrationsFilter}
              setMigrationsFilterAction={setMigrationsFilterAction}
            />
          </CardGrid.Col>
          <CardGrid.Col xs={6} sm={3}>
            <AggregateCards.ArchivedTransformationPlans
              archivedPlans={archivedTransformationPlans}
              loading={isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched}
              migrationsFilter={migrationsFilter}
              setMigrationsFilterAction={setMigrationsFilterAction}
            />
          </CardGrid.Col>
        </Card.HeightMatching>
      </div>
    );
  };

  redirectTo = path => this.props.redirectTo(path);

  render() {
    const {
      isFetchingProviders,
      hasSufficientProviders,
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
      isFetchingTransformationPlans,
      isFetchingArchivedTransformationPlans,
      addNotificationAction,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      openMappingWizardOnTransitionAction,
      setMigrationsFilterAction,
      initialMigrationsFilterSet
    } = this.props;

    const mainContent = (
      <React.Fragment>
        <Spinner
          loading={
            !requestsWithTasksPreviouslyFetched &&
            !this.state.hasMadeInitialPlansFetch &&
            (isFetchingAllRequestsWithTasks ||
              isFetchingProviders ||
              isFetchingTransformationPlans ||
              isFetchingArchivedTransformationPlans ||
              isFetchingTransformationMappings)
          }
          style={{ marginTop: 200 }}
        >
          {hasSufficientProviders ? (
            !!transformationMappings.length || !!transformationPlans.length || !!archivedTransformationPlans.length ? (
              <Migrations
                activeFilter={migrationsFilter}
                initialMigrationsFilterSet={initialMigrationsFilterSet}
                setMigrationsFilterAction={setMigrationsFilterAction}
                transformationPlans={transformationPlans}
                allRequestsWithTasks={allRequestsWithTasks}
                archivedTransformationPlans={archivedTransformationPlans}
                allArchivedPlanRequestsWithTasks={allArchivedPlanRequestsWithTasks}
                reloadCard={reloadCard}
                notStartedPlans={notStartedTransformationPlans}
                activeTransformationPlans={activeTransformationPlans}
                serviceTemplatePlaybooks={serviceTemplatePlaybooks}
                finishedTransformationPlans={finishedTransformationPlans}
                createMigrationPlanClick={this.showPlanWizardOrError}
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
                showPlanWizardEditModeAction={this.showPlanWizardEditModeOrError}
                fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
                fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                showEditPlanNameModalAction={showEditPlanNameModalAction}
              />
            ) : (
              <ShowWizardEmptyState
                description={__('Create an infrastructure mapping to later be used by a migration plan')}
                buttonText={__('Create Infrastructure Mapping')}
                showWizardAction={() => {
                  this.redirectTo('/migration/mappings');
                  openMappingWizardOnTransitionAction();
                }}
                className="full-page-empty"
              />
            )
          ) : (
            <ShowWizardEmptyState
              description={
                __('The source and target providers must be configured before attempting a migration') // prettier-ignore
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
      </React.Fragment>
    );

    const inProgressCardsVisible =
      migrationsFilter === MIGRATIONS_FILTERS.inProgress && activeTransformationPlans.length > 0;

    const emptyStateVisible =
      (migrationsFilter === MIGRATIONS_FILTERS.notStarted && notStartedTransformationPlans.length === 0) ||
      (migrationsFilter === MIGRATIONS_FILTERS.inProgress && activeTransformationPlans.length === 0) ||
      (migrationsFilter === MIGRATIONS_FILTERS.completed && finishedTransformationPlans.length === 0) ||
      (migrationsFilter === MIGRATIONS_FILTERS.archived && archivedTransformationPlans.length === 0);

    // Full-height grey background (.cards-pf) for in-progress cards and empty states, otherwise only grey behind aggregate cards
    const overviewContent =
      inProgressCardsVisible || emptyStateVisible ? (
        <div
          className="row cards-pf"
          style={{ overflow: 'auto', overflowX: 'hidden', paddingBottom: 50, height: '100%' }}
        >
          {this.renderAggregateDataCards()}
          {mainContent}
        </div>
      ) : (
        <div className="row" style={{ overflow: 'auto', overflowX: 'hidden', paddingBottom: 50, height: '100%' }}>
          <div className="row cards-pf" style={{ marginLeft: 0, marginRight: 0 }}>
            {this.renderAggregateDataCards()}
          </div>
          <div className="row" style={{ marginLeft: 0, marginRight: 0 }}>
            {mainContent}
          </div>
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
  isFetchingTransformationPlans: PropTypes.bool,
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
  redirectTo: PropTypes.func.isRequired,
  openMappingWizardOnTransitionAction: PropTypes.func,
  initialMigrationsFilterSet: PropTypes.bool
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
