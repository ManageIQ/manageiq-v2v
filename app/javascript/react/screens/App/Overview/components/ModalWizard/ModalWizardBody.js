import React from 'react';
import PropTypes from 'prop-types';
import {
  bindMethods,
  noop,
  EmptyState,
  Spinner,
  Wizard
} from 'patternfly-react';

// NOTE: This may be a good component to move up to patternfly-react.
// Let's try to avoid putting any application-specific code in here.

class ModalWizardBody extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onStepClick', 'stepProps', 'renderLoading']);
  }

  onStepClick(stepIndex) {
    const { steps, goToStep, disableNextStep, activeStepIndex } = this.props;
    // Don't allow step clicks to skip into the future, but skipping into the past is ok.
    if (disableNextStep || stepIndex > activeStepIndex + 1) return;
    goToStep(stepIndex);
  }

  stepProps(stepIndex, title) {
    const { activeStepStr } = this.props;
    const label = (stepIndex + 1).toString();
    return {
      key: `wizard-step-${title}`,
      stepIndex,
      label,
      step: label,
      title,
      activeStep: activeStepStr
    };
  }

  renderLoading() {
    const { loadingTitle, loadingMessage } = this.props;
    return (
      <Wizard.Row>
        <Wizard.Main>
          <EmptyState>
            <Spinner size="lg" className="blank-slate-pf-icon" loading />
            <EmptyState.Action>
              <h3>{loadingTitle}</h3>
            </EmptyState.Action>
            <EmptyState.Action secondary>
              <p>{loadingMessage}</p>
            </EmptyState.Action>
          </EmptyState>
        </Wizard.Main>
      </Wizard.Row>
    );
  }

  render() {
    const { loaded, steps, activeStepIndex } = this.props;
    const step = steps[activeStepIndex];

    if (!loaded) {
      return this.renderLoading();
    }

    const renderedStep =
      step && step.render && step.render(activeStepIndex, step.title);

    return (
      <React.Fragment>
        <Wizard.Steps
          steps={steps.map((stepObj, index) => (
            <Wizard.Step
              {...this.stepProps(index, stepObj.title)}
              onClick={() => this.onStepClick(index)}
            />
          ))}
        />
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.Contents
              stepIndex={activeStepIndex}
              activeStepIndex={activeStepIndex}
            >
              {renderedStep}
            </Wizard.Contents>
          </Wizard.Main>
        </Wizard.Row>
      </React.Fragment>
    );
  }
}

ModalWizardBody.propTypes = {
  loadingTitle: PropTypes.string,
  loadingMessage: PropTypes.string,
  loaded: PropTypes.bool,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      render: PropTypes.func,
      onNext: PropTypes.func
    })
  ),
  activeStepIndex: PropTypes.number,
  activeStepStr: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool
};

ModalWizardBody.defaultProps = {
  loadingTitle: __('Loading Wizard...'),
  loadingMessage: __('Loading...'),
  loaded: false,
  steps: [{ title: __('General'), render: () => <p>{__('General')}</p> }],
  activeStepIndex: 0,
  activeStepStr: '1',
  goToStep: noop,
  disableNextStep: false
};

export default ModalWizardBody;
