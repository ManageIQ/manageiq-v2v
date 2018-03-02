import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DualPaneMapperListItem = ({
  item,
  text,
  selected,
  handleClick,
  handleKeyPress
}) => {
  const classes = cx('dual-pane-mapper-item', { selected });

  return (
    <div
      className={classes}
      onClick={() => handleClick(item)}
      onKeyPress={() => handleKeyPress(item)}
      tabIndex="0"
      aria-selected={selected}
      role="option"
    >
      <div className="dual-pane-mapper-info">
        <span className="dual-pane-mapper-item-container">{text}</span>
        <span className="dual-pane-mapper-item-select-indicator fa fa-check" />
      </div>
    </div>
  );
};

DualPaneMapperListItem.propTypes = {
  item: PropTypes.object,
  text: PropTypes.string,
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  handleKeyPress: PropTypes.func
};

export default DualPaneMapperListItem;
