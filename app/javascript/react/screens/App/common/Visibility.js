import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';

// This component has no role on the page, and will be hidden from screen readers (role="presentation").
// Renders the children wrapped in visibility: hidden if the condition is met.
// Either way, the children take up space, visibility will not change the flow of the layout.
// The onKeyUp handler and role are used to satisfy eslint-plugin-jsx-a11y.
const Visibility = ({ children, hidden }) => (
  <span style={{ visibility: hidden ? 'hidden' : '' }} onKeyUp={noop} role="presentation">
    {children}
  </span>
);

Visibility.propTypes = {
  children: PropTypes.node,
  hidden: PropTypes.bool
};

export default Visibility;
