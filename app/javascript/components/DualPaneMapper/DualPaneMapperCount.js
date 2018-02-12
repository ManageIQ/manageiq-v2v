import React from 'react';
import PropTypes from 'prop-types';

const DualPaneMapperCount = ({ selectedItems, totalItems }) => (
  <div className="dual-pane-mapper-count">
    {selectedItems} {__('of')} {totalItems} {__('items selected')}
  </div>
);

DualPaneMapperCount.propTypes = {
  selectedItems: PropTypes.number,
  totalItems: PropTypes.number
};

export default DualPaneMapperCount;
