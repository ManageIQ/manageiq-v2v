import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'patternfly-react';

const DualPaneMapper = ({ children, handleButtonClick, validMapping }) => (
  <div className="dual-pane-mapper-container">
    <div className="dual-pane-mapper">{children}</div>
    <Button bsStyle="primary" disabled={validMapping} onClick={handleButtonClick}>
      {__('Add Mapping')}
    </Button>
  </div>
);

DualPaneMapper.propTypes = {
  children: PropTypes.node,
  handleButtonClick: PropTypes.func,
  validMapping: PropTypes.bool
};

export default DualPaneMapper;
