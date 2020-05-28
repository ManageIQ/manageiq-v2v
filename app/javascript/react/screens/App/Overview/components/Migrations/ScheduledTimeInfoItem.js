import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';

const ScheduledTimeInfoItem = ({ planId, migrationStarting, showScheduledTime, migrationScheduled }) =>
  migrationStarting ? (
    <ListView.InfoItem key={`${planId}-starting`} style={{ textAlign: 'left' }}>
      {__('Migration in progress')}
    </ListView.InfoItem>
  ) : showScheduledTime ? (
    <ListView.InfoItem key={`${planId}-scheduledTime`} style={{ textAlign: 'left' }}>
      <Icon type="fa" name="clock-o" />
      {__('Migration scheduled')}
      <br />
      {formatDateTime(migrationScheduled)}
    </ListView.InfoItem>
  ) : null;

ScheduledTimeInfoItem.propTypes = {
  planId: PropTypes.string,
  migrationStarting: PropTypes.bool,
  showScheduledTime: PropTypes.bool,
  migrationScheduled: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default ScheduledTimeInfoItem;
