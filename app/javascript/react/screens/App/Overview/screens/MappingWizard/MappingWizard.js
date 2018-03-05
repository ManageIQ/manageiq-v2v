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
import {
  createTransformationMappings,
  getMappedSourceClusters,
  getSourceClustersWithMappings
} from './helpers';
import MappingWizardBody from './MappingWizardBody';
import WarningModal from './components/WarningModal/WarningModal';

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
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep,
      setTransformationsBodyAction,
      showWarningModalAction,
      hideWarningModalAction,
      warningModalVisible
    } = this.props;

    if (activeStepIndex === 2 && !warningModalVisible) {
      const { clusterMappings } = mappingWizardClustersStep.values;
      const { datastoresMappings } = mappingWizardDatastoresStep.values;

      const sourceClustersWithoutDatastoresMappings = getMappedSourceClusters(
        clusterMappings
      ).filter(
        sourceCluster =>
          !getSourceClustersWithMappings(datastoresMappings).includes(
            sourceCluster.id
          )
      );

      if (sourceClustersWithoutDatastoresMappings.length > 0) {
        showWarningModalAction(sourceClustersWithoutDatastoresMappings);
      } else {
        this.setState({
          activeStepIndex: Math.min(
            activeStepIndex + 1,
            mappingWizardSteps.length - 1
          )
        });
      }
    } else if (activeStepIndex === 3 && !warningModalVisible) {
      const { clusterMappings } = mappingWizardClustersStep.values;
      const { networksMappings } = mappingWizardNetworksStep.values;

      const sourceClustersWithoutNetworksMappings = getMappedSourceClusters(
        clusterMappings
      ).filter(
        sourceCluster =>
          !getSourceClustersWithMappings(networksMappings).includes(
            sourceCluster.id
          )
      );

      if (sourceClustersWithoutNetworksMappings.length > 0) {
        showWarningModalAction(sourceClustersWithoutNetworksMappings);
      } else {
        const transformationsBody = createTransformationMappings(
          mappingWizardGeneralStep,
          mappingWizardClustersStep,
          mappingWizardDatastoresStep,
          mappingWizardNetworksStep
        );
        setTransformationsBodyAction(transformationsBody);
        this.setState({
          activeStepIndex: Math.min(
            activeStepIndex + 1,
            mappingWizardSteps.length - 1
          )
        });
      }
    } else {
      // Either we are not on the datastores or networks step, or we are clicking
      // the continue button in the warning modal
      hideWarningModalAction();
      if (activeStepIndex === 3) {
        const transformationsBody = createTransformationMappings(
          mappingWizardGeneralStep,
          mappingWizardClustersStep,
          mappingWizardDatastoresStep,
          mappingWizardNetworksStep
        );
        setTransformationsBodyAction(transformationsBody);
      }
      this.setState({
        activeStepIndex: Math.min(
          activeStepIndex + 1,
          mappingWizardSteps.length - 1
        )
      });
    }
  }

  goToStep(activeStepIndex) {
    const { activeStepIndex: currentStep } = this.state;

    if (currentStep === 2 && activeStepIndex === 3) {
      this.nextStep();
    } else {
      this.setState(() => ({ activeStepIndex }));
    }
  }

  render() {
    const {
      hideMappingWizard,
      hideMappingWizardAction,
      mappingWizardExitedAction,
      hideWarningModalAction,
      warningModalVisible,
      sourceClustersWithoutMappings,
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep,
      alertText,
      alertType,
      hideAlertAction
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
        onHide={() => {
          hideMappingWizardAction(onFinalStep);
        }}
        onExited={mappingWizardExitedAction}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={() => {
                hideMappingWizardAction(onFinalStep);
              }}
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
              mappingWizardGeneralStep={mappingWizardGeneralStep}
              mappingWizardClustersStep={mappingWizardClustersStep}
              mappingWizardDatastoresStep={mappingWizardDatastoresStep}
              mappingWizardNetworksStep={mappingWizardNetworksStep}
              alertText={alertText}
              alertType={alertType}
              hideAlertAction={hideAlertAction}
            />
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button
              bsStyle="default"
              className="btn-cancel"
              onClick={() => {
                hideMappingWizardAction(onFinalStep);
              }}
              disabled={onFinalStep}
            >
              {__('Cancel')}
            </Button>

            <Button
              bsStyle="default"
              onClick={this.prevStep}
              disabled={onFirstStep || onFinalStep}
            >
              <Icon type="fa" name="angle-left" />
              {__('Back')}
            </Button>
            <Button
              bsStyle="primary"
              onClick={
                onFinalStep
                  ? () => hideMappingWizardAction(onFinalStep)
                  : this.nextStep
              }
              disabled={disableNextStep}
            >
              {onFinalStep
                ? __('Close')
                : activeStepIndex === 3 ? __('Create') : __('Next')}
              <Icon type="fa" name="angle-right" />
            </Button>
          </Modal.Footer>
        </Wizard>
        <WarningModal
          warningModalVisible={warningModalVisible}
          hideWarningModalAction={hideWarningModalAction}
          onFinalStep={onFinalStep}
          activeStepIndex={activeStepIndex}
          nextStep={this.nextStep}
          sourceClustersWithoutMappings={sourceClustersWithoutMappings}
        />
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
  mappingWizardNetworksStep: PropTypes.object,
  setTransformationsBodyAction: PropTypes.func,
  showWarningModalAction: PropTypes.func,
  hideWarningModalAction: PropTypes.func,
  warningModalVisible: PropTypes.bool,
  sourceClustersWithoutMappings: PropTypes.array,
  alertText: PropTypes.string,
  alertType: PropTypes.string,
  hideAlertAction: PropTypes.func
};
MappingWizard.defaultProps = {
  hideMappingWizard: true,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop,
  mappingWizardGeneralStep: {},
  mappingWizardClustersStep: {},
  mappingWizardDatastoresStep: {},
  mappingWizardNetworksStep: {},
  setTransformationsBodyAction: noop,
  hideAlertAction: noop
};
export default MappingWizard;
