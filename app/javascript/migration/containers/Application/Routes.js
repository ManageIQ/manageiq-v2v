import React from 'react';
import { Route } from 'react-router-dom';
import { links } from './config';
import { Grid } from 'patternfly-react';
import Toolbar from './Toolbar';
import { componentSettings } from '../../../components';
import componentRegistry from '../../../components/componentRegistry';

export default ({ store }) => (
  <React.Fragment>
    <Toolbar />
    {links.map(({ path, component }) => {
      const coreComponent = componentSettings(component);
      if (coreComponent) {
        const markup = componentRegistry.markup(
          coreComponent.name,
          coreComponent.data,
          store
        );
        return (
          <Route exact key={path} path={`/${path}`} render={() => markup} />
        );
      }
      return <Route exact key={path} path={`/${path}`} />;
    })}
  </React.Fragment>
);
