import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Spinner, Icon, Toolbar, Sort, DropdownKebab, MenuItem } from 'patternfly-react';
import { IsoElapsedTime } from '../../../../../../components/dates/IsoElapsedTime';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import getMostRecentRequest from '../../../common/getMostRecentRequest';
import getMostRecentVMTasksFromRequests from './helpers/getMostRecentVMTasksFromRequests';
import sortFilter from '../../../Plan/components/sortFilter';
import { MIGRATIONS_COMPLETED_SORT_FIELDS } from './MigrationsConstants';
import ScheduleMigrationButton from './ScheduleMigrationButton';
import ScheduleMigrationModal from '../ScheduleMigrationModal/ScheduleMigrationModal';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';

class MigrationsCompletedList extends React.Component {
  state = {
    sortFields: MIGRATIONS_COMPLETED_SORT_FIELDS,
    currentSortType: MIGRATIONS_COMPLETED_SORT_FIELDS[0],
    isSortNumeric: MIGRATIONS_COMPLETED_SORT_FIELDS[0].isNumeric,
    isSortAscending: true
  };

  sortedMigrations = () => {
    const { currentSortType, isSortNumeric, isSortAscending } = this.state;
    const { finishedTransformationPlans } = this.props;

    return sortFilter(currentSortType, isSortNumeric, isSortAscending, finishedTransformationPlans);
  };

  toggleCurrentSortDirection = () => {
    this.setState(prevState => ({
      isSortAscending: !prevState.isSortAscending
    }));
  };

  updateCurrentSortType = sortType => {
    const { currentSortType } = this.state;
    if (currentSortType !== sortType) {
      this.setState({
        currentSortType: sortType,
        isSortNumeric: sortType.isNumeric,
        isSortAscending: true
      });
    }
  };

