import React from 'react';
import PropTypes from 'prop-types';
import { Button, EmptyState } from 'patternfly-react';

const InfrastructureMappingCard = ({ cardRef, showMappingWizardAction }) => (
  <div className="card-pf">
    <div className="card-pf-body">
      <div className="blank-slate-pf" ref={cardRef}>
        <EmptyState.Icon />
        <EmptyState.Title>{__('Infrastructure Mappings')}</EmptyState.Title>
        <EmptyState.Info>
          {__('Create mapping to later be used by a migration plan.')}
        </EmptyState.Info>
        <EmptyState.Action>
          <Button
            bsStyle="primary"
            bsSize="large"
            onClick={showMappingWizardAction}
          >
            {__('Create Infrastructure Mapping')}
          </Button>
        </EmptyState.Action>
      </div>
    </div>
  </div>
);

InfrastructureMappingCard.propTypes = {
  cardRef: PropTypes.func,
  showMappingWizardAction: PropTypes.func
};

export default InfrastructureMappingCard;
