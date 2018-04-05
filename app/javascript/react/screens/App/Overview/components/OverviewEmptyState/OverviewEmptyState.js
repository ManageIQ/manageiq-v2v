import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const OverviewEmptyState = ({ showWizardAction, description, buttonText }) => (
  <div className="blank-slate-pf">
    <EmptyState.Icon />
    <EmptyState.Title>&nbsp;</EmptyState.Title>
    <EmptyState.Info>{sprintf(__('%s'), description)}</EmptyState.Info>
    <EmptyState.Action>
      <Button bsStyle="primary" bsSize="large" onClick={showWizardAction}>
        {sprintf(__('%s'), buttonText)}
      </Button>
    </EmptyState.Action>
  </div>
);

OverviewEmptyState.propTypes = {
  showWizardAction: PropTypes.func,
  description: PropTypes.string,
  buttonText: PropTypes.string
};

export default OverviewEmptyState;
