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
import getMostRecentRequest from '../../../../common/getMostRecentRequest';

const ActiveTransformationPlans = ({
  activePlans,
  allRequestsWithTasks,
  reloadCard,
  loading
}) => {
  const countDescription =
    activePlans.length === 1
      ? __('Migration Plan In Progress')
      : __('Migration Plans In Progress');

  const erroredPlans = activePlans.filter(plan => {
    if (allRequestsWithTasks && allRequestsWithTasks.length > 0) {
      const requestsOfAssociatedPlan = allRequestsWithTasks.filter(
        request => request.source_id === plan.id
      );
      const mostRecentRequest =
        requestsOfAssociatedPlan.length > 0 &&
        getMostRecentRequest(requestsOfAssociatedPlan);
      return (
        mostRecentRequest &&
        mostRecentRequest.miq_request_tasks.some(
          task => task.state === 'finished' && task.status === 'Error'
        )
      );
    }
    return [];
  });

  let erroredPlansLen = erroredPlans.length;
  if (erroredPlansLen > 0 && reloadCard) {
    erroredPlansLen -= 1;
  }

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
                  name={erroredPlansLen > 0 ? 'error-circle-o' : 'ok'}
                />{' '}
                {erroredPlansLen > 0 && erroredPlansLen}
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
  reloadCard: PropTypes.bool,
  loading: PropTypes.bool
};

export default ActiveTransformationPlans;
