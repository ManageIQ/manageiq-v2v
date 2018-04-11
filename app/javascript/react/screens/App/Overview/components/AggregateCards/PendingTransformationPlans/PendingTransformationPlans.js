import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const PendingTransformationPlans = ({ pendingPlans }) => {
  const countDescription =
    pendingPlans.length === 1
      ? 'Migration Plan Not Started'
      : 'Migration Plans Not Started';

  return (
    <Card className="overview-aggregate-card" accented aggregated matchHeight>
      <Card.Title>
        <AggregateStatusCount>{pendingPlans.length}</AggregateStatusCount>{' '}
        {countDescription}
      </Card.Title>
      {pendingPlans.length > 0 && (
        <Card.Body className="overview-aggregate-card--body">
          <AggregateStatusNotifications>
            <AggregateStatusNotification>
              <Icon type="pf" name="ok" />
            </AggregateStatusNotification>
          </AggregateStatusNotifications>
        </Card.Body>
      )}
    </Card>
  );
};

PendingTransformationPlans.propTypes = {
  pendingPlans: PropTypes.array
};

export default PendingTransformationPlans;
