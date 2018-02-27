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
import { createTransformationMappings } from './helpers';
import MappingWizardBody from './MappingWizardBody';

const mappingWizardSteps = [
  'mappingWizardGeneralStep',
  'mappingWizardClustersStep',
  'mappingWizardDatastoresStep',
  'mappingWizardNetworksStep',
  'mappingWizardResultsStep'
];

class MappingWizard extends React.Component {
  constructor() {
    super();
    this.state = { activeStepIndex: 0, transformationsBody: {} };
    bindMethods(this, ['prevStep', 'nextStep', 'goToStep']);
  }

  prevStep() {
    const { activeStepIndex } = this.state;
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  }

  nextStep() {
    const { activeStepIndex } = this.state;
    const {
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep
    } = this.props;
    let transformationsBody = {};

    if (activeStepIndex === 3) {
      transformationsBody = createTransformationMappings(
        mappingWizardGeneralStep,
        mappingWizardClustersStep,
        mappingWizardDatastoresStep,
        mappingWizardNetworksStep
      );
    }

    this.setState({
      activeStepIndex: Math.min(
        activeStepIndex + 1,
        mappingWizardSteps.length - 1
      ),
      transformationsBody
    });
  }

  goToStep(activeStepIndex) {
    this.setState({ activeStepIndex });
  }

  render() {
    const {
      hideMappingWizard,
      hideMappingWizardAction,
      mappingWizardExitedAction
    } = this.props;

    const { activeStepIndex, transformationsBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === mappingWizardSteps.length - 1;

    const currentStepProp = !onFinalStep && mappingWizardSteps[activeStepIndex];
    const currentStepForm = !onFinalStep && this.props[currentStepProp];
    const disableNextStep = !onFinalStep && !!currentStepForm.syncErrors;

    return (
      <Modal
        show={!hideMappingWizard}
        onHide={hideMappingWizardAction}
        onExited={mappingWizardExitedAction}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={hideMappingWizardAction}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>{__('Infrastructure Mapping Wizard')}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="wizard-pf-body clearfix">
            <MappingWizardBody
              loaded
              activeStepIndex={activeStepIndex}
              activeStep={activeStep}
              goToStep={this.goToStep}
              disableNextStep={disableNextStep}
              transformationsBody={transformationsBody}
            />
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button
              bsStyle="default"
              className="btn-cancel"
              onClick={hideMappingWizardAction}
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
              onClick={onFinalStep ? hideMappingWizardAction : this.nextStep}
              disabled={disableNextStep}
            >
              {onFinalStep
                ? __('Close')
                : activeStepIndex === 3 ? __('Create') : __('Next')}
              <Icon type="fa" name="angle-right" />
            </Button>
          </Modal.Footer>
        </Wizard>
      </Modal>
    );
  }
}
MappingWizard.propTypes = {
  hideMappingWizard: PropTypes.bool,
  hideMappingWizardAction: PropTypes.func,
  mappingWizardExitedAction: PropTypes.func,
  mappingWizardGeneralStep: PropTypes.object,
  mappingWizardClustersStep: PropTypes.object,
  mappingWizardDatastoresStep: PropTypes.object,
  mappingWizardNetworksStep: PropTypes.object
};
MappingWizard.defaultProps = {
  hideMappingWizard: true,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop,
  mappingWizardGeneralStep: {},
  mappingWizardClustersStep: {},
  mappingWizardDatastoresStep: {},
  mappingWizardNetworksStep: {}
};
export default MappingWizard;
