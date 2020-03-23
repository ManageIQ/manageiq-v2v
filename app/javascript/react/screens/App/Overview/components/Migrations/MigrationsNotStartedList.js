import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Icon, Spinner, Toolbar, DropdownKebab, MenuItem } from 'patternfly-react';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import ScheduleMigrationModal from '../ScheduleMigrationModal/ScheduleMigrationModal';
import { MIGRATIONS_NOT_STARTED_SORT_FIELDS, MIGRATIONS_FILTER_TYPES } from './MigrationsConstants';
import ScheduleMigrationButton from './ScheduleMigrationButton';
import EditScheduleMenuItems from './EditScheduleMenuItems';
import StopPropagationOnClick from '../../../common/StopPropagationOnClick';
import ListViewToolbar from '../../../common/ListViewToolbar/ListViewToolbar';
import DeleteMigrationMenuItem from './DeleteMigrationMenuItem';
import getPlanScheduleInfo from './helpers/getPlanScheduleInfo';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import ScheduledTimeInfoItem from './ScheduledTimeInfoItem';
import NumVmsInfoItem from './NumVmsInfoItem';
import MappingNameInfoItem from './MappingNameInfoItem';

const MigrationsNotStartedList = ({
  migrateClick,
  notStartedPlans,
  loading,
  redirectTo,
  showConfirmModalAction,
  hideConfirmModalAction,
  addNotificationAction,
  toggleScheduleMigrationModal,
  scheduleMigrationModal,
  scheduleMigrationPlan,
  scheduleMigration,
  fetchTransformationPlansAction,
  fetchTransformationPlansUrl,
  deleteTransformationPlanAction,
  deleteTransformationPlanUrl,
  showPlanWizardEditModeAction,
  fetchTransformationMappingsAction,
  fetchTransformationMappingsUrl
}) => (
  <React.Fragment>
    <Grid.Col xs={12}>
      <Spinner loading={!!loading}>
        {notStartedPlans.length > 0 ? (
          <ListViewToolbar
            filterTypes={MIGRATIONS_FILTER_TYPES}
            sortFields={MIGRATIONS_NOT_STARTED_SORT_FIELDS}
            listItems={notStartedPlans}
          >
            {({
              filteredSortedPaginatedListItems,
              renderFilterControls,
              renderSortControls,
              renderActiveFilters,
              renderPaginationRow
            }) => (
              <React.Fragment>
                <Grid.Row>
                  <Toolbar>
                    {renderFilterControls()}
                    {renderSortControls()}
                    {renderActiveFilters(filteredSortedPaginatedListItems)}
                  </Toolbar>
                </Grid.Row>
                <ListViewTable className="plans-not-started-list" style={{ marginTop: 10 }}>
                  {filteredSortedPaginatedListItems.items.map(plan => {
                    const { migrationScheduled, migrationStarting, showInitialScheduleButton } = getPlanScheduleInfo(
                      plan
                    );
                    const isMissingMapping = !plan.infraMappingName;

                    const editPlanDisabled = loading === plan.href;

                    return (
                      <ListViewTable.Row
                        stacked
                        className="plans-not-started-list__list-item"
                        onClick={() => {
                          redirectTo(`/plan/${plan.id}`);
                        }}
                        actions={
                          <div>
                            {showInitialScheduleButton && (
                              <ScheduleMigrationButton
                                loading={loading}
                                toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                                plan={plan}
                                isMissingMapping={isMissingMapping}
                              />
                            )}
                            <Button
                              id={`migrate_${plan.id}`}
                              onClick={e => {
                                e.stopPropagation();
                                migrateClick(plan.href);
                              }}
                              disabled={
                                isMissingMapping || loading === plan.href || plan.schedule_type || migrationStarting
                              }
                            >
                              {__('Migrate')}
                            </Button>
                            <StopPropagationOnClick>
                              <DropdownKebab id={`${plan.id}-kebab`} pullRight>
                                <MenuItem
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (!editPlanDisabled) showPlanWizardEditModeAction(plan.id);
                                  }}
                                  disabled={editPlanDisabled}
                                >
                                  {__('Edit plan')}
                                </MenuItem>
                                <DeleteMigrationMenuItem
                                  showConfirmModalAction={showConfirmModalAction}
                                  hideConfirmModalAction={hideConfirmModalAction}
                                  deleteTransformationPlanAction={deleteTransformationPlanAction}
                                  deleteTransformationPlanUrl={deleteTransformationPlanUrl}
                                  addNotificationAction={addNotificationAction}
                                  fetchTransformationPlansAction={fetchTransformationPlansAction}
                                  fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                                  planId={plan.id}
                                  planName={plan.name}
                                  fetchTransformationMappingsAction={fetchTransformationMappingsAction}
                                  fetchTransformationMappingsUrl={fetchTransformationMappingsUrl}
                                />
                                {!showInitialScheduleButton && (
                                  <EditScheduleMenuItems
                                    showConfirmModalAction={showConfirmModalAction}
                                    hideConfirmModalAction={hideConfirmModalAction}
                                    loading={loading}
                                    toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                                    scheduleMigration={scheduleMigration}
                                    fetchTransformationPlansAction={fetchTransformationPlansAction}
                                    fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                                    plan={plan}
                                    isMissingMapping={isMissingMapping}
                                    migrationScheduled={migrationScheduled}
                                    migrationStarting={migrationStarting}
                                  />
                                )}
                              </DropdownKebab>
                            </StopPropagationOnClick>
                          </div>
                        }
                        heading={plan.name}
                        description={
                          <EllipsisWithTooltip id={plan.description}>
                            <React.Fragment>{plan.description}</React.Fragment>
                          </EllipsisWithTooltip>
                        }
                        additionalInfo={[
                          <NumVmsInfoItem key={`${plan.id}-numVms`} plan={plan} />,
                          <MappingNameInfoItem key={`${plan.id}-mappingName`} plan={plan} />,
                          <ScheduledTimeInfoItem
                            planId={plan.id}
                            migrationStarting={migrationStarting}
                            showScheduledTime={!!migrationScheduled}
                            migrationScheduled={migrationScheduled}
                          />
                        ]}
                        key={plan.id}
                      />
                    );
                  })}
                </ListViewTable>
                {renderPaginationRow(filteredSortedPaginatedListItems)}
              </React.Fragment>
            )}
          </ListViewToolbar>
        ) : (
          <ShowWizardEmptyState
            title={__('No Migration Plans Not Started')}
            iconType="pf"
            iconName="info"
            description={<span>{__('There are no existing migration plans in a Not Started state.')}</span>}
          />
        )}
      </Spinner>
    </Grid.Col>
    <ScheduleMigrationModal
      toggleScheduleMigrationModal={toggleScheduleMigrationModal}
      scheduleMigrationModal={scheduleMigrationModal}
      scheduleMigrationPlan={scheduleMigrationPlan}
      scheduleMigration={scheduleMigration}
      fetchTransformationPlansAction={fetchTransformationPlansAction}
      fetchTransformationPlansUrl={fetchTransformationPlansUrl}
    />
  </React.Fragment>
);

MigrationsNotStartedList.propTypes = {
  migrateClick: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  addNotificationAction: PropTypes.func,
  notStartedPlans: PropTypes.array,
  loading: PropTypes.string,
  redirectTo: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  deleteTransformationPlanAction: PropTypes.func,
  deleteTransformationPlanUrl: PropTypes.string,
  showPlanWizardEditModeAction: PropTypes.func,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationMappingsUrl: PropTypes.string
};
MigrationsNotStartedList.defaultProps = {
  migrateClick: noop,
  notStartedPlans: [],
  loading: ''
};

export default MigrationsNotStartedList;
