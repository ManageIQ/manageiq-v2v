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

const InfrastructureMappings = ({ mappings, loading }) => {
  const countDescription = mappings.length === 1 ? __('Infrastructure Mapping') : __('Infrastructure Mappings');

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
        <Card.Title>
          <AggregateStatusCount>{mappings.length}</AggregateStatusCount> {countDescription}
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
      </Spinner>
    </Card>
  );
};

InfrastructureMappings.propTypes = {
  mappings: PropTypes.array,
  loading: PropTypes.bool
};

export default InfrastructureMappings;
