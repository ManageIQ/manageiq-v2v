import React from 'react';
import PropTypes from 'prop-types';
import { Wizard, Button, Icon } from 'patternfly-react';

import { stepIDs } from './ConversionHostWizardConstants';
import ConversionHostWizardBody from './ConversionHostWizardBody';
import ConversionHostWizardTargetProviderStep from './ConversionHostWizardTargetProviderStep';
import ConversionHostWizardHostsStep from './ConversionHostWizardHostsStep';
import ConversionHostWizardAuthConfigStep from './ConversionHostWizardAuthConfigStep';
import ConversionHostWizardResultsStep from './ConversionHostWizardResultsStep';

class ConversionHostWizard extends React.Component {
  state = { activeStepIndex: 0 };

  getWizardSteps = () => [
    {
      id: stepIDs.targetProviderStep,
      title: __('Target Provider'),
      render: () => <ConversionHostWizardTargetProviderStep />
    },
    {
      id: stepIDs.hostsStep,
      title: __('Host(s)'),
      render: () => <ConversionHostWizardHostsStep />
    },
    {
      id: stepIDs.authConfigStep,
      title: __('Auth Config'),
      render: () => <ConversionHostWizardAuthConfigStep />
    },
    {
      id: stepIDs.resultsStep,
      title: __('Results'),
      render: () => <ConversionHostWizardResultsStep />
    }
  ];

  getActiveWizardStep = () => {
    const { activeStepIndex } = this.state;
    return this.getWizardSteps()[activeStepIndex];
  };

  prevStep = () => {
    const { activeStepIndex } = this.state;
    this.goToStep(Math.max(activeStepIndex - 1, 0));
  };

  nextStep = () => {
    const { activeStepIndex } = this.state;
    const wizardSteps = this.getWizardSteps();
    this.goToStep(Math.min(activeStepIndex + 1, wizardSteps.length - 1));
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
    const { hideConversionHostWizard } = this.props;
    const { activeStepIndex } = this.state;
    const activeStepNumber = (activeStepIndex + 1).toString();

    const wizardSteps = this.getWizardSteps();
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === wizardSteps.length - 1;

    const activeStep = this.getActiveWizardStep();

    const disableNextStep = false; // TODO

    return (
      <Wizard show onClose={hideConversionHostWizard} onExited={hideConversionHostWizard} backdrop="static">
        <Wizard.Header onClose={hideConversionHostWizard} title={__('Configure Conversion Host')} />
        <Wizard.Body>
          <ConversionHostWizardBody
            wizardSteps={wizardSteps}
            loaded
            activeStepIndex={activeStepIndex}
            activeStep={activeStepNumber}
            goToStep={this.goToStep}
            disableNextStep={disableNextStep}
          />
        </Wizard.Body>
        <Wizard.Footer className="wizard-pf-footer">
          <Button bsStyle="default" className="btn-cancel" onClick={hideConversionHostWizard} disabled={onFinalStep}>
            {__('Cancel')}
          </Button>
          <Button bsStyle="default" onClick={this.prevStep} disabled={onFirstStep || onFinalStep}>
            <Icon type="fa" name="angle-left" />
            {__('Back')}
          </Button>
          <Button
            bsStyle="primary"
            onClick={onFinalStep ? hideConversionHostWizard : this.nextStep}
            disabled={disableNextStep}
          >
            {onFinalStep ? __('Close') : activeStep.id === stepIDs.authConfigStep ? __('Configure') : __('Next')}
            <Icon type="fa" name="angle-right" />
          </Button>
        </Wizard.Footer>
      </Wizard>
    );
  }
}

ConversionHostWizard.propTypes = {
  hideConversionHostWizard: PropTypes.func
};

export default ConversionHostWizard;
