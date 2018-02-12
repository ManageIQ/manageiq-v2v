import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DualPaneMapperCount from './DualPaneMapperCount';

const DualPaneMapperList = ({
  children,
  listTitle,
  totalItems,
  selectedItems,
  hasCounter
}) => {
  const classes = cx('dual-pane-mapper-items-container', {
    'has-counter': hasCounter
  });

  return (
    <div className="dual-pane-mapper-list-container">
      <div className="dual-pane-mapper-list">
        <label htmlFor="availableTitle">
          <span id="listTitle">{listTitle}</span>
        </label>
        <div className={classes}>{children}</div>
      </div>
      {hasCounter && (
        <DualPaneMapperCount
          totalItems={totalItems}
          selectedItems={selectedItems}
        />
      )}
    </div>
  );
};

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string,
  totalItems: PropTypes.number,
  selectedItems: PropTypes.number,
  hasCounter: PropTypes.bool
};

DualPaneMapperList.defaultProps = {
  totalItems: null,
  selectedItems: 0,
  hasCounter: false
};

export default DualPaneMapperList;
