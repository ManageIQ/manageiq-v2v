import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const MigrationPlansCard = ({
  cardRef,
  showPlanWizardAction,
  showPlanDisabled
}) => {
  const createAPlan = __('Create a migration plan to start migrating.');
  const createAMappingFirst = __(
    'Before you can create a migration plan, you need to create an infrastructure mapping.'
  );
  return (
    <div className="card-pf">
      <div className="card-pf-body">
        <div className="blank-slate-pf" ref={cardRef}>
          <EmptyState.Icon />
          <EmptyState.Title>{__('Migration Plans')}</EmptyState.Title>
          <EmptyState.Info>
            {showPlanDisabled ? createAMappingFirst : createAPlan}
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
};

MigrationPlansCard.propTypes = {
  cardRef: PropTypes.func,
  showPlanWizardAction: PropTypes.func,
  showPlanDisabled: PropTypes.bool
};

export default MigrationPlansCard;
