import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import { formatDateTime } from '../../../../../../components/dates/MomentDate';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';

// TODO we'll need to pass the plan request into here and use request.cutover_datetime instead of warm_migration_cutover_datetime
const CutoverTimeInfoItem = ({ plan }) => {
  if (
    !plan.options.config_info.warm_migration ||
    (plan.options.config_info.warm_migration && !plan.options.config_info.warm_migration_cutover_datetime)
  ) {
    return null;
  }

  return (
    <ListViewTable.InfoItem key={`${plan.id}-cutoverTime`} style={{ textAlign: 'left' }}>
      <Icon type="fa" name="clock-o" />
      {__('Cutover scheduled')}
      <br />
      {formatDateTime(plan.options.config_info.warm_migration_cutover_datetime)}
    </ListViewTable.InfoItem>
  );
};

CutoverTimeInfoItem.propTypes = {
  plan: PropTypes.object
};

export default CutoverTimeInfoItem;
