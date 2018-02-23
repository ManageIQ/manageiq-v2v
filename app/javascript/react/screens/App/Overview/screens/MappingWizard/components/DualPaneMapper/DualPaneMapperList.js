import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Spinner } from 'patternfly-react';

const DualPaneMapperList = ({ children, listTitle, loading }) => {
  const childrenArray = React.Children.toArray(children);

  const counter = childrenArray.find(
    child => child.type.name === 'DualPaneMapperCount'
  );

  const listItems =
    counter &&
    childrenArray.filter(child => child.type.name === 'DualPaneMapperListItem');

  const classes = cx('dual-pane-mapper-items-container', {
    'has-counter': counter,
    loading
  });

  return (
    <div className="dual-pane-mapper-list-container">
      <div className="dual-pane-mapper-list">
        <label htmlFor="availableTitle">
          <span id="listTitle">{listTitle}</span>
        </label>
        {counter ? (
          <div className={classes}>
            {loading ? <Spinner loading /> : listItems}
          </div>
        ) : (
          <div className={classes}>
            {loading ? <Spinner loading /> : children}
          </div>
        )}
      </div>
      {counter && counter}
    </div>
  );
};

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string,
  loading: PropTypes.bool
};

export default DualPaneMapperList;
