import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DualPaneMapperListItem = ({ displayText }) => {
  const classes = cx('dual-pane-mapper-item', { selected: true });

  return (
    <div className={classes}>
      <div className="dual-pane-mapper-info">
        <span className="dual-pane-mapper-item-container">{displayText}</span>
        <span className="dual-pane-mapper-item-select-indicator fa fa-check" />
      </div>
    </div>
  );
};

DualPaneMapperListItem.propTypes = {
  displayText: PropTypes.string
};

export default DualPaneMapperListItem;
