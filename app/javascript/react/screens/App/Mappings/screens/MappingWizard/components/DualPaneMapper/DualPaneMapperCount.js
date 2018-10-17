import React from 'react';
import PropTypes from 'prop-types';

const DualPaneMapperCount = ({ selectedItems, totalItems }) => {
  const message = totalItems === 1 ? __('%s of %s item selected') : __('%s of %s items selected');
  return <div className="dual-pane-mapper-count">{sprintf(message, selectedItems, totalItems)}</div>;
};

DualPaneMapperCount.propTypes = {
  selectedItems: PropTypes.number,
  totalItems: PropTypes.number
};

export default DualPaneMapperCount;
