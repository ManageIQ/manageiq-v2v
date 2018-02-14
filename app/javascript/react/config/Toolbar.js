import React from 'react';
import { Route } from 'react-router-dom';
import { Breadcrumb, DropdownKebab, MenuItem, Grid } from 'patternfly-react';
import { links } from './config';

const dropDownItems = links.map(({ text, path }) => (
  <Route
    key={path}
    render={({ history }) => (
      <MenuItem
        onClick={() => {
          history.push(`/${path}`);
        }}
      >
        {text}
      </MenuItem>
    )}
  />
));

export default () => (
  <Grid.Row className="toolbar-pf">
    <Grid.Col xs={12}>
      <Breadcrumb>
        <Breadcrumb.Item href="#">Compute</Breadcrumb.Item>
        <Breadcrumb.Item href="#">Migration</Breadcrumb.Item>
        <Breadcrumb.Item active>Overview</Breadcrumb.Item>
        <div style={{ float: 'right' }}>
          <DropdownKebab id="migration_menu" pullRight>
            {dropDownItems}
          </DropdownKebab>
        </div>
      </Breadcrumb>
    </Grid.Col>
  </Grid.Row>
);
