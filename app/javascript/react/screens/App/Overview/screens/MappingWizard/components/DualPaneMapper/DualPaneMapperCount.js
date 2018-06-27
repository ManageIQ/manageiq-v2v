import React from 'react';
import PropTypes from 'prop-types';

const DualPaneMapperCount = ({ selectedItems, totalItems }) => (
  <div className="dual-pane-mapper-count">{sprintf(__('%s of %s items selected'), selectedItems, totalItems)}</div>
);

DualPaneMapperCount.propTypes = {
  selectedItems: PropTypes.number,
  totalItems: PropTypes.number
};

export default DualPaneMapperCount;
