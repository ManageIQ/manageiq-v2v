import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const ActiveTransformationPlans = ({ activePlans }) => {
  const countDescription =
    activePlans.length === 1
      ? 'Migration Plan In Progress'
      : 'Migration Plans In Progress';

  const erroredPlans = activePlans.filter(plan => {
    const [mostRecentRequest] = plan.miq_requests.slice(-1);
    return mostRecentRequest.miq_request_tasks.some(
      task =>
        task.options.progress.current_description ===
        '<PLAN_REQUEST_TASK_FAILED>'
    );
  });

  return (
    <Card className="overview-aggregate-card" accented aggregated matchHeight>
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
    </Card>
  );
};

ActiveTransformationPlans.propTypes = {
  activePlans: PropTypes.array
};

export default ActiveTransformationPlans;
