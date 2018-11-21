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
import { MIGRATIONS_FILTERS } from '../../../OverviewConstants';

const FinishedTransformationPlans = ({ finishedPlans, loading, migrationsFilter, setMigrationsFilterAction }) => {
  const countDescription = finishedPlans.length === 1 ? __('Migration Plan Complete') : __('Migration Plans Complete');
  const active = migrationsFilter === MIGRATIONS_FILTERS.completed;
  const failedPlans = finishedPlans.filter(plan => {
    const mostRecentRequest = plan.miq_requests.length > 0 && getMostRecentRequest(plan.miq_requests);
    return mostRecentRequest.status === 'Error' || mostRecentRequest.status === 'Denied';
  });

  const classes = cx('overview-aggregate-card', { 'is-loading': loading, active });

  return (
    <Card
      className={classes}
      accented
      aggregated
      matchHeight
      onClick={() => setMigrationsFilterAction(MIGRATIONS_FILTERS.completed)}
    >
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
  loading: PropTypes.bool,
  migrationsFilter: PropTypes.string,
  setMigrationsFilterAction: PropTypes.func
};

export default FinishedTransformationPlans;
