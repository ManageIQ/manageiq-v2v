import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const MigrationsComplete = ({ migrationsComplete }) => (
  <Card className="overview-aggregate-card" accented aggregated matchHeight>
    <Card.Title>
      <Icon type="pf" name="migration" />
      <AggregateStatusCount>0</AggregateStatusCount> Migrations Complete
    </Card.Title>
    {migrationsComplete && (
      <Card.Body className="overview-aggregate-card--body">
        <AggregateStatusNotifications>
          <AggregateStatusNotification />
        </AggregateStatusNotifications>
      </Card.Body>
    )}
  </Card>
);

MigrationsComplete.propTypes = {
  migrationsComplete: PropTypes.array
};

export default MigrationsComplete;
