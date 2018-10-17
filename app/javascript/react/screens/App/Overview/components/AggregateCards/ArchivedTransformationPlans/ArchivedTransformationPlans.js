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

const ArchivedTransformationPlans = ({ archivedPlans, loading }) => {
  const countDescription = archivedPlans.length === 1 ? __('Migration Plan Archived') : __('Migration Plans Archived');

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
        <Card.Title>
          <AggregateStatusCount>{archivedPlans.length}</AggregateStatusCount> {countDescription}
        </Card.Title>
        {archivedPlans.length > 0 && (
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

ArchivedTransformationPlans.propTypes = {
  archivedPlans: PropTypes.array,
  loading: PropTypes.bool
};

export default ArchivedTransformationPlans;
