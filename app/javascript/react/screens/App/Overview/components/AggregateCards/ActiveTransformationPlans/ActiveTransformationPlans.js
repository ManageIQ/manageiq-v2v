import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification,
  Spinner
} from 'patternfly-react';

const ActiveTransformationPlans = ({
  activePlans,
  allRequestsWithTasks,
  loading
}) => {
  const countDescription =
    activePlans.length === 1
      ? 'Migration Plan In Progress'
      : 'Migration Plans In Progress';

  const erroredPlans = activePlans.filter(plan => {
    if (allRequestsWithTasks && allRequestsWithTasks.length > 0) {
      const requestsOfAssociatedPlan = allRequestsWithTasks.filter(
        request => request.source_id === plan.id
      );

      const mostRecentRequest =
        requestsOfAssociatedPlan.length > 0 &&
        requestsOfAssociatedPlan.reduce(
          (prev, current) =>
            prev.updated_on > current.updated_on ? prev : current
        );
      return (
        mostRecentRequest &&
        mostRecentRequest.miq_request_tasks.some(
          task => task.state === 'finished' && task.status === 'Error'
        )
      );
    }
    return [];
  });

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
        <Card.Title>
          <AggregateStatusCount>{activePlans.length}</AggregateStatusCount>{' '}
          {countDescription}
        </Card.Title>
        {activePlans.length > 0 && (
          <Card.Body className="overview-aggregate-card--body">
            <AggregateStatusNotifications>
              <AggregateStatusNotification>
                <Icon
                  type="pf"
                  name={erroredPlans.length > 0 ? 'error-circle-o' : 'ok'}
                />{' '}
                {erroredPlans.length > 0 && erroredPlans.length}
              </AggregateStatusNotification>
            </AggregateStatusNotifications>
          </Card.Body>
        )}
      </Spinner>
    </Card>
  );
};

ActiveTransformationPlans.propTypes = {
  activePlans: PropTypes.array,
  allRequestsWithTasks: PropTypes.array,
  loading: PropTypes.bool
};

export default ActiveTransformationPlans;
