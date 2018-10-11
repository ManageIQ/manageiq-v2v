import React from 'react';
import PropTypes from 'prop-types';

const MappingSource = ({ children, ...props }) => (
  <div className="infra-mapping-source-container">
    <div className="infra-mapping-item-source">{children}</div>
    <div className="arrow-wrapper">
      <div className="arrow-stem" />
      <div className="arrow-head" />
    </div>
  </div>
);
MappingSource.propTypes = {
  children: PropTypes.node
};
export default MappingSource;
