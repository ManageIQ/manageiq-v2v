import React from 'react';
import PropTypes from 'prop-types';
import { noop, Grid, Spinner, Toolbar } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import MigrationInProgressListItem from './MigrationInProgressListItem';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import ListViewToolbar from '../../../common/ListViewToolbar/ListViewToolbar';
import ScheduleMigrationModal from '../ScheduleMigrationModal/ScheduleMigrationModal';
import { MIGRATIONS_FILTER_TYPES, MIGRATIONS_IN_PROGRESS_SORT_FIELDS } from './MigrationsConstants';

const MigrationsInProgressList = ({
  activeTransformationPlans,
  serviceTemplatePlaybooks,
  allRequestsWithTasks,
  reloadCard,
  loading,
  redirectTo,
  fetchTransformationPlansAction,
  fetchTransformationPlansUrl,
  isFetchingTransformationPlans,
  isFetchingAllRequestsWithTasks,
  acknowledgeDeniedPlanRequestAction,
  isEditingPlanRequest,
  setMigrationsFilterAction,
  cancelPlanRequestAction,
  isCancellingPlanRequest,
  requestsProcessingCancellation,
  toggleScheduleMigrationModal,
  scheduleMigrationModal,
  scheduleMigrationPlan,
  scheduleMigration,
  scheduleMigrationNow,
  scheduleCutover
}) => (
  <React.Fragment>
    <Grid.Col xs={12} id="progress-bar-items">
      <Spinner loading={!!loading}>
        {activeTransformationPlans.length > 0 && allRequestsWithTasks.length > 0 ? (
          <ListViewToolbar
            filterTypes={MIGRATIONS_FILTER_TYPES}
            sortFields={MIGRATIONS_IN_PROGRESS_SORT_FIELDS}
            listItems={activeTransformationPlans}
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
                <ListViewTable className="plans-in-progress-list" style={{ marginTop: 10 }}>
                  {filteredSortedPaginatedListItems.items.map(plan => (
                    <MigrationInProgressListItem
                      plan={plan}
                      serviceTemplatePlaybooks={serviceTemplatePlaybooks}
                      allRequestsWithTasks={allRequestsWithTasks}
                      reloadCard={reloadCard}
                      key={plan.id}
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
                      loading={loading}
                      toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                    />
                  ))}
                </ListViewTable>
                {renderPaginationRow(filteredSortedPaginatedListItems)}
              </React.Fragment>
            )}
          </ListViewToolbar>
        ) : (
          <ShowWizardEmptyState
            title={__('No Migration Plans In Progress')}
            iconType="pf"
            iconName="info"
            description={<span>{__('There are no existing migration plans in an In Progress state.')}</span>}
          />
        )}
      </Spinner>
    </Grid.Col>
    <ScheduleMigrationModal
      toggleScheduleMigrationModal={toggleScheduleMigrationModal}
      scheduleMigrationModal={scheduleMigrationModal}
      scheduleMigrationPlan={scheduleMigrationPlan}
      scheduleMigration={scheduleMigration}
      scheduleMigrationNow={scheduleMigrationNow}
      scheduleCutover={scheduleCutover}
      fetchTransformationPlansAction={fetchTransformationPlansAction}
      fetchTransformationPlansUrl={fetchTransformationPlansUrl}
    />
  </React.Fragment>
);

MigrationsInProgressList.propTypes = {
  activeTransformationPlans: PropTypes.array,
  serviceTemplatePlaybooks: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  reloadCard: PropTypes.bool,
  loading: PropTypes.bool,
  redirectTo: PropTypes.func,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  isFetchingTransformationPlans: PropTypes.bool,
  isFetchingAllRequestsWithTasks: PropTypes.bool,
  acknowledgeDeniedPlanRequestAction: PropTypes.func,
  isEditingPlanRequest: PropTypes.bool,
  setMigrationsFilterAction: PropTypes.func,
  cancelPlanRequestAction: PropTypes.func,
  isCancellingPlanRequest: PropTypes.bool,
  requestsProcessingCancellation: PropTypes.array,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func,
  scheduleMigrationNow: PropTypes.func,
  scheduleCutover: PropTypes.func
};

MigrationsInProgressList.defaultProps = {
  activeTransformationPlans: [],
  serviceTemplatePlaybooks: [],
  scheduleMigrationNow: noop
};

export default MigrationsInProgressList;
