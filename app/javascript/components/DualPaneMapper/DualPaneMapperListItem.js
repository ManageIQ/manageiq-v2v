import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DualPaneMapperListItem = ({ item, selected, handleClick }) => {
  const classes = cx('dual-pane-mapper-item', { selected });

  return (
    <div className={classes} onClick={() => handleClick(item)}>
      <div className="dual-pane-mapper-info">
        <span className="dual-pane-mapper-item-container">{item.name}</span>
        <span className="dual-pane-mapper-item-select-indicator fa fa-check" />
      </div>
    </div>
  );
};

DualPaneMapperListItem.propTypes = {
  item: PropTypes.object,
  selected: PropTypes.bool,
  handleClick: PropTypes.func
};

export default DualPaneMapperListItem;
