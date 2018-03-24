import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const MigrationsInProgress = ({ migrationsInProgress }) => (
  <Card className="overview-aggregate-card" accented aggregated matchHeight>
    <Card.Title>
      <Icon type="pf" name="migration" />
      <AggregateStatusCount>0</AggregateStatusCount> Migrations In Progress
    </Card.Title>
    {migrationsInProgress && (
      <Card.Body className="overview-aggregate-card--body">
        <AggregateStatusNotifications>
          <AggregateStatusNotification />
        </AggregateStatusNotifications>
      </Card.Body>
    )}
  </Card>
);

MigrationsInProgress.propTypes = {
  migrationsInProgress: PropTypes.array
};

export default MigrationsInProgress;
