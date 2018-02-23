import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { links } from './config';
import { componentSettings } from '../../components';
import Toolbar from './Toolbar';
import componentRegistry from '../../components/componentRegistry';

const Routes = ({ store }) =>
  links.map(({ path, component }) => {
    const coreComponent = componentSettings(component);
    if (coreComponent) {
      const markup = componentRegistry.markup(
        coreComponent.name,
        coreComponent.data,
        store
      );
      return (
        <Route
          exact
          key={path}
          path={`/${path}`}
          render={props => {
            if (props.match.isExact) {
              return (
                <React.Fragment>
                  <Toolbar navigation={coreComponent.navigation} />
                  {markup}
                </React.Fragment>
              );
            }
            return markup;
          }}
        />
      );
    }
    return <Route exact key={path} path={`/${path}`} />;
  });

Routes.propTypes = {
  store: PropTypes.object
};
Routes.defaultProps = {
  store: {}
};
export default Routes;
