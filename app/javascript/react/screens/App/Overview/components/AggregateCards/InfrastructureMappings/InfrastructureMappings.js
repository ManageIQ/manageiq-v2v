import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const InfrastructureMappings = ({ infrastructureMappings }) => (
  <Card className="overview-aggregate-card" accented aggregated matchHeight>
    <Card.Title>
      <Icon type="pf" name="infrastructure" />
      <AggregateStatusCount>0</AggregateStatusCount> Infrastructure Mappings
    </Card.Title>
    {infrastructureMappings && (
      <Card.Body className="overview-aggregate-card--body">
        <AggregateStatusNotifications>
          <AggregateStatusNotification />
        </AggregateStatusNotifications>
      </Card.Body>
    )}
  </Card>
);

InfrastructureMappings.propTypes = {
  infrastructureMappings: PropTypes.array
};

export default InfrastructureMappings;
