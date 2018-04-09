import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Grid } from 'patternfly-react';

const Toolbar = ({ children }) => (
  <Grid.Row className="toolbar-pf" style={{ paddingTop: 0 }}>
    <Grid.Col xs={12}>
      <Breadcrumb style={{ marginBottom: 8 }}>{children}</Breadcrumb>
    </Grid.Col>
  </Grid.Row>
);
Toolbar.propTypes = {
  children: PropTypes.node
};
Toolbar.defaultProps = {
  children: null
};
export default Toolbar;
