import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { noop, Grid, Icon } from 'patternfly-react';
import MigrationsInProgressList from './MigrationsInProgressList';
import MigrationsNotStartedList from './MigrationsNotStartedList';
import MigrationsCompletedList from './MigrationsCompletedList';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import { MIGRATIONS_FILTERS, V2V_AUTO_SET_MIGRATIONS_FILTER } from '../../OverviewConstants';

class Migrations extends React.Component {
  componentDidMount = () => {
    const {
      activeTransformationPlans,
      archivedTransformationPlans,
      finishedTransformationPlans,
      initialMigrationsFilterSet,
      notStartedPlans,
      setMigrationsFilterAction
    } = this.props;

    if (!initialMigrationsFilterSet) {
      setMigrationsFilterAction(
        MIGRATIONS_FILTERS[
          (activeTransformationPlans.length && 'inProgress') ||
            (notStartedPlans.length && 'notStarted') ||
            (finishedTransformationPlans.length && 'completed') ||
            (archivedTransformationPlans.length && 'archived')
        ],
        { [V2V_AUTO_SET_MIGRATIONS_FILTER]: true }
      );
    }
  };

  render() {
    const {
      activeFilter,
      transformationPlans,
      allRequestsWithTasks,
      reloadCard,
      notStartedPlans,
      activeTransformationPlans,
      serviceTemplatePlaybooks,
      createMigrationPlanClick,
      createTransformationPlanRequestClick,
      isCreatingTransformationPlanRequest,
      finishedTransformationPlans,
      redirectTo,
      showConfirmModalAction,
      hideConfirmModalAction,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      fetchArchivedTransformationPlansUrl,
      isFetchingArchivedTransformationPlans,
      isFetchingTransformationPlans,
      isFetchingAllRequestsWithTasks,
      archivedTransformationPlans,
      allArchivedPlanRequestsWithTasks,
      archiveTransformationPlanAction,
      archiveTransformationPlanUrl,
      deleteTransformationPlanAction,
      deleteTransformationPlanUrl,
      addNotificationAction,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration,
      scheduleCutover,
      showPlanWizardEditModeAction,
      fetchTransformationMappingsUrl,
      fetchTransformationMappingsAction,
      showEditPlanNameModalAction,
      acknowledgeDeniedPlanRequestAction,
      isEditingPlanRequest,
      setMigrationsFilterAction,
      cancelPlanRequestAction,
      isCancellingPlanRequest,
      requestsProcessingCancellation
    } = this.props;

    const plansExist = transformationPlans.length > 0 || archivedTransformationPlans.length > 0;

    return (
      <React.Fragment>
        <Grid.Col xs={12} style={{ backgroundColor: '#fff' }}>
          <div className="heading-with-link-container">
            <div className="pull-left">
              <h3>{activeFilter}</h3>
            </div>
            <div className="pull-right">
              {/** todo: create IconLink in patternfly-react * */}
              <a
                href="#"
                onClick={e => {
                  e.preventDefault();
                  createMigrationPlanClick();
                }}
              >
                <Icon type="pf" name="add-circle-o" />
                &nbsp;
                {__('Create Migration Plan')}
              </a>
            </div>
          </div>
          <hr style={{ borderTopColor: '#d1d1d1', marginBottom: 0, marginLeft: '-20px', marginRight: '-20px' }} />
          {!plansExist && (
            <div style={{ marginLeft: '-20px', marginRight: '-20px', marginBottom: '-20px' }}>
              <ShowWizardEmptyState
                showWizardAction={() => createMigrationPlanClick()}
                description={__('Create a migration plan to select VMs for migration.')}
                buttonText={__('Create Migration Plan')}
              />
            </div>
          )}
        </Grid.Col>

        {plansExist && (
          <div className="migrations">
            {activeFilter === MIGRATIONS_FILTERS.notStarted && (
              <MigrationsNotStartedList
                notStartedPlans={Immutable.asMutable(notStartedPlans, { deep: true })}
                scheduleMigrationNow={createTransformationPlanRequestClick}
                loading={isCreatingTransformationPlanRequest}
                redirectTo={redirectTo}
                showConfirmModalAction={showConfirmModalAction}
                hideConfirmModalAction={hideConfirmModalAction}
                addNotificationAction={addNotificationAction}
                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                scheduleMigrationModal={scheduleMigrationModal}
                scheduleMigrationPlan={scheduleMigrationPlan}
                scheduleMigration={scheduleMigration}
                scheduleCutover={scheduleCutover}
                fetchTransformationPlansAction={fetchTransformationPlansAction}
                fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                deleteTransformationPlanAction={deleteTransformationPlanAction}
                deleteTransformationPlanUrl={deleteTransformationPlanUrl}
                showPlanWizardEditModeAction={showPlanWizardEditModeAction}
                fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
              />
            )}
            {activeFilter === MIGRATIONS_FILTERS.inProgress && (
              <MigrationsInProgressList
                activeTransformationPlans={activeTransformationPlans}
                serviceTemplatePlaybooks={serviceTemplatePlaybooks}
                allRequestsWithTasks={allRequestsWithTasks}
                reloadCard={reloadCard}
                loading={isCreatingTransformationPlanRequest !== null}
                redirectTo={redirectTo}
                fetchTransformationPlansAction={fetchTransformationPlansAction}
                fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                isFetchingTransformationPlans={isFetchingTransformationPlans}
                isFetchingAllRequestsWithTasks={isFetchingAllRequestsWithTasks}
                acknowledgeDeniedPlanRequestAction={acknowledgeDeniedPlanRequestAction}
                isEditingPlanRequest={isEditingPlanRequest}
                setMigrationsFilterAction={setMigrationsFilterAction}
                cancelPlanRequestAction={cancelPlanRequestAction}
                isCancellingPlanRequest={isCancellingPlanRequest}
                requestsProcessingCancellation={requestsProcessingCancellation}
                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                scheduleMigrationModal={scheduleMigrationModal}
                scheduleMigrationPlan={scheduleMigrationPlan}
                scheduleMigration={scheduleMigration}
                scheduleMigrationNow={createTransformationPlanRequestClick}
                scheduleCutover={scheduleCutover}
                showConfirmModalAction={showConfirmModalAction}
                hideConfirmModalAction={hideConfirmModalAction}
              />
            )}
            {activeFilter === MIGRATIONS_FILTERS.completed && (
              <MigrationsCompletedList
                scheduleMigrationNow={createTransformationPlanRequestClick}
                scheduleCutover={scheduleCutover}
                finishedTransformationPlans={Immutable.asMutable(finishedTransformationPlans, { deep: true })}
                allRequestsWithTasks={allRequestsWithTasks}
                retryClick={createTransformationPlanRequestClick}
                loading={isCreatingTransformationPlanRequest}
                redirectTo={redirectTo}
                showConfirmModalAction={showConfirmModalAction}
                hideConfirmModalAction={hideConfirmModalAction}
                archiveTransformationPlanAction={archiveTransformationPlanAction}
                archiveTransformationPlanUrl={archiveTransformationPlanUrl}
                deleteTransformationPlanAction={deleteTransformationPlanAction}
                deleteTransformationPlanUrl={deleteTransformationPlanUrl}
                fetchTransformationPlansAction={fetchTransformationPlansAction}
                fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                fetchArchivedTransformationPlansUrl={fetchArchivedTransformationPlansUrl}
                addNotificationAction={addNotificationAction}
                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                scheduleMigrationModal={scheduleMigrationModal}
                scheduleMigrationPlan={scheduleMigrationPlan}
                scheduleMigration={scheduleMigration}
                fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
                showEditPlanNameModalAction={showEditPlanNameModalAction}
              />
            )}
            {activeFilter === MIGRATIONS_FILTERS.archived && (
              <MigrationsCompletedList
                finishedTransformationPlans={Immutable.asMutable(archivedTransformationPlans, { deep: true })}
                allRequestsWithTasks={allArchivedPlanRequestsWithTasks}
                redirectTo={redirectTo}
                loading={isFetchingArchivedTransformationPlans}
                archived
                showConfirmModalAction={showConfirmModalAction}
                hideConfirmModalAction={hideConfirmModalAction}
                addNotificationAction={addNotificationAction}
                deleteTransformationPlanAction={deleteTransformationPlanAction}
                deleteTransformationPlanUrl={deleteTransformationPlanUrl}
                fetchTransformationPlansAction={fetchTransformationPlansAction}
                fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                fetchArchivedTransformationPlansUrl={fetchArchivedTransformationPlansUrl}
                fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
                showEditPlanNameModalAction={showEditPlanNameModalAction}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

Migrations.propTypes = {
  activeFilter: PropTypes.string,
  initialMigrationsFilterSet: PropTypes.bool,
  setMigrationsFilterAction: PropTypes.func,
  transformationPlans: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  notStartedPlans: PropTypes.array,
  activeTransformationPlans: PropTypes.array,
  serviceTemplatePlaybooks: PropTypes.array,
  createMigrationPlanClick: PropTypes.func,
  createTransformationPlanRequestClick: PropTypes.func,
  isCreatingTransformationPlanRequest: PropTypes.string,
  finishedTransformationPlans: PropTypes.array,
  redirectTo: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  fetchArchivedTransformationPlansUrl: PropTypes.string,
  archivedTransformationPlans: PropTypes.array,
  allArchivedPlanRequestsWithTasks: PropTypes.array,
  isFetchingTransformationPlans: PropTypes.bool,
  isFetchingArchivedTransformationPlans: PropTypes.bool,
  isFetchingAllRequestsWithTasks: PropTypes.bool,
  archiveTransformationPlanAction: PropTypes.func,
  archiveTransformationPlanUrl: PropTypes.string,
  deleteTransformationPlanAction: PropTypes.func,
  deleteTransformationPlanUrl: PropTypes.string,
  addNotificationAction: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  scheduleCutover: PropTypes.func,
  showPlanWizardEditModeAction: PropTypes.func,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationMappingsUrl: PropTypes.string,
  showEditPlanNameModalAction: PropTypes.func,
  acknowledgeDeniedPlanRequestAction: PropTypes.func,
  isEditingPlanRequest: PropTypes.bool,
  cancelPlanRequestAction: PropTypes.func,
  isCancellingPlanRequest: PropTypes.bool,
  requestsProcessingCancellation: PropTypes.array
};
Migrations.defaultProps = {
  transformationPlans: [],
  notStartedPlans: [],
  activeTransformationPlans: [],
  serviceTemplatePlaybooks: [],
  createMigrationPlanClick: noop,
  createTransformationPlanRequestClick: noop,
  isCreatingTransformationPlanRequest: '',
  finishedTransformationPlans: []
};
export default Migrations;
