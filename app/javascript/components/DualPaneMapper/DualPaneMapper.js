import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'patternfly-react';

const DualPaneMapper = ({ children }) => (
  <div className="dual-pane-mapper-container">
    <div className="dual-pane-mapper">{children}</div>
    <Button>Add Mapping</Button>
  </div>
);

DualPaneMapper.propTypes = {
  children: PropTypes.node
};

export default DualPaneMapper;
