import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Icon, Wizard } from 'patternfly-react';
import { createMigrationPlans } from './helpers';
import PlanWizardBody from './PlanWizardBody';
import { MIGRATIONS_FILTERS } from '../../OverviewConstants';

const planWizardSteps = ['planWizardGeneralStep', 'planWizardVMStep', 'planWizardOptionsStep', 'planWizardResultsStep'];

class PlanWizard extends React.Component {
  state = { activeStepIndex: 0 };

  prevStep = () => {
    const { resetVmStepAction } = this.props;
    const { activeStepIndex } = this.state;

    if (activeStepIndex === 1) {
      // reset all vm step values if going back from that step
      resetVmStepAction();
    }
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  };

  nextStep = () => {
    const { activeStepIndex } = this.state;
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardOptionsStep,
      setPlansBodyAction,
      setPlanScheduleAction,
      setMigrationsFilterAction
    } = this.props;

    if (activeStepIndex === 2) {
      const plansBody = createMigrationPlans(planWizardGeneralStep, planWizardVMStep);

      setPlanScheduleAction(planWizardOptionsStep.values.migration_plan_choice_radio);
      setPlansBodyAction(plansBody);

      if (planWizardOptionsStep.values.migration_plan_choice_radio === 'migration_plan_now') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.inProgress);
      } else if (planWizardOptionsStep.values.migration_plan_choice_radio === 'migration_plan_later') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.notStarted);
      }
    }

    this.setState({
      activeStepIndex: Math.min(activeStepIndex + 1, planWizardSteps.length - 1)
    });
  };

  goToStep = activeStepIndex => {
    this.setState({ activeStepIndex });
  };

  render() {
    const {
      hidePlanWizard,
      hidePlanWizardAction,
      planWizardExitedAction,
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardOptionsStep
    } = this.props;

    const { activeStepIndex, plansBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === planWizardSteps.length - 1;

    const currentStepProp = !onFinalStep && planWizardSteps[activeStepIndex];
    const currentStepForm = !onFinalStep && this.props[currentStepProp];

    const disableNextStep =
      (!onFinalStep && !!currentStepForm.syncErrors) ||
      (activeStepIndex === 1 &&
        (!this.props.planWizardVMStep.values ||
          !this.props.planWizardVMStep.values.selectedVms ||
          this.props.planWizardVMStep.values.selectedVms.length === 0));

    return (
      <Wizard show={!hidePlanWizard} onClose={hidePlanWizardAction} onExited={planWizardExitedAction}>
        <Wizard.Header onClose={hidePlanWizardAction} title={__('Migration Plan Wizard')} />

        <Wizard.Body>
          <PlanWizardBody
            loaded
            activeStepIndex={activeStepIndex}
            activeStep={activeStep}
            goToStep={this.goToStep}
            disableNextStep={disableNextStep}
            plansBody={plansBody}
            planWizardGeneralStep={planWizardGeneralStep}
            planWizardVMStep={planWizardVMStep}
            planWizardOptionsStep={planWizardOptionsStep}
          />
        </Wizard.Body>

        <Wizard.Footer className="wizard-pf-footer">
          <Button bsStyle="default" className="btn-cancel" onClick={hidePlanWizardAction}>
            {__('Cancel')}
          </Button>
          <Button bsStyle="default" onClick={this.prevStep} disabled={onFirstStep || onFinalStep}>
            <Icon type="fa" name="angle-left" />
            {__('Back')}
          </Button>
          <Button
            bsStyle="primary"
            onClick={onFinalStep ? hidePlanWizardAction : this.nextStep}
            disabled={disableNextStep}
          >
            {onFinalStep ? __('Close') : activeStepIndex === 2 ? __('Create') : __('Next')}
            <Icon type="fa" name="angle-right" />
          </Button>
        </Wizard.Footer>
      </Wizard>
    );
  }
}
PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func,
  planWizardGeneralStep: PropTypes.object,
  planWizardVMStep: PropTypes.object,
  planWizardOptionsStep: PropTypes.object,
  setPlansBodyAction: PropTypes.func,
  setPlanScheduleAction: PropTypes.func,
  resetVmStepAction: PropTypes.func,
  setMigrationsFilterAction: PropTypes.func
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  planWizardGeneralStep: {},
  planWizardVMStep: {},
  planWizardOptionsStep: {},
  setPlansBodyAction: noop,
  setPlanScheduleAction: noop,
  resetVmStepAction: noop
};
export default PlanWizard;
