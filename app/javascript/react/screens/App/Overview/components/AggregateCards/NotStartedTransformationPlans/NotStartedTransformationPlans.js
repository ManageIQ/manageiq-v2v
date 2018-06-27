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

const NotStartedTransformationPlans = ({ notStartedPlans, loading }) => {
  const countDescription =
    notStartedPlans.length === 1 ? __('Migration Plan Not Started') : __('Migration Plans Not Started');

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
        <Card.Title>
          <AggregateStatusCount>{notStartedPlans.length}</AggregateStatusCount> {countDescription}
        </Card.Title>
        {notStartedPlans.length > 0 && (
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

NotStartedTransformationPlans.propTypes = {
  notStartedPlans: PropTypes.array,
  loading: PropTypes.bool
};

export default NotStartedTransformationPlans;
