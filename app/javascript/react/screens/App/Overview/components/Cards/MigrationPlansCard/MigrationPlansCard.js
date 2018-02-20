import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const MigrationPlansCard = ({
  cardRef,
  showPlanWizardAction,
  showPlanDisabled
}) => (
  <div className="card-pf">
    <div className="card-pf-body">
      <div className="blank-slate-pf" ref={cardRef}>
        <EmptyState.Icon />
        <EmptyState.Title>{__('Migration Plans')}</EmptyState.Title>
        <EmptyState.Info>
          {__('Create a migration plan to start migrating.')}
        </EmptyState.Info>
        <EmptyState.Action>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={showPlanWizardAction}
            disabled={showPlanDisabled}
          >
            {__('Create Migration Plan')}
          </Button>
        </EmptyState.Action>
      </div>
    </div>
  </div>
);

MigrationPlansCard.propTypes = {
  cardRef: PropTypes.func,
  showPlanWizardAction: PropTypes.func,
  showPlanDisabled: PropTypes.bool
};

export default MigrationPlansCard;
