import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const OverviewEmptyState = ({
  showWizardAction,
  buttonHref,
  description,
  buttonText,
  title,
  iconType,
  iconName,
  ...props
}) => (
  <EmptyState className="overview" {...props}>
    <EmptyState.Icon type={iconType} name={iconName} />
    <EmptyState.Title>{title}</EmptyState.Title>
    <EmptyState.Info>{description}</EmptyState.Info>
    {buttonText && (
      <EmptyState.Action>
        <Button bsStyle="primary" bsSize="large" onClick={showWizardAction} href={buttonHref}>
          {sprintf(__('%s'), buttonText)}
        </Button>
      </EmptyState.Action>
    )}
  </EmptyState>
);

OverviewEmptyState.propTypes = {
  showWizardAction: PropTypes.func,
  buttonHref: PropTypes.string,
  description: PropTypes.node,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  iconType: PropTypes.string,
  iconName: PropTypes.string
};
OverviewEmptyState.defaultProps = {
  title: ' ',
  iconType: 'pf',
  iconName: 'add-circle-o',
  showWizardAction: null,
  buttonHref: null
};

export default OverviewEmptyState;
