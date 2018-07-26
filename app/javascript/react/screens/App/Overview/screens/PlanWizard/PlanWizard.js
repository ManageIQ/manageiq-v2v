import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Icon, Wizard } from 'patternfly-react';
import { createMigrationPlans } from './helpers';
import PlanWizardBody from './PlanWizardBody';
import { MIGRATIONS_FILTERS } from '../../OverviewConstants';

const planWizardSteps = [
  'planWizardGeneralStep',
  'planWizardVMStep',
  'planWizardAdvancedOptionsStep',
  'planWizardScheduleStep',
  'planWizardResultsStep'
];

class PlanWizard extends React.Component {
  state = { activeStepIndex: 0 };

  prevStep = () => {
    const { resetVmStepAction, resetAdvancedOptionsStepAction } = this.props;
    const { activeStepIndex } = this.state;

    if (activeStepIndex === 1) {
      // reset all vm step values if going back from that step
      resetVmStepAction();
    } else if (activeStepIndex === 2) {
      resetAdvancedOptionsStepAction();
    }
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  };

  nextStep = () => {
    const { activeStepIndex } = this.state;
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardAdvancedOptionsStep,
      planWizardScheduleStep,
      setPlansBodyAction,
      setPlanScheduleAction,
      setMigrationsFilterAction,
      showConfirmModalAction,
      hideConfirmModalAction,
      showAlertAction,
      hideAlertAction
    } = this.props;

    if (activeStepIndex === 0) {
      if (planWizardGeneralStep.asyncErrors) {
        showAlertAction(sprintf(__('Name %s already exists'), planWizardGeneralStep.values.name));
        return;
      }
      hideAlertAction();
    }

    if (
      activeStepIndex === 2 &&
      ((planWizardAdvancedOptionsStep.values.preMigrationPlaybook &&
        planWizardAdvancedOptionsStep.values.playbookVms.preMigration.length === 0) ||
        (planWizardAdvancedOptionsStep.values.postMigrationPlaybook &&
          planWizardAdvancedOptionsStep.values.playbookVms.postMigration.length === 0))
    ) {
      const onConfirm = () => {
        this.setState({ activeStepIndex: 3 });
        hideConfirmModalAction();
      };

      showConfirmModalAction({
        title: __('No VMs Selected'),
        body: __("You've selected a pre-migration or post-migration playbook service but no VMs on which to run the playbook service. Are you sure you want to continue?"), // prettier-ignore
        icon: <Icon className="confirm-warning-icon" type="pf" name="warning-triangle-o" />,
        confirmButtonLabel: __('Continue'),
        dialogClassName: 'plan-wizard-confirm-modal',
        backdropClassName: 'plan-wizard-confirm-backdrop',
        onConfirm
      });
    } else if (activeStepIndex === 3) {
      const plansBody = createMigrationPlans(planWizardGeneralStep, planWizardVMStep, planWizardAdvancedOptionsStep);

      setPlanScheduleAction(planWizardScheduleStep.values.migration_plan_choice_radio);
      setPlansBodyAction(plansBody);

      if (planWizardScheduleStep.values.migration_plan_choice_radio === 'migration_plan_now') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.inProgress);
      } else if (planWizardScheduleStep.values.migration_plan_choice_radio === 'migration_plan_later') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.notStarted);
      }
      this.setState({
        activeStepIndex: Math.min(activeStepIndex + 1, planWizardSteps.length - 1)
      });
    } else {
      this.setState({
        activeStepIndex: Math.min(activeStepIndex + 1, planWizardSteps.length - 1)
      });
    }
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
      planWizardScheduleStep,
      alertText,
      alertType,
      hideAlertAction
    } = this.props;

    const { activeStepIndex, plansBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === planWizardSteps.length - 1;

    const currentStepProp = !onFinalStep && planWizardSteps[activeStepIndex];
    const currentStepForm = !onFinalStep && this.props[currentStepProp];

    const disableNextStep =
      (!onFinalStep && (!!currentStepForm.syncErrors || !!currentStepForm.asyncErrors)) ||
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
            planWizardScheduleStep={planWizardScheduleStep}
            alertText={alertText}
            alertType={alertType}
            hideAlertAction={hideAlertAction}
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
            {onFinalStep ? __('Close') : activeStepIndex === 3 ? __('Create') : __('Next')}
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
  planWizardAdvancedOptionsStep: PropTypes.object, // eslint-disable-line react/no-unused-prop-types
  planWizardScheduleStep: PropTypes.object,
  setPlansBodyAction: PropTypes.func,
  setPlanScheduleAction: PropTypes.func,
  resetVmStepAction: PropTypes.func,
  setMigrationsFilterAction: PropTypes.func,
  showConfirmModalAction: PropTypes.func,
  hideConfirmModalAction: PropTypes.func,
  resetAdvancedOptionsStepAction: PropTypes.func,
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func,
  alertText: PropTypes.string,
  alertType: PropTypes.string
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  planWizardGeneralStep: {},
  planWizardVMStep: {},
  planWizardAdvancedOptionsStep: {},
  planWizardScheduleStep: {},
  setPlansBodyAction: noop,
  setPlanScheduleAction: noop,
  resetVmStepAction: noop,
  showAlertAction: noop,
  hideAlertAction: noop,
  alertText: undefined,
  alertType: undefined
};
export default PlanWizard;