  render() {
    const { sortFields, currentSortType, isSortNumeric, isSortAscending } = this.state;
    const {
      finishedTransformationPlans,
      allRequestsWithTasks,
      retryClick,
      loading,
      redirectTo,
      showConfirmModalAction,
      hideConfirmModalAction,
      archiveTransformationPlanAction,
      archiveTransformationPlanUrl,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      addNotificationAction,
      archived,
      toggleScheduleMigrationModal,
      scheduleMigrationModal,
      scheduleMigrationPlan,
      scheduleMigration
    } = this.props;
    const sortedMigrations = this.sortedMigrations();

    return (
      <React.Fragment>
        <Grid.Col xs={12}>
          <Spinner loading={!!loading}>
            {finishedTransformationPlans.length > 0 ? (
              <React.Fragment>
                {!archived && (
                  <React.Fragment>
                    <Grid.Row>
                      <Toolbar>
                        <Sort>
                          <Sort.TypeSelector
                            sortTypes={sortFields}
                            currentSortType={currentSortType}
                            onSortTypeSelected={this.updateCurrentSortType}
                          />
                          <Sort.DirectionSelector
                            isNumeric={isSortNumeric}
                            isAscending={isSortAscending}
                            onClick={this.toggleCurrentSortDirection}
                          />
                        </Sort>
                      </Toolbar>
                    </Grid.Row>
                  </React.Fragment>
                )}
                <ListView className="plans-complete-list" style={{ marginTop: 0 }}>
                  {sortedMigrations.map(plan => {
                    const migrationScheduled = plan.schedules && plan.schedules[0].run_at.start_time;
                    const staleMigrationSchedule = (new Date(migrationScheduled).getTime() || 0) < Date.now();

                    const requestsOfAssociatedPlan = allRequestsWithTasks.filter(
                      request => request.source_id === plan.id
                    );

                    const mostRecentRequest =
                      requestsOfAssociatedPlan.length > 0 && getMostRecentRequest(requestsOfAssociatedPlan);

                    const failed = mostRecentRequest && mostRecentRequest.status === 'Error';

                    const tasks = {};
                    let tasksOfPlan = {};
                    if (requestsOfAssociatedPlan.length > 0) {
                      tasksOfPlan = getMostRecentVMTasksFromRequests(
                        requestsOfAssociatedPlan,
                        plan.options.config_info.actions
                      );
                      tasksOfPlan.forEach(task => {
                        tasks[task.source_id] = task.status === 'Ok';
                      });
                    } else if (mostRecentRequest) {
                      mostRecentRequest.miq_request_tasks.forEach(task => {
                        tasks[task.source_id] = task.status === 'Ok';
                      });
                    }
                    let succeedCount = 0;
                    Object.keys(tasks).forEach(key => {
                      if (tasks[key]) succeedCount += 1;
                    });

                    const elapsedTime = IsoElapsedTime(
                      new Date(mostRecentRequest && mostRecentRequest.options.delivered_on),
                      new Date(mostRecentRequest && mostRecentRequest.fulfilled_on)
                    );

                    const archiveMigrationWarningText = (
                      <React.Fragment>
                        <p>
                          {__('Are you sure you want to archive migration plan ')}
                          <strong>{plan.name}</strong>?
                        </p>
                        {failed && (
                          <p>
                            {__('This plan includes VMs that failed to migrate. If you archive the plan, you will not be able to retry the failed migrations.') // prettier-ignore
                            }
                          </p>
                        )}
                      </React.Fragment>
                    );

                    const confirmModalBaseProps = {
                      title: __('Archive Migration Plan'),
                      body: archiveMigrationWarningText,
                      icon: failed && <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
                      confirmButtonLabel: __('Archive')
                    };

                    const onConfirm = () => {
                      showConfirmModalAction({
                        ...confirmModalBaseProps,
                        disableCancelButton: true,
                        disableConfirmButton: true
                      });
                      archiveTransformationPlanAction(archiveTransformationPlanUrl, plan.id)
                        .then(() => {
                          addNotificationAction({
                            message: sprintf(__('%s successfully archived'), plan.name),
                            notificationType: 'success',
                            persistent: false
                          });

                          return fetchTransformationPlansAction({
                            url: fetchTransformationPlansUrl,
                            archived: false
                          });
                        })
                        .then(() => {
                          hideConfirmModalAction();
                        });
                    };

                    const confirmModalOptions = {
                      ...confirmModalBaseProps,
                      onConfirm
                    };

                    const isMissingMapping = !plan.infraMappingName;

                    return (
                      <ListView.Item
                        stacked
                        className="plans-complete-list__list-item"
                        onClick={e => {
                          e.stopPropagation();

                          redirectTo(`/plan/${plan.id}`);
                        }}
                        key={plan.id}
                        leftContent={
                          archived ? (
                            <ListView.Icon
                              type="fa"
                              name="archive"
                              size="md"
                              style={{
                                width: 'inherit',
                                backgroundColor: 'transparent',
                                border: 'none'
                              }}
                            />
                          ) : (
                            <ListView.Icon
                              type="pf"
                              name={failed ? 'error-circle-o' : 'ok'}
                              size="md"
                              style={{
                                width: 'inherit',
                                backgroundColor: 'transparent'
                              }}
                            />
                          )
                        }
                        heading={plan.name}
                        description={plan.description}
                        additionalInfo={[
                          <ListView.InfoItem key={`${plan.id}-migrated`} style={{ paddingRight: 40 }}>
                            <ListView.Icon type="pf" size="lg" name="screen" />
                            &nbsp;
                            <strong>{succeedCount}</strong> {__('of')} &nbsp;
                            <strong>{Object.keys(tasks).length} </strong>
                            {__('VMs successfully migrated.')}
                          </ListView.InfoItem>,
                          plan.infraMappingName ? (
                            <ListView.InfoItem key={`${plan.id}-infraMappingName`}>
                              {plan.infraMappingName}
                            </ListView.InfoItem>
                          ) : (
                            <ListView.InfoItem key={`${plan.id}-infraMappingWarning`}>
                              <Icon type="pf" name="warning-triangle-o" /> {__('Infrastructure mapping does not exist')}
                            </ListView.InfoItem>
                          ),
                          <ListView.InfoItem key={`${plan.id}-elapsed`}>
                            <ListView.Icon type="fa" size="lg" name="clock-o" />
                            {elapsedTime}
                          </ListView.InfoItem>,
                          migrationScheduled &&
                            !staleMigrationSchedule && (
                              <ListView.InfoItem key={plan.id + 1} style={{ textAlign: 'left' }}>
                                <Icon type="fa" name="clock-o" />
                                {__(`Migration scheduled`)}
                                <br />
                                {formatDateTime(migrationScheduled)}
                              </ListView.InfoItem>
                            )
                        ]}
                        actions={
                          !archived && (
                            // eslint-disable-next-line
                            <div onClick={e => e.stopPropagation()}>
                              {failed && (
                                <React.Fragment>
                                  <ScheduleMigrationButton
                                    showConfirmModalAction={showConfirmModalAction}
                                    hideConfirmModalAction={hideConfirmModalAction}
                                    loading={loading}
                                    toggleScheduleMigrationModal={toggleScheduleMigrationModal}
                                    scheduleMigration={scheduleMigration}
                                    fetchTransformationPlansAction={fetchTransformationPlansAction}
                                    fetchTransformationPlansUrl={fetchTransformationPlansUrl}
                                    plan={plan}
                                    isMissingMapping={isMissingMapping}
                                  />
                                  <Button
                                    onClick={e => {
                                      e.stopPropagation();
                                      retryClick(plan.href, plan.id);
                                    }}
                                    disabled={isMissingMapping || loading === plan.href}
                                  >
                                    {__('Retry')}
                                  </Button>
                                </React.Fragment>
                              )}
                              <DropdownKebab id={`${plan.id}-kebab`} pullRight>
                                <MenuItem
                                  onClick={e => {
                                    e.stopPropagation();
                                    showConfirmModalAction(confirmModalOptions);
                                  }}
                                >
                                  {__('Archive')}
                                </MenuItem>
                              </DropdownKebab>
                            </div>
                          )
                        }
                      />
                    );
                  })}
                </ListView>
              </React.Fragment>
            ) : (
              <OverviewEmptyState
                title={archived ? __('No Archived Migration Plans') : __('No Completed Migration Plans')}
                iconType="pf"
                iconName="info"
                description={
                  <span>
                    {archived
                      ? __('There are no exisitng migration plans in an Archived state.')
                      : __('There are no existing migration plans in a Completed state.')}
                    <br /> {__('Make a selection in the dropdown to view plans in other states.')}
                  </span>
                }
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
  }
}

MigrationsCompletedList.propTypes = {
  finishedTransformationPlans: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  retryClick: PropTypes.func,
  loading: PropTypes.string,
  redirectTo: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  archived: PropTypes.bool,
  archiveTransformationPlanAction: PropTypes.func,
  archiveTransformationPlanUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  addNotificationAction: PropTypes.func,
  toggleScheduleMigrationModal: PropTypes.func,
  scheduleMigrationModal: PropTypes.bool,
  scheduleMigrationPlan: PropTypes.object,
  scheduleMigration: PropTypes.func
};
MigrationsCompletedList.defaultProps = {
  finishedTransformationPlans: [],
  retryClick: noop,
  loading: ''
};

export default MigrationsCompletedList;
