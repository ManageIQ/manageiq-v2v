import React from 'react';
import PropTypes from 'prop-types';
import { noop, WizardPattern } from 'patternfly-react';
import { createMigrationPlans } from './helpers';
import componentRegistry from '../../../../../../components/componentRegistry';
import PlanWizardGeneralStep from './components/PlanWizardGeneralStep';
import PlanWizardCSVStep from './components/PlanWizardCSVStep';

const PlanWizard = ({
  hidePlanWizard,
  hidePlanWizardAction,
  planWizardExitedAction,
  setPlansBodyAction,
  forms
}) => {
  const formHasErrors = reduxFormName =>
    forms[reduxFormName] && !!forms[reduxFormName].syncErrors;

  const onEnterFinalStep = () => {
    setPlansBodyAction(
      createMigrationPlans(forms.planWizardGeneralStep, forms.planWizardCSVStep)
    );
  };

  const planWizardResultsStepContainer = componentRegistry.markup(
    'PlanWizardResultsStepContainer'
  );

  return (
    <WizardPattern.Stateful
      show={!hidePlanWizard}
      title={__('Migration Plan Wizard')}
      steps={[
        {
          title: __('General'),
          render: () => <PlanWizardGeneralStep />,
          isInvalid: formHasErrors('planWizardGeneralStep')
        },
        {
          title: __('VMs'),
          render: () => <PlanWizardCSVStep />,
          isInvalid: formHasErrors('planWizardCSVStep'),
          onNext: onEnterFinalStep
        },
        {
          title: __('Results'),
          render: () => planWizardResultsStepContainer,
          preventExit: true // API requests are sent in this step with data from previous steps, so no going back.
          // Note, the above property does not prevent exiting the wizard, only the step (entering another step).
        }
      ]}
      onHide={hidePlanWizardAction}
      onExited={planWizardExitedAction} // This entire-wizard exit has nothing to do with steps[].preventExit.
      stepButtonsDisabled
    />
  );
};

PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func,
  setPlansBodyAction: PropTypes.func,
  forms: PropTypes.shape({
    planWizardGeneralStep: PropTypes.object,
    planWizardCSVStep: PropTypes.object
  })
};

PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  setPlansBodyAction: noop,
  forms: {
    planWizardGeneralStep: {},
    planWizardCSVStep: {}
  }
};

export default PlanWizard;
