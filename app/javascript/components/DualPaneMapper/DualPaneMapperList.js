import React from 'react';
import PropTypes from 'prop-types';

const DualPaneMapperList = ({ children, listTitle }) => (
  <div className="dual-pane-mapper-list-container">
    <div className="dual-pane-mapper-list">
      <label htmlFor="availableTitle">
        <span id="listTitle">{listTitle}</span>
      </label>
      <div className="dual-pane-mapper-items-container">{children}</div>
      <label
        className="dual-pane-mapper-count-text"
        htmlFor="selectedListItems"
      >
        <span id="selectedListItems">
          {/* {DualPaneSelector.labelText(this.state.selectedAvailableItems)} */}
        </span>
      </label>
    </div>
  </div>
);

DualPaneMapperList.propTypes = {
  children: PropTypes.node,
  listTitle: PropTypes.string
};

export default DualPaneMapperList;
