import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { Spinner, noop } from 'patternfly-react';

import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import MigrationFailedOverlay from './MigrationFailedOverlay';
import MappingNameInfoItem from './MappingNameInfoItem';
import NumVmsInfoItem from './NumVmsInfoItem';

const InProgressRow = ({ plan, numFailedVms, numTotalVms, onClick, additionalInfo, actions }) => (
  <ListViewTable.Row
    onClick={onClick || noop}
    stacked
    className={classNames('plans-in-progress-list__list-item', { clickable: !!onClick })}
    leftContent={<Spinner size="lg" loading />}
    heading={
      <React.Fragment>
        {numFailedVms > 0 && (
          <MigrationFailedOverlay plan={plan} numFailedVms={numFailedVms} numTotalVms={numTotalVms} />
        )}
        {plan.name}
      </React.Fragment>
    }
    description={<EllipsisWithTooltip>{plan.description}</EllipsisWithTooltip>}
    additionalInfo={[
      <MappingNameInfoItem key="mappingName" plan={plan} />,
      <NumVmsInfoItem key="numVms" plan={plan} />,
      ...additionalInfo
    ]}
    actions={actions}
  />
);

InProgressRow.propTypes = {
  plan: PropTypes.shape({ name: PropTypes.node, description: PropTypes.node }).isRequired,
  additionalInfo: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, PropTypes.object])).isRequired,
  onClick: PropTypes.func,
  numFailedVms: PropTypes.number,
  numTotalVms: PropTypes.number,
  actions: PropTypes.node
};

InProgressRow.defaultProps = {
  onClick: null,
  numFailedVms: 0,
  numTotalVms: 0,
  actions: <div />
};

export default InProgressRow;
