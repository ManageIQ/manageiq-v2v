import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const DualPaneMapperList = ({ children, listTitle }) => {
  const childrenArray = React.Children.toArray(children);

  const counter = childrenArray.find(
    child => child.type.name === 'DualPaneMapperCount'
  );

  const listItems =
    counter &&
    childrenArray.filter(child => child.type.name === 'DualPaneMapperListItem');

  const classes = cx('dual-pane-mapper-items-container', {
    'has-counter': counter
  });

  return (
    <div className="dual-pane-mapper-list-container">
      <div className="dual-pane-mapper-list">
        <label htmlFor="availableTitle">
          <span id="listTitle">{listTitle}</span>
        </label>
        {counter ? (
          <div className={classes}>{listItems}</div>
        ) : (
          <div className={classes}>{children}</div>
        )}
      </div>
      {counter && counter}
    </div>
  );
};

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string
};

export default DualPaneMapperList;
