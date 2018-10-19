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

import { MIGRATIONS_FILTERS } from '../../../OverviewConstants';

const ArchivedTransformationPlans = ({ archivedPlans, loading, migrationsFilter, setMigrationsFilterAction }) => {
  const countDescription = archivedPlans.length === 1 ? __('Migration Plan Archived') : __('Migration Plans Archived');
  const active = migrationsFilter === MIGRATIONS_FILTERS.archived;
  const classes = cx('overview-aggregate-card', { 'is-loading': loading, active });

  return (
    <Card
      className={classes}
      accented
      aggregated
      matchHeight
      onClick={() => setMigrationsFilterAction(MIGRATIONS_FILTERS.archived)}
    >
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
  loading: PropTypes.bool,
  migrationsFilter: PropTypes.string,
  setMigrationsFilterAction: PropTypes.func
};

export default ArchivedTransformationPlans;
