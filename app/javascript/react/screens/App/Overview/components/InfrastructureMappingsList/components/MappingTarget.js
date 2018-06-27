import React from 'react';
import PropTypes from 'prop-types';

const MappingTarget = ({ children, ...props }) => <div className="infra-mapping-item-target">{children}</div>;
MappingTarget.propTypes = {
  children: PropTypes.node
};
export default MappingTarget;
