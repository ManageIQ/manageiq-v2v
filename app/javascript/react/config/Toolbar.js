import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Grid } from 'patternfly-react';

const Toolbar = ({ navigation }) => (
  <Grid.Row className="toolbar-pf" style={{ paddingTop: 0 }}>
    <Grid.Col xs={12}>
      <Breadcrumb style={{ marginBottom: 8 }}>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">
          Compute
        </Breadcrumb.Item>
        <Breadcrumb.Item active>Migration</Breadcrumb.Item>
      </Breadcrumb>
    </Grid.Col>
  </Grid.Row>
);
Toolbar.propTypes = {
  navigation: PropTypes.string
};
Toolbar.defaultProps = {
  navigation: ''
};
export default Toolbar;
