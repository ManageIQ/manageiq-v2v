import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState, Spinner } from 'patternfly-react';

// TODO maybe remove this, it probably won't be used anymore

const CardEmptyState = ({ iconType, iconName, emptyStateInfo, emptyStateInfoStyles, showSpinner, spinnerStyles }) => (
  <EmptyState>
    {showSpinner && <Spinner loading size="lg" style={spinnerStyles} />}
    {iconType && iconName && <EmptyState.Icon type={iconType} name={iconName} />}
    {emptyStateInfo && <EmptyState.Info style={emptyStateInfoStyles}>{emptyStateInfo}</EmptyState.Info>}
  </EmptyState>
);

CardEmptyState.propTypes = {
  emptyStateInfo: PropTypes.node,
  emptyStateInfoStyles: PropTypes.object,
  iconName: PropTypes.string,
  iconType: PropTypes.string,
  showSpinner: PropTypes.bool,
  spinnerStyles: PropTypes.object
};

export default CardEmptyState;
