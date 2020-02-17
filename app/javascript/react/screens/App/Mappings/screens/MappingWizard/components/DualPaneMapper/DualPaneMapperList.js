import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Spinner } from 'patternfly-react';

const DualPaneMapperList = ({ children, listTitle, loading, id, counter }) => {
  const classes = cx('dual-pane-mapper-items-container', {
    'has-counter': counter,
    loading
  });

  return (
    <div className="dual-pane-mapper-list-container">
      <label htmlFor="availableTitle">
        <span id="listTitle">{listTitle}</span>
      </label>
      <div className="dual-pane-mapper-list">
        <div className={classes} id={id}>
          {loading ? <Spinner loading /> : children}
        </div>
      </div>
      {counter && counter}
    </div>
  );
};

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string,
  id: PropTypes.string,
  loading: PropTypes.bool,
  counter: PropTypes.node
};

export default DualPaneMapperList;
