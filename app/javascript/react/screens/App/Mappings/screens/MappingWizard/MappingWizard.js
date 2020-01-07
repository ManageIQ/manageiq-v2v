import React from 'react';
import PropTypes from 'prop-types';
import { noop, Button, Icon, Wizard } from 'patternfly-react';
import { createTransformationMappings, getMappedSourceClusters, getSourceClustersWithMappings } from './helpers';
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
  state = { activeStepIndex: 0 };

  prevStep = () => {
    const { activeStepIndex } = this.state;
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  };

  nextStep = () => {
    const { activeStepIndex } = this.state;
    const {
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep,
      setTransformationsBodyAction,
      showWarningModalAction,
      hideWarningModalAction,
      warningModalVisible,
      showAlertAction,
      hideAlertAction
    } = this.props;

    if (activeStepIndex === 0) {
      if (mappingWizardGeneralStep.asyncErrors) {
        showAlertAction(sprintf(__('Infrastructure mapping %s already exists'), mappingWizardGeneralStep.values.name));
      } else {
        hideAlertAction();
        this.setState({
          activeStepIndex: Math.min(activeStepIndex + 1, mappingWizardSteps.length - 1)
        });
      }
    } else if (activeStepIndex === 2 && !warningModalVisible) {
      const { clusterMappings } = mappingWizardClustersStep.values;
      const { datastoresMappings } = mappingWizardDatastoresStep.values;

      const sourceClustersWithoutDatastoresMappings = getMappedSourceClusters(clusterMappings).filter(
        sourceCluster => !getSourceClustersWithMappings(datastoresMappings).includes(sourceCluster.id)
      );

      if (sourceClustersWithoutDatastoresMappings.length > 0) {
        showWarningModalAction(sourceClustersWithoutDatastoresMappings);
      } else {
        this.setState({
          activeStepIndex: Math.min(activeStepIndex + 1, mappingWizardSteps.length - 1)
        });
      }
    } else if (activeStepIndex === 3 && !warningModalVisible) {
      const { clusterMappings } = mappingWizardClustersStep.values;
      const { networksMappings } = mappingWizardNetworksStep.values;

      const sourceClustersWithoutNetworksMappings = getMappedSourceClusters(clusterMappings).filter(
        sourceCluster => !getSourceClustersWithMappings(networksMappings).includes(sourceCluster.id)
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
          activeStepIndex: Math.min(activeStepIndex + 1, mappingWizardSteps.length - 1)
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
        activeStepIndex: Math.min(activeStepIndex + 1, mappingWizardSteps.length - 1)
      });
    }
  };

  goToStep = activeStepIndex => {
    const { activeStepIndex: currentStep } = this.state;

    if (currentStep === 2 && activeStepIndex === 3) {
      this.nextStep();
    } else {
      this.setState(() => ({ activeStepIndex }));
    }
  };

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
      alertText, // NOTE: we may want to replace alertText and alertType with an alerts hash like we did in the PlanWizard
      alertType,
      hideAlertAction,
      editingMapping
    } = this.props;

    const { activeStepIndex, transformationsBody } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === mappingWizardSteps.length - 1;

    const currentStepProp = !onFinalStep && mappingWizardSteps[activeStepIndex];
    const currentStepForm = !onFinalStep && this.props[currentStepProp];
    const disableNextStep = !onFinalStep && (!!currentStepForm.syncErrors || !!currentStepForm.asyncErrors);

    return (
      <Wizard
        show={!hideMappingWizard}
        onClose={hideMappingWizardAction}
        onExited={mappingWizardExitedAction}
        backdrop="static"
      >
        <Wizard.Header
          onClose={hideMappingWizardAction}
          title={!editingMapping ? __('Create Infrastructure Mapping') : __('Edit Infrastructure Mapping')}
        />

        <Wizard.Body>
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
            alerts={alertText ? { singleAlert: { alertText, alertType } } : {}}
            hideAlertAction={hideAlertAction}
          />
        </Wizard.Body>
        <Wizard.Footer>
          {!onFinalStep && (
            <React.Fragment>
              <Button bsStyle="default" className="btn-cancel" onClick={hideMappingWizardAction}>
                {__('Cancel')}
              </Button>
              <Button bsStyle="default" onClick={this.prevStep} disabled={onFirstStep}>
                <Icon type="fa" name="angle-left" />
                {__('Back')}
              </Button>
            </React.Fragment>
          )}
          <Button
            bsStyle="primary"
            onClick={onFinalStep ? hideMappingWizardAction : this.nextStep}
            disabled={disableNextStep}
          >
            {onFinalStep
              ? __('Close')
              : activeStepIndex === 3
                ? editingMapping
                  ? __('Save')
                  : __('Create')
                : __('Next')}
            {!onFinalStep && <Icon type="fa" name="angle-right" />}
          </Button>
        </Wizard.Footer>
        <WarningModal
          warningModalVisible={warningModalVisible}
          hideWarningModalAction={hideWarningModalAction}
          onFinalStep={onFinalStep}
          activeStepIndex={activeStepIndex}
          nextStep={this.nextStep}
          sourceClustersWithoutMappings={sourceClustersWithoutMappings}
        />
      </Wizard>
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
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func,
  editingMapping: PropTypes.object
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
