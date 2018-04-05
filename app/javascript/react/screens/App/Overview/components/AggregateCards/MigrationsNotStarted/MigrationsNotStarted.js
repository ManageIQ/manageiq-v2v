import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const MigrationsNotStarted = ({ migrationsNotStarted }) => (
  <Card className="overview-aggregate-card" accented aggregated matchHeight>
    <Card.Title>
      <Icon type="pf" name="pending" />
      <AggregateStatusCount>0</AggregateStatusCount> Migration Plans Not Started
    </Card.Title>
    {migrationsNotStarted && (
      <Card.Body className="overview-aggregate-card--body">
        <AggregateStatusNotifications>
          <AggregateStatusNotification />
        </AggregateStatusNotifications>
      </Card.Body>
    )}
  </Card>
);

MigrationsNotStarted.propTypes = {
  migrationsNotStarted: PropTypes.array
};

export default MigrationsNotStarted;
