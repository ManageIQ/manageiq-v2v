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
import PlanWizardBody from './PlanWizardBody';

const planWizardSteps = [
  'planWizardGeneralStep',
  'planWizardCSVStep',
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
    const { planWizardGeneralStep, planWizardCSVStep } = this.props;

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
      planWizardExitedAction
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
  planWizardCSVStep: PropTypes.object
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  planWizardGeneralStep: {},
  planWizardCSVStep: {}
};
export default PlanWizard;
