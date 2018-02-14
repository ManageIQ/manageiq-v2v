import React from 'react';
import PropTypes from 'prop-types';
import {
  bindMethods,
  noop,
  EmptyState,
  Spinner,
  Wizard
} from 'patternfly-react';

class ModalWizardBody extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onStepClick', 'stepProps', 'renderLoading']);
  }

  onStepClick(stepIndex) {
    const { steps, goToStep } = this.props;
    const step = steps[stepIndex];
    goToStep(stepIndex);
    if (step && step.onClick) {
      step.onClick();
    }
    console.log('on step index click: ', stepIndex);
  }

  stepProps(stepIndex, title) {
    const { activeStep } = this.props;
    const label = (stepIndex + 1).toString();
    return {
      key: `wizard-step-${title}`,
      stepIndex,
      label,
      step: label,
      title,
      activeStep
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
            <Wizard.Contents>{renderedStep}</Wizard.Contents>
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
      onClick: PropTypes.func
    })
  ),
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  onClick: PropTypes.func,
  goToStep: PropTypes.func
};

ModalWizardBody.defaultProps = {
  loadingTitle: __('Loading Wizard...'),
  loadingMessage: __('Loading...'),
  loaded: false,
  steps: [{ title: __('General'), render: () => <p>{__('General')}</p> }],
  activeStepIndex: 0,
  activeStep: '1',
  onClick: noop,
  goToStep: noop
};

export default ModalWizardBody;
