import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const FinishedTransformationPlans = ({ finishedPlans }) => {
  const countDescription =
    finishedPlans.length === 1
      ? 'Migration Plan Complete'
      : 'Migration Plans Complete';

  const failedPlans = finishedPlans.filter(plan => {
    const [mostRecentRequest] = plan.miq_requests.slice(-1);
    return mostRecentRequest.status === 'failed';
  });

  return (
    <Card className="overview-aggregate-card" accented aggregated matchHeight>
      <Card.Title>
        <AggregateStatusCount>{finishedPlans.length}</AggregateStatusCount>{' '}
        {countDescription}
      </Card.Title>
      {finishedPlans.length > 0 && (
        <Card.Body className="overview-aggregate-card--body">
          <AggregateStatusNotifications>
            <AggregateStatusNotification>
              <Icon
                type="pf"
                name={failedPlans.length > 0 ? 'error-circle-o' : 'ok'}
              />{' '}
              {failedPlans.length > 0 && failedPlans.length}
            </AggregateStatusNotification>
          </AggregateStatusNotifications>
        </Card.Body>
      )}
    </Card>
  );
};

FinishedTransformationPlans.propTypes = {
  finishedPlans: PropTypes.array
};

export default FinishedTransformationPlans;
