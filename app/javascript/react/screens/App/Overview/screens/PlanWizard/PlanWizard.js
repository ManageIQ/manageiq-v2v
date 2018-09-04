import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Icon, Wizard } from 'patternfly-react';
import { createMigrationPlans } from './helpers';
import PlanWizardBody from './PlanWizardBody';
import { MIGRATIONS_FILTERS, OSP_TENANT } from '../../OverviewConstants';

import componentRegistry from '../../../../../../components/componentRegistry';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardScheduleStep from '../PlanWizard/components/PlanWizardScheduleStep';

const stepIDs = {
  generalStep: 'planWizardGeneralStep',
  vmStep: 'planWizardVMStep',
  instancePropertiesStep: 'planWizardInstancePropertiesStep',
  advancedOptionsStep: 'planWizardAdvancedOptionsStep',
  scheduleStep: 'planWizardScheduleStep',
  resultsStep: 'planWizardResultsStep'
};

class PlanWizard extends React.Component {
  planWizardVMStepContainer = componentRegistry.markup('PlanWizardVMStepContainer');
  planWizardResultsStepContainer = componentRegistry.markup('PlanWizardResultsStepContainer');
  planWizardAdvancedOptionsStepContainer = componentRegistry.markup('PlanWizardAdvancedOptionsStepContainer');
  planWizardInstancePropertiesStepContainer = componentRegistry.markup('PlanWizardInstancePropertiesStepContainer');

  state = { activeStepIndex: 0 };

  getWizardSteps = () => {
    const { planWizardGeneralStep, transformationMappings } = this.props;

    const generalStep = {
      id: stepIDs.generalStep,
      title: __('General'),
      render: () => <PlanWizardGeneralStep />,
      disableGoto: !this.props.planWizardGeneralStep.values
    };
    const vmStep = {
      id: stepIDs.vmStep,
      title: __('VMs'),
      render: () => this.planWizardVMStepContainer,
      disableGoto: !this.props.planWizardVMStep.values
    };
    const instancePropertiesStep = {
      id: stepIDs.instancePropertiesStep,
      title: __('Instance Properties'),
      render: () => this.planWizardInstancePropertiesStepContainer,
      disableGoto: true
    };
    const advancedOptionsStep = {
      id: stepIDs.advancedOptionsStep,
      title: __('Advanced Options'),
      render: () => this.planWizardAdvancedOptionsStepContainer,
      disableGoto: true
    };
    const scheduleStep = {
      id: stepIDs.scheduleStep,
      title: __('Schedule'),
      render: () => <PlanWizardScheduleStep />,
      disableGoto: true
    };
    const resultsStep = {
      id: stepIDs.resultsStep,
      title: __('Results'),
      render: () => this.planWizardResultsStepContainer,
      disableGoto: true
    };

    const selectedMappingId =
      planWizardGeneralStep && planWizardGeneralStep.values && planWizardGeneralStep.values.infrastructure_mapping;
    const selectedMapping = transformationMappings.find(mapping => mapping.id === selectedMappingId);

    const openstackTargetSelected =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.some(item => item.destination_type === OSP_TENANT);

    if (openstackTargetSelected) {
      return [generalStep, vmStep, instancePropertiesStep, advancedOptionsStep, scheduleStep, resultsStep];
    }

    return [generalStep, vmStep, advancedOptionsStep, scheduleStep, resultsStep];
  };

  getActiveWizardStep = () => {
    const { activeStepIndex } = this.state;
    return this.getWizardSteps()[activeStepIndex];
  };

