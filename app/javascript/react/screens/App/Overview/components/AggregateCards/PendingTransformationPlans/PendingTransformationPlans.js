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

const PendingTransformationPlans = ({ pendingPlans, loading }) => {
  const countDescription =
    pendingPlans.length === 1
      ? 'Migration Plan Not Started'
      : 'Migration Plans Not Started';

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
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
      </Spinner>
    </Card>
  );
};

PendingTransformationPlans.propTypes = {
  pendingPlans: PropTypes.array,
  loading: PropTypes.bool
};

export default PendingTransformationPlans;
