import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';

const ScheduledTimeInfoItem = ({ planId, migrationStarting, showScheduledTime, migrationScheduled }) =>
  migrationStarting ? (
    <ListViewTable.InfoItem key={`${planId}-starting`} style={{ textAlign: 'left' }}>
      {__('Migration in progress')}
    </ListViewTable.InfoItem>
  ) : showScheduledTime ? (
    <ListViewTable.InfoItem key={`${planId}-scheduledTime`} style={{ textAlign: 'left' }}>
      <Icon type="fa" name="clock-o" />
      {__('Migration scheduled')}
      <br />
      {formatDateTime(migrationScheduled)}
    </ListViewTable.InfoItem>
  ) : null;

ScheduledTimeInfoItem.propTypes = {
  planId: PropTypes.string,
  migrationStarting: PropTypes.bool,
  showScheduledTime: PropTypes.bool,
  migrationScheduled: PropTypes.number
};

export default ScheduledTimeInfoItem;
