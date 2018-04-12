import React from 'react';
import PropTypes from 'prop-types';

import {
  Icon,
  Card,
  AggregateStatusCount,
  AggregateStatusNotifications,
  AggregateStatusNotification
} from 'patternfly-react';

const InfrastructureMappings = ({ mappings }) => {
  const countDescription =
    mappings.length === 1
      ? 'Infrastructure Mapping'
      : 'Infrastructure Mappings';

  return (
    <Card className="overview-aggregate-card" accented aggregated matchHeight>
      <Card.Title>
        <AggregateStatusCount>{mappings.length}</AggregateStatusCount>{' '}
        {countDescription}
      </Card.Title>
      {mappings.length > 0 && (
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

InfrastructureMappings.propTypes = {
  mappings: PropTypes.array
};

export default InfrastructureMappings;
