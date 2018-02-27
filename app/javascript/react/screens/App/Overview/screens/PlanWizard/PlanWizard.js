import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import PlanWizardBody from './PlanWizardBody';

const PlanWizard = ({
  hidePlanWizard,
  hidePlanWizardAction,
  planWizardExitedAction
}) => (
  <ModalWizard
    numSteps={3}
    showWizard={!hidePlanWizard}
    onHide={hidePlanWizardAction}
    onExited={planWizardExitedAction}
    title={__('Migration Plan Wizard')}
  >
    <PlanWizardBody loaded />
  </ModalWizard>
);
PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop
};
export default PlanWizard;
