import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { noop, DropdownButton, Grid, Icon, MenuItem } from 'patternfly-react';
import MigrationsInProgressCards from './MigrationsInProgressCards';
import MigrationsNotStartedList from './MigrationsNotStartedList';
import MigrationsCompletedList from './MigrationsCompletedList';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import { MIGRATIONS_FILTERS } from '../../OverviewConstants';

const Migrations = ({
  activeFilter,
  setActiveFilter,
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
  plansMutatedWithMappingInfo,
  showPlanWizardEditModeAction
}) => {
  const filterOptions = [
    MIGRATIONS_FILTERS.notStarted,
    MIGRATIONS_FILTERS.inProgress,
    MIGRATIONS_FILTERS.completed,
    MIGRATIONS_FILTERS.archived
  ];

  const plansExist = transformationPlans.length > 0 || archivedTransformationPlans.length > 0;
  const onSelect = eventKey => {
    if (eventKey === MIGRATIONS_FILTERS.archived) {
      fetchTransformationPlansAction({
        url: fetchArchivedTransformationPlansUrl,
        archived: true
      });
    }
    setActiveFilter(eventKey);
  };

  return (
    <React.Fragment>
      <Grid.Col xs={12}>
        <div className="heading-with-link-container">
          <div className="pull-left">
            <h3>{__('Migration Plans')}</h3>
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
        <hr style={{ borderTopColor: '#d1d1d1' }} />
        {plansExist ? (
          <div style={{ marginBottom: 15 }}>
            <DropdownButton
              bsStyle="default"
              title={sprintf(__('%s'), activeFilter)}
              id="dropdown-filter"
              onSelect={eventKey => onSelect(eventKey)}
            >
              {filterOptions.map((filter, i) => (
                <MenuItem eventKey={filter} active={filter === activeFilter} key={i}>
                  {sprintf(__('%s'), filter)}
                </MenuItem>
              ))}
            </DropdownButton>
          </div>
        ) : (
          <OverviewEmptyState
            showWizardAction={createMigrationPlanClick}
            description={__('Create a migration plan to select VMs for migration.')}
            buttonText={__('Create Migration Plan')}
          />
        )}
      </Grid.Col>
      {plansExist && (
        <div className="migrations">
          {activeFilter === MIGRATIONS_FILTERS.notStarted && (
            <MigrationsNotStartedList
              notStartedPlans={Immutable.asMutable(notStartedPlans, { deep: true })}
              migrateClick={createTransformationPlanRequestClick}
              loading={isCreatingTransformationPlanRequest}
              redirectTo={redirectTo}
              showConfirmModalAction={showConfirmModalAction}
              hideConfirmModalAction={hideConfirmModalAction}
              addNotificationAction={addNotificationAction}
              toggleScheduleMigrationModal={toggleScheduleMigrationModal}
              scheduleMigrationModal={scheduleMigrationModal}
              scheduleMigrationPlan={scheduleMigrationPlan}
              scheduleMigration={scheduleMigration}
              fetchTransformationPlansAction={fetchTransformationPlansAction}
              fetchTransformationPlansUrl={fetchTransformationPlansUrl}
              plansMutatedWithMappingInfo={plansMutatedWithMappingInfo}
              deleteTransformationPlanAction={deleteTransformationPlanAction}
              deleteTransformationPlanUrl={deleteTransformationPlanUrl}
              showPlanWizardEditModeAction={showPlanWizardEditModeAction}
            />
          )}
          {activeFilter === MIGRATIONS_FILTERS.inProgress && (
            <MigrationsInProgressCards
              activeTransformationPlans={activeTransformationPlans}
              serviceTemplatePlaybooks={serviceTemplatePlaybooks}
              allRequestsWithTasks={allRequestsWithTasks}
              reloadCard={reloadCard}
              loading={isCreatingTransformationPlanRequest !== null}
              redirectTo={redirectTo}
            />
          )}
          {activeFilter === MIGRATIONS_FILTERS.completed && (
            <MigrationsCompletedList
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
              plansMutatedWithMappingInfo={plansMutatedWithMappingInfo}
            />
          )}
          {activeFilter === MIGRATIONS_FILTERS.archived && (
            <MigrationsCompletedList
              finishedTransformationPlans={Immutable.asMutable(archivedTransformationPlans, { deep: true })}
              allRequestsWithTasks={allArchivedPlanRequestsWithTasks}
              redirectTo={redirectTo}
              loading={isFetchingArchivedTransformationPlans}
              archived
              plansMutatedWithMappingInfo={plansMutatedWithMappingInfo}
              showConfirmModalAction={showConfirmModalAction}
              hideConfirmModalAction={hideConfirmModalAction}
              addNotificationAction={addNotificationAction}
              deleteTransformationPlanAction={deleteTransformationPlanAction}
              deleteTransformationPlanUrl={deleteTransformationPlanUrl}
              fetchTransformationPlansAction={fetchTransformationPlansAction}
              fetchTransformationPlansUrl={fetchTransformationPlansUrl}
              fetchArchivedTransformationPlansUrl={fetchArchivedTransformationPlansUrl}
            />
          )}
        </div>
      )}
    </React.Fragment>
  );
};

Migrations.propTypes = {
  activeFilter: PropTypes.string,
  setActiveFilter: PropTypes.func,
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
  isFetchingArchivedTransformationPlans: PropTypes.string,
  archiveTransformationPlanAction: PropTypes.func,
  archiveTransformationPlanUrl: PropTypes.string,
  deleteTransformationPlanAction: PropTypes.func,
  deleteTransformationPlanUrl: PropTypes.string,
  addNotificationAction: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  plansMutatedWithMappingInfo: PropTypes.bool,
  showPlanWizardEditModeAction: PropTypes.func
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
