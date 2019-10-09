import React from 'react';
import PropTypes from 'prop-types';
import EllipsisWithTooltip from 'react-ellipsis-with-tooltip';
import { Spinner } from 'patternfly-react';

import ListViewTable from '../../../common/ListViewTable/ListViewTable';
import MigrationFailedOverlay from './MigrationFailedOverlay';
import MappingNameInfoItem from './MappingNameInfoItem';
import NumVmsInfoItem from './NumVmsInfoItem';

const InProgressRow = ({ plan, numFailedVms, numTotalVms, additionalInfo, actions }) => (
  <ListViewTable.Row
    stacked
    className="plans-in-progress-list__list-item"
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
  numFailedVms: PropTypes.number,
  numTotalVms: PropTypes.number,
  additionalInfo: PropTypes.arrayOf(PropTypes.node).isRequired,
  actions: PropTypes.node
};

InProgressRow.defaultProps = {
  numFailedVms: 0,
  numTotalVms: 0,
  actions: <div />
};

export default InProgressRow;
