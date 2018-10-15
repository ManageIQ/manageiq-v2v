import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const ShowWizardEmptyState = ({
  showWizardAction,
  buttonHref,
  description,
  buttonText,
  title,
  iconType,
  iconName,
  ...props
}) => (
  <EmptyState {...props}>
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

ShowWizardEmptyState.propTypes = {
  showWizardAction: PropTypes.func,
  buttonHref: PropTypes.string,
  description: PropTypes.node,
  buttonText: PropTypes.string,
  title: PropTypes.string,
  iconType: PropTypes.string,
  iconName: PropTypes.string
};
ShowWizardEmptyState.defaultProps = {
  title: ' ',
  iconType: 'pf',
  iconName: 'add-circle-o',
  showWizardAction: null,
  buttonHref: null
};

export default ShowWizardEmptyState;
