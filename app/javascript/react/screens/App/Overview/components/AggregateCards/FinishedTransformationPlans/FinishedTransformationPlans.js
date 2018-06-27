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
import getMostRecentRequest from '../../../../common/getMostRecentRequest';

const FinishedTransformationPlans = ({ finishedPlans, loading }) => {
  const countDescription = finishedPlans.length === 1 ? __('Migration Plan Complete') : __('Migration Plans Complete');

  const failedPlans = finishedPlans.filter(plan => {
    const mostRecentRequest = plan.miq_requests.length > 0 && getMostRecentRequest(plan.miq_requests);
    return mostRecentRequest.status === 'Error';
  });

  const classes = cx('overview-aggregate-card', { 'is-loading': loading });

  return (
    <Card className={classes} accented aggregated matchHeight>
      <Spinner loading={loading}>
        <Card.Title>
          <AggregateStatusCount>{finishedPlans.length}</AggregateStatusCount> {countDescription}
        </Card.Title>
        {finishedPlans.length > 0 && (
          <Card.Body className="overview-aggregate-card--body">
            <AggregateStatusNotifications>
              <AggregateStatusNotification>
                <Icon type="pf" name={failedPlans.length > 0 ? 'error-circle-o' : 'ok'} />{' '}
                {failedPlans.length > 0 && failedPlans.length}
              </AggregateStatusNotification>
            </AggregateStatusNotifications>
          </Card.Body>
        )}
      </Spinner>
    </Card>
  );
};

FinishedTransformationPlans.propTypes = {
  finishedPlans: PropTypes.array,
  loading: PropTypes.bool
};

export default FinishedTransformationPlans;
