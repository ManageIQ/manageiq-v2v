import React from 'react';
import PropTypes from 'prop-types';
import {
  bindMethods,
  noop,
  Button,
  Icon,
  Modal,
  Wizard
} from 'patternfly-react';
import { createMigrationPlans } from './helpers';
import PlanWizardBody from './PlanWizardBody';

const planWizardSteps = [
  'planWizardGeneralStep',
  'planWizardVMStep',
  'planWizardResultsStep'
];

class PlanWizard extends React.Component {
  constructor() {
    super();
    this.state = { activeStepIndex: 0 };
    bindMethods(this, ['prevStep', 'nextStep', 'goToStep']);
  }

  prevStep() {
    const { activeStepIndex } = this.state;
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  }

  nextStep() {
    const { activeStepIndex } = this.state;
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      setPlansBodyAction
    } = this.props;

    const { vm_choice_radio } = planWizardGeneralStep.values || {};
    const discoveryMode = vm_choice_radio === 'vms_via_discovery';

    // NOTE/TODO: This is special logic that is not present in the refactored wizard abstraction!
    // MTURLEY: Make sure to incorporate this in that rebase!
    if (activeStepIndex === 0) {
      if (discoveryMode) {
        // TODO this boolean?
        // TODO: request discovery of VMs
        console.log('TODO: API REQUEST FOR VM DISCOVERY HERE');
      }
    }

    if (activeStepIndex === 1) {
      if (!discoveryMode) {
        // TODO this boolean?
        // TODO: request validation of CSV VM list
        console.log('TODO: API REQUEST FOR VM CSV VALIDATION HERE');
      }

      const plansBody = createMigrationPlans(
        planWizardGeneralStep,
        planWizardVMStep
      );

      setPlansBodyAction(plansBody);
    }

    this.setState({
      activeStepIndex: Math.min(activeStepIndex + 1, planWizardSteps.length - 1)
    });
  }

  goToStep(activeStepIndex) {
    this.setState({ activeStepIndex });
  }

  render() {
    const {
      hidePlanWizard,
      hidePlanWizardAction,
      planWizardExitedAction,
      planWizardGeneralStep,
      planWizardVMStep
    } = this.props;

    const { activeStepIndex, plansBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === planWizardSteps.length - 1;

    const currentStepProp = !onFinalStep && planWizardSteps[activeStepIndex];
    const currentStepForm = !onFinalStep && this.props[currentStepProp];
    const disableNextStep = !onFinalStep && !!currentStepForm.syncErrors;

    return (
      <Modal
        show={!hidePlanWizard}
        onHide={hidePlanWizardAction}
        onExited={planWizardExitedAction}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={hidePlanWizardAction}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>{__('Migration Plan Wizard')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="wizard-pf-body clearfix">
            <PlanWizardBody
              loaded
              activeStepIndex={activeStepIndex}
              activeStep={activeStep}
              goToStep={this.goToStep}
              disableNextStep={disableNextStep}
              plansBody={plansBody}
              planWizardGeneralStep={planWizardGeneralStep}
              planWizardVMStep={planWizardVMStep}
            />
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button
              bsStyle="default"
              className="btn-cancel"
              onClick={hidePlanWizardAction}
            >
              {__('Cancel')}
            </Button>
            <Button
              bsStyle="default"
              onClick={this.prevStep}
              disabled={onFirstStep}
            >
              <Icon type="fa" name="angle-left" />
              {__('Back')}
            </Button>
            <Button
              bsStyle="primary"
              onClick={onFinalStep ? hidePlanWizardAction : this.nextStep}
              disabled={disableNextStep}
            >
              {onFinalStep
                ? __('Close')
                : activeStepIndex === 1 ? __('Create') : __('Next')}
              <Icon type="fa" name="angle-right" />
            </Button>
          </Modal.Footer>
        </Wizard>
      </Modal>
    );
  }
}
PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func,
  planWizardGeneralStep: PropTypes.object,
  planWizardVMStep: PropTypes.object,
  setPlansBodyAction: PropTypes.func
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  planWizardGeneralStep: {},
  planWizardVMStep: {},
  setPlansBodyAction: noop
};
export default PlanWizard;
