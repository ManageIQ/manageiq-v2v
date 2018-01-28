import React from 'react';
import { Route } from 'react-router-dom';
import { links } from './config';
import { Grid } from 'patternfly-react';
import Toolbar from './Toolbar';

export default () => (
  <React.Fragment>
    <Toolbar />
    {links.map(({ path, component }) => (
      <Route exact key={path} path={`/${path}`} component={component} />
    ))}
  </React.Fragment>
);
