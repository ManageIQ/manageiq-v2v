import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { noop, EmptyState, Spinner, Wizard, Alert } from 'patternfly-react';

// NOTE: This may be a good component to move up to patternfly-react.
// Let's try to avoid putting any application-specific code in here.

class ModalWizardBody extends React.Component {
  onStepClick = (stepIndex, disableGoto) => {
    const { steps, goToStep, disableNextStep, activeStepIndex } = this.props;
    const nextStepClicked = stepIndex === activeStepIndex + 1;
    if (disableGoto || (nextStepClicked && disableNextStep)) return;
    const step = steps[stepIndex];
    goToStep(stepIndex);
    if (step && step.onClick) {
      step.onClick();
    }
  };

  stepProps = (stepIndex, title) => {
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
  };

  renderLoading = () => {
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
  };

  render() {
    const { loaded, steps, activeStepIndex, alerts, hideAlertAction, stepButtonsDisabled } = this.props;
    const step = steps[activeStepIndex];

    if (!loaded) {
      return this.renderLoading();
    }

    const renderedStep = step && step.render && step.render(activeStepIndex, step.title);

    return (
      <React.Fragment>
        <div className="modal-wizard-alert">
          {Object.values(alerts).map(({ alertText, alertType, alertId }) => (
            <Alert
              key={alertId}
              className="modal-wizard-alert--alert is-visible"
              type={alertType}
              onDismiss={() => hideAlertAction(alertId)}
            >
              {alertText}
            </Alert>
          ))}
        </div>
        <Wizard.Steps
          className={cx({ 'step-buttons-disabled': stepButtonsDisabled })}
          steps={steps.map((stepObj, index) => {
            const disabled = stepButtonsDisabled || stepObj.disabled;
            return (
              <Wizard.Step
                {...this.stepProps(index, stepObj.title)}
                onClick={() => this.onStepClick(index, disabled)}
                className={disabled && cx('is-disabled')}
              />
            );
          })}
        />
        <Wizard.Row>
          <Wizard.Main>
            <Wizard.Contents stepIndex={activeStepIndex} activeStepIndex={activeStepIndex}>
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
      onClick: PropTypes.func
    })
  ),
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  onClick: PropTypes.func,
  goToStep: PropTypes.func,
  stepButtonsDisabled: PropTypes.bool,
  disableNextStep: PropTypes.bool,
  alerts: PropTypes.objectOf(PropTypes.shape({ alertText: PropTypes.node, alertType: PropTypes.string })),
  hideAlertAction: PropTypes.func
};

ModalWizardBody.defaultProps = {
  loadingTitle: __('Loading Wizard...'),
  loadingMessage: __('Loading...'),
  loaded: false,
  steps: [{ title: __('General'), render: () => <p>{__('General')}</p> }],
  activeStepIndex: 0,
  activeStep: '1',
  onClick: noop,
  goToStep: noop,
  stepButtonsDisabled: false,
  disableNextStep: true,
  alerts: {},
  hideAlertAction: noop
};

export default ModalWizardBody;
