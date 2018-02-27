import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import { formHasErrors } from '../../../common/helpers';
import ModalWizard from '../../components/ModalWizard';
import PlanWizardBody from './PlanWizardBody';

// TODO these could even be moved to properties on the wizard steps array,
// if we move the PlanWizardBody stuff into here.
const reduxFormKeys = ['planWizardGeneralStep', 'planWizardCSVStep'];

const PlanWizard = ({
  hidePlanWizard,
  hidePlanWizardAction,
  planWizardExitedAction,
  formContainer
}) => (
  <ModalWizard
    numSteps={3}
    showWizard={!hidePlanWizard}
    onHide={hidePlanWizardAction}
    onExited={planWizardExitedAction}
    title={__('Migration Plan Wizard')}
    shouldDisableNextStep={activeStepIndex =>
      formHasErrors(formContainer, reduxFormKeys[activeStepIndex])
    }
  >
    <PlanWizardBody loaded />
  </ModalWizard>
);

PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func,
  transformationMappings: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  formContainer: PropTypes.object
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  transformationMappings: [],
  formContainer: {}
};
export default PlanWizard;
