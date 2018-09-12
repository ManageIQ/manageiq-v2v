import React from 'react';
import PropTypes from 'prop-types';
import { Card, Breadcrumb, CardGrid, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
import ShowWizardEmptyState from '../common/ShowWizardEmptyState/ShowWizardEmptyState';
import componentRegistry from '../../../../components/componentRegistry';
import getMostRecentRequest from '../common/getMostRecentRequest';
import ConfirmModal from '../common/ConfirmModal';
import EditPlanNameModal from './components/EditPlanNameModal';
import { MIGRATIONS_FILTERS } from './OverviewConstants';

class Overview extends React.Component {
  constructor(props) {
    super(props);

    this.mappingWizard = componentRegistry.markup('MappingWizardContainer', props.store);
    this.planWizard = componentRegistry.markup('PlanWizardContainer', props.store);
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
      fetchTransformationPlansAction,
      fetchArchivedTransformationPlansUrl,
      fetchNetworksUrl,
      fetchNetworksAction,
      fetchDatastoresUrl,
      fetchDatastoresAction,
      fetchCloudTenantsUrl,
      fetchCloudTenantsAction,
      fetchCloudNetworksUrl,
      fetchCloudNetworksAction,
      fetchCloudVolumeTypesUrl,
      fetchCloudVolumeTypesAction,
      fetchServiceTemplateAnsiblePlaybooksAction,
      fetchServiceTemplateAnsiblePlaybooksUrl
    } = this.props;

    fetchNetworksAction(fetchNetworksUrl);
    fetchDatastoresAction(fetchDatastoresUrl);
    fetchCloudTenantsAction(fetchCloudTenantsUrl);
    fetchCloudNetworksAction(fetchCloudNetworksUrl);
    fetchCloudVolumeTypesAction(fetchCloudVolumeTypesUrl);
    fetchProvidersAction();
    fetchClustersAction(fetchClustersUrl);
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
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      fetchTransformationPlansUrl,
      fetchTransformationPlansAction,
      planWizardId,
      continueToPlanAction,
      shouldReloadMappings
    } = this.props;
    const { hasMadeInitialPlansFetch } = this.state;

    if (shouldReloadMappings !== nextProps.shouldReloadMappings && nextProps.shouldReloadMappings) {
      fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    } else if (isContinuingToPlan !== nextProps.isContinuingToPlan && !nextProps.isContinuingToPlan) {
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
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
      this.startPolling();
    }
  }

  componentDidUpdate(prevProps) {
    const { finishedTransformationPlans, addNotificationAction, yesToDeleteInfrastructureMapping } = this.props;
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

    if (yesToDeleteInfrastructureMapping) {
      const {
        deleteInfrastructureMappingAction,
        mappingToDelete,
        fetchTransformationPlansAction,
        fetchTransformationPlansUrl
      } = this.props;

      deleteInfrastructureMappingAction(mappingToDelete).then(() => {
        fetchTransformationPlansAction({
          url: fetchTransformationPlansUrl,
          archived: false
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
      showMappingWizardAction,
      showMappingWizardEditModeAction,
      showPlanWizardAction,
      mappingWizardVisible,
      planWizardVisible,
      editPlanNameModalVisible,
      showEditPlanNameModalAction,
      hideEditPlanNameModalAction,
      transformationMappings,
      isFetchingTransformationMappings,
      isRejectedTransformationMappings,
      transformationPlans,
      allRequestsWithTasks,
      reloadCard,
      isFetchingAllRequestsWithTasks,
      requestsWithTasksPreviouslyFetched,
      notStartedTransformationPlans,
      activeTransformationPlans,
      serviceTemplatePlaybooks,
      finishedTransformationPlans,
      finishedWithErrorTransformationPlans,
      isCreatingTransformationPlanRequest,
      clusters,
      isFetchingClusters,
      isRejectedClusters,
      migrationsFilter,
      setMigrationsFilterAction,
      showDeleteConfirmationModal,
      showDeleteConfirmationModalAction,
      hideDeleteConfirmationModalAction,
      setMappingToDeleteAction,
      mappingToDelete,
      yesToDeleteInfrastructureMappingAction,
      deleteInfrastructureMappingAction,
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
      networks,
      isFetchingNetworks,
      isRejectedNetworks,
      datastores,
      isFetchingDatastores,
      isRejectedDatastores,
      cloudTenants,
      isFetchingCloudTenants,
      isRejectedCloudTenants,
      cloudNetworks,
      isFetchingCloudNetworks,
      isRejectedCloudNetworks,
      cloudVolumeTypes,
      isFetchingCloudVolumeTypes,
      isRejectedCloudVolumeTypes,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      showPlanWizardEditModeAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction
    } = this.props;

    const inProgressRequestsTransformationMappings = () => {
      const mappings = [];

      if (activeTransformationPlans) {
        activeTransformationPlans.map(plan => mappings.push(plan.options.config_info.transformation_mapping_id));
      }
      return mappings;
    };

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
            isFetchingClusters ||
            isFetchingDatastores ||
            isFetchingNetworks ||
            isFetchingCloudTenants ||
            isFetchingCloudNetworks ||
            isFetchingCloudVolumeTypes ||
            (isFetchingAllRequestsWithTasks && !requestsWithTasksPreviouslyFetched)
          }
          style={{ marginTop: 200 }}
        >
          {(!!transformationMappings.length ||
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
          )}
          {hasSufficientProviders ? (
            <InfrastructureMappingsList
              clusters={clusters}
              datastores={datastores}
              networks={networks}
              cloudTenants={cloudTenants}
              cloudNetworks={cloudNetworks}
              cloudVolumeTypes={cloudVolumeTypes}
              transformationMappings={transformationMappings}
              error={
                isRejectedTransformationMappings ||
                isRejectedClusters ||
                isRejectedDatastores ||
                isRejectedNetworks ||
                isRejectedCloudTenants ||
                isRejectedCloudNetworks ||
                isRejectedCloudVolumeTypes
              }
              createInfraMappingClick={showMappingWizardAction}
              inProgressRequestsTransformationMappings={inProgressRequestsTransformationMappings()}
              showDeleteConfirmationModalAction={showDeleteConfirmationModalAction}
              setMappingToDeleteAction={setMappingToDeleteAction}
              showDeleteConfirmationModal={showDeleteConfirmationModal}
              hideDeleteConfirmationModalAction={hideDeleteConfirmationModalAction}
              mappingToDelete={mappingToDelete}
              yesToDeleteInfrastructureMappingAction={yesToDeleteInfrastructureMappingAction}
              notStartedTransformationPlans={notStartedTransformationPlans}
              finishedWithErrorTransformationPlans={finishedWithErrorTransformationPlans}
              deleteInfrastructureMappingAction={deleteInfrastructureMappingAction}
              migrationPlansExist={transformationPlans.length > 0 || archivedTransformationPlans.length > 0}
              showMappingWizardEditModeAction={showMappingWizardEditModeAction}
            />
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
  showPlanWizardEditModeAction: PropTypes.func,
  shouldReloadMappings: PropTypes.bool,
  fetchClustersAction: PropTypes.func,
  fetchClustersUrl: PropTypes.string,
  clusters: PropTypes.array,
  isFetchingClusters: PropTypes.bool,
  isRejectedClusters: PropTypes.bool,
  networks: PropTypes.array,
  isFetchingNetworks: PropTypes.bool,
  isRejectedNetworks: PropTypes.bool,
  datastores: PropTypes.array,
  isFetchingDatastores: PropTypes.bool,
  isRejectedDatastores: PropTypes.bool,
  cloudTenants: PropTypes.array,
  isFetchingCloudTenants: PropTypes.bool,
  isRejectedCloudTenants: PropTypes.bool,
  cloudVolumeTypes: PropTypes.array,
  isFetchingCloudVolumeTypes: PropTypes.bool,
  isRejectedCloudVolumeTypes: PropTypes.bool,
  cloudNetworks: PropTypes.array,
  isFetchingCloudNetworks: PropTypes.bool,
  isRejectedCloudNetworks: PropTypes.bool,
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
  fetchNetworksUrl: PropTypes.string,
  fetchNetworksAction: PropTypes.func,
  fetchDatastoresUrl: PropTypes.string,
  fetchDatastoresAction: PropTypes.func,
  fetchCloudTenantsUrl: PropTypes.string,
  fetchCloudTenantsAction: PropTypes.func,
  fetchCloudNetworksUrl: PropTypes.string,
  fetchCloudNetworksAction: PropTypes.func,
  fetchCloudVolumeTypesUrl: PropTypes.string,
  fetchCloudVolumeTypesAction: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  fetchServiceTemplateAnsiblePlaybooksAction: PropTypes.func,
  fetchServiceTemplateAnsiblePlaybooksUrl: PropTypes.string,
  serviceTemplatePlaybooks: PropTypes.array,
  redirectTo: PropTypes.func.isRequired,
  showMappingWizardEditModeAction: PropTypes.func
};

Overview.defaultProps = {
  archiveTransformationPlanUrl: '/api/service_templates',
  deleteTransformationPlanUrl: '/api/service_templates',
  fetchTransformationMappingsUrl:
    'api/transformation_mappings?expand=resources' +
    '&attributes=transformation_mapping_items,service_templates' +
    '&sort_by=updated_at' +
    '&sort_order=desc',
  fetchTransformationPlansUrl:
    '/api/service_templates/?' +
    "filter[]=type='ServiceTemplateTransformationPlan'" +
    '&filter[]=active=true' +
    '&expand=resources,schedules' +
    '&attributes=name,description,miq_requests,options,created_at,transformation_mapping' +
    '&sort_by=updated_at' +
    '&sort_order=desc',
  fetchServiceTemplateAnsiblePlaybooksUrl:
    '/api/service_templates/?' +
    "filter[]=type='ServiceTemplateAnsiblePlaybook'" +
    '&expand=resources' +
    '&attributes=name,description,created_at',
  fetchArchivedTransformationPlansUrl:
    '/api/service_templates/?' +
    "filter[]=type='ServiceTemplateTransformationPlan'" +
    '&filter[]=archived=true' +
    '&expand=resources' +
    '&attributes=name,description,miq_requests,options,created_at,transformation_mapping' +
    '&sort_by=updated_at' +
    '&sort_order=desc',
  fetchClustersUrl:
    'api/clusters/' +
    '?attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,lans,storages' +
    '&expand=resources',
  fetchNetworksUrl: 'api/lans/?expand=resources',
  fetchDatastoresUrl: 'api/data_stores?expand=resources',
  fetchCloudTenantsUrl:
    'api/cloud_tenants?expand=resources&attributes=ext_management_system.name,cloud_networks,cloud_volume_types',
  fetchCloudNetworksUrl: 'api/cloud_networks?expand=resources',
  fetchCloudVolumeTypesUrl: 'api/cloud_volume_types?expand=resources'
};

export default Overview;