  prevStep = () => {
    const { resetVmStepAction, resetAdvancedOptionsStepAction } = this.props;
    const { activeStepIndex } = this.state;

    const activeStep = this.getActiveWizardStep();

    if (activeStep.id === stepIDs.vmStep) {
      // reset all vm step values if going back from that step
      resetVmStepAction();
    } else if (activeStep.id === stepIDs.advancedOptionsStep) {
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

    const wizardSteps = this.getWizardSteps();
    const activeStep = wizardSteps[activeStepIndex];

    if (activeStep.id === stepIDs.generalStep) {
      if (planWizardGeneralStep.asyncErrors) {
        showAlertAction(sprintf(__('Name %s already exists'), planWizardGeneralStep.values.name));
        return;
      }
      hideAlertAction();
    }

    if (
      activeStep.id === stepIDs.advancedOptionsStep &&
      ((planWizardAdvancedOptionsStep.values.preMigrationPlaybook &&
        planWizardAdvancedOptionsStep.values.playbookVms.preMigration.length === 0) ||
        (planWizardAdvancedOptionsStep.values.postMigrationPlaybook &&
          planWizardAdvancedOptionsStep.values.playbookVms.postMigration.length === 0))
    ) {
      const onConfirm = () => {
        this.goToStepId(stepIDs.scheduleStep);
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
    } else if (activeStep.id === stepIDs.scheduleStep) {
      const plansBody = createMigrationPlans(planWizardGeneralStep, planWizardVMStep, planWizardAdvancedOptionsStep);

      setPlanScheduleAction(planWizardScheduleStep.values.migration_plan_choice_radio);
      setPlansBodyAction(plansBody);

      if (planWizardScheduleStep.values.migration_plan_choice_radio === 'migration_plan_now') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.inProgress);
      } else if (planWizardScheduleStep.values.migration_plan_choice_radio === 'migration_plan_later') {
        setMigrationsFilterAction(MIGRATIONS_FILTERS.notStarted);
      }
      this.goToStepId(stepIDs.resultsStep);
    } else {
      // This is for steps that do not need any special logic on step change.
      // In case the above logic doesn't explicitly take us to another step, we advance one step by index.
      this.goToStep(Math.min(activeStepIndex + 1, wizardSteps.length - 1));
    }
  };

  goToStep = activeStepIndex => {
    this.setState({ activeStepIndex });
  };

  goToStepId = id => {
    const targetStepIndex = this.getWizardSteps().findIndex(step => step.id === id);
    if (targetStepIndex) {
      this.goToStep(targetStepIndex);
    }
  };

  render() {
    const {
      hidePlanWizard,
      hidePlanWizardAction,
      planWizardExitedAction,
      alertText,
      alertType,
      hideAlertAction
    } = this.props;

    const wizardSteps = this.getWizardSteps();

    const { activeStepIndex, plansBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === wizardSteps.length - 1;

    const currentStepProp = !onFinalStep && wizardSteps[activeStepIndex].id;
    const currentStepForm = !onFinalStep && this.props[currentStepProp];

    const currentStepHasErrors = currentStepForm && (!!currentStepForm.syncErrors || !!currentStepForm.asyncErrors);

    const disableNextStep =
      (!onFinalStep && currentStepHasErrors) ||
      (activeStep.id === stepIDs.vmStep &&
        (!this.props.planWizardVMStep.values ||
          !this.props.planWizardVMStep.values.selectedVms ||
          this.props.planWizardVMStep.values.selectedVms.length === 0));

    return (
      <Wizard show={!hidePlanWizard} onClose={hidePlanWizardAction} onExited={planWizardExitedAction}>
        <Wizard.Header onClose={hidePlanWizardAction} title={__('Migration Plan Wizard')} />

        <Wizard.Body>
          <PlanWizardBody
            wizardSteps={wizardSteps}
            loaded
            activeStepIndex={activeStepIndex}
            activeStep={activeStep}
            goToStep={this.goToStep}
            disableNextStep={disableNextStep}
            plansBody={plansBody}
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
            {onFinalStep ? __('Close') : activeStep.id === stepIDs.scheduleStep ? __('Create') : __('Next')}
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
  transformationMappings: PropTypes.array,
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
  transformationMappings: [],
  setPlansBodyAction: noop,
  setPlanScheduleAction: noop,
  resetVmStepAction: noop,
  showAlertAction: noop,
  hideAlertAction: noop,
  alertText: undefined,
  alertType: undefined
};
export default PlanWizard;
