import React from 'react';
import { Route } from 'react-router-dom';
import { DropdownKebab, MenuItem } from 'patternfly-react';
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
  <div style={{ float: 'right' }}>
    <DropdownKebab id="migration_menu" pullRight>
      {dropDownItems}
    </DropdownKebab>
  </div>
);
