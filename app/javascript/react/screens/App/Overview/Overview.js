import React from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Breadcrumb,
  CardGrid,
  Spinner,
  Button,
  Icon,
  Modal
} from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import * as AggregateCards from './components/AggregateCards';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import Migrations from './components/Migrations/Migrations';
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

  unUsedMappingInPlans = mappingToDelete => {
    const planNames = [];

    const {
      notStartedTransformationPlans,
      finishedWithErrorTransformationPlans
    } = this.props;

    const plansWithMappingToBeDeleted = notStartedTransformationPlans.filter(
      plan =>
        plan.options.config_info.transformation_mapping_id ===
        mappingToDelete.id
    );
    plansWithMappingToBeDeleted.map(plan => planNames.push(plan.name));

    const plansWithErrorWithMappingToBeDeleted = finishedWithErrorTransformationPlans.filter(
      plan =>
        plan.options.config_info.transformation_mapping_id ===
        mappingToDelete.id
    );
    plansWithErrorWithMappingToBeDeleted.map(plan => planNames.push(plan.name));

    if (planNames.length > 0) {
      const deleteMessageAboutUnMigratedVMs = __(
        'The infrastructure mapping is associated with migration plans that include unmigrated VMs. Deleting the mapping will prevent you from migrating the VMs in these plans:'
      );
      const deleteMessageAboutPlansUsingMapping = (
        <div>
          <h4>{deleteMessageAboutUnMigratedVMs}</h4>
          <strong>{planNames.map(plan => <ul key={plan}>{plan}</ul>)}</strong>
        </div>
      );
      return <div>{deleteMessageAboutPlansUsingMapping}</div>;
    }
    return '';
  };

  displayDeleteMessage = mappingToDelete => {
    const mappingNameStyled = `<strong>${mappingToDelete.name}</strong>`;
    const regularDeleteMessage = sprintf(
      __('Are you sure you want to delete the infrastructure mapping %s ?'),
      mappingNameStyled
    );
    return <div dangerouslySetInnerHTML={{ __html: regularDeleteMessage }} />;
  };

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
      reloadCard,
      isFetchingAllRequestsWithTasks,
      requestsWithTasksPreviouslyFetched,
      notStartedTransformationPlans,
      activeTransformationPlans,
      finishedTransformationPlans,
      isCreatingTransformationPlanRequest,
      clusters,
      migrationsFilter,
      setMigrationsFilterAction,
      showDeleteConfirmationModal,
      showDeleteConfirmationModalAction,
      hideDeleteConfirmationModalAction,
      setMappingToDeleteAction,
      mappingToDelete,
      yesToDeleteInfrastructureMappingAction
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
          <InfrastructureMappingsList
            clusters={clusters}
            transformationMappings={transformationMappings}
            createInfraMappingClick={showMappingWizardAction}
            inProgressRequestsTransformationMappings={inProgressRequestsTransformationMappings()}
            showDeleteConfirmationModalAction={
              showDeleteConfirmationModalAction
            }
            setMappingToDeleteAction={setMappingToDeleteAction}
          />
          <Modal
            show={showDeleteConfirmationModal}
            onHide={hideDeleteConfirmationModalAction}
          >
            <Modal.Header>
              <Modal.CloseButton onClick={hideDeleteConfirmationModalAction} />
              <Modal.Title>{__('Delete Infrastructure Mapping')}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="warning-modal-body">
              <div className="warning-modal-body--icon">
                <Icon type="pf" name="delete" />
              </div>
              <div className="warning-modal-body--list">
                <h4>
                  {mappingToDelete &&
                    this.unUsedMappingInPlans(mappingToDelete)}
                </h4>
                <h4>
                  {mappingToDelete &&
                    this.displayDeleteMessage(mappingToDelete)}
                </h4>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                bsStyle="default"
                className="btn-cancel"
                onClick={hideDeleteConfirmationModalAction}
              >
                {__('Cancel')}
              </Button>
              <Button
                bsStyle="primary"
                onClick={yesToDeleteInfrastructureMappingAction}
              >
                {__('Delete')}
              </Button>
            </Modal.Footer>
          </Modal>
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
  yesToDeleteInfrastructureMapping: PropTypes.bool
};
export default Overview;
