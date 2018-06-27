import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, ListView, Grid, Spinner, Icon } from 'patternfly-react';
import { IsoElapsedTime } from '../../../../../../components/dates/IsoElapsedTime';
import OverviewEmptyState from '../OverviewEmptyState/OverviewEmptyState';
import getMostRecentRequest from '../../../common/getMostRecentRequest';

const MigrationsCompletedList = ({
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
  archived
}) => (
  <Grid.Col xs={12}>
    <Spinner loading={!!loading}>
      {finishedTransformationPlans.length > 0 ? (
        <ListView className="plans-complete-list" style={{ marginTop: 0 }}>
          {finishedTransformationPlans.map(plan => {
            const requestsOfAssociatedPlan = allRequestsWithTasks.filter(
              request => request.source_id === plan.id
            );

            const mostRecentRequest =
              requestsOfAssociatedPlan.length > 0 &&
              getMostRecentRequest(requestsOfAssociatedPlan);

            const failed =
              mostRecentRequest && mostRecentRequest.status === 'Error';

            const tasks = {};
            mostRecentRequest.miq_request_tasks.forEach(task => {
              tasks[task.source_id] = task.status === 'Ok';
            });

            let succeedCount = 0;
            Object.keys(tasks).forEach(key => {
              if (tasks[key]) succeedCount += 1;
            });

            const elapsedTime = IsoElapsedTime(
              new Date(
                mostRecentRequest && mostRecentRequest.options.delivered_on
              ),
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
                    {__(
                      'This plan includes VMs that failed to migrate. If you archive the plan, you will not be able to retry the failed migrations.'
                    )}
                  </p>
                )}
              </React.Fragment>
            );

            const confirmModalBaseProps = {
              title: __('Archive Migration Plan'),
              body: archiveMigrationWarningText,
              icon: failed && (
                <Icon
                  className="confirm-warning-icon"
                  type="pf"
                  name="warning-triangle-o"
                />
              ),
              confirmButtonLabel: __('Archive')
            };

            const onConfirm = () => {
              showConfirmModalAction({
                ...confirmModalBaseProps,
                disableCancelButton: true,
                disableConfirmButton: true
              });
              archiveTransformationPlanAction(
                archiveTransformationPlanUrl,
                plan.id
              )
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

            return (
              <ListView.Item
                className="plans-complete-list__list-item"
                onClick={() => {
                  redirectTo(`/migration/plan/${plan.id}`);
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
                  <ListView.InfoItem
                    key={`${plan.id}-migrated`}
                    style={{ paddingRight: 40 }}
                  >
                    <ListView.Icon type="pf" size="lg" name="screen" />&nbsp;<strong
                    >
                      {succeedCount}
                    </strong>{' '}
                    {__('of')} &nbsp;<strong>
                      {Object.keys(tasks).length}{' '}
                    </strong>
                    {__('VMs successfully migrated.')}
                  </ListView.InfoItem>,
                  <ListView.InfoItem key={`${plan.id}-elapsed`}>
                    <ListView.Icon type="fa" size="lg" name="clock-o" />
                    {elapsedTime}
                  </ListView.InfoItem>
                ]}
                actions={
                  !archived && (
                    <React.Fragment>
                      {failed && (
                        <Button
                          onClick={e => {
                            e.stopPropagation();
                            retryClick(plan.href, plan.id);
                          }}
                          disabled={loading === plan.href}
                        >
                          {__('Retry')}
                        </Button>
                      )}
                      <Button
                        onClick={e => {
                          e.stopPropagation();
                          showConfirmModalAction(confirmModalOptions);
                        }}
                      >
                        {__('Archive')}
                      </Button>
                    </React.Fragment>
                  )
                }
              />
            );
          })}
        </ListView>
      ) : (
        <OverviewEmptyState
          title={
            archived
              ? __('No Archived Migration Plans')
              : __('No Completed Migration Plans')
          }
          iconType="pf"
          iconName="info"
          description={
            <span>
              {archived
                ? __(
                    'There are no exisitng migration plans in an Archived state.'
                  )
                : __(
                    'There are no existing migration plans in a Completed state.'
                  )}
              <br />{' '}
              {__(
                'Make a selection in the dropdown to view plans in other states.'
              )}
            </span>
          }
        />
      )}
    </Spinner>
  </Grid.Col>
);

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
  addNotificationAction: PropTypes.func
};
MigrationsCompletedList.defaultProps = {
  finishedTransformationPlans: [],
  retryClick: noop,
  loading: ''
};

export default MigrationsCompletedList;
