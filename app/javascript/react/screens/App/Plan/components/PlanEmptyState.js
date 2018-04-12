import React from 'react';
import PropTypes from 'prop-types';
import { EmptyState } from 'patternfly-react';

const PlanEmptyState = ({ title, iconType, iconName, description }) => (
  <div>
    <br />
    <EmptyState>
      <EmptyState.Icon type={iconType} name={iconName} />
      <EmptyState.Title>{sprintf(__('%s'), title)}</EmptyState.Title>
      <EmptyState.Info>{sprintf(__('%s'), description)}</EmptyState.Info>
    </EmptyState>
  </div>
);

PlanEmptyState.propTypes = {
  title: PropTypes.string,
  iconType: PropTypes.string,
  iconName: PropTypes.string,
  description: PropTypes.string
};

export default PlanEmptyState;
