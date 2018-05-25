import React from 'react';
import PropTypes from 'prop-types';

class ModalWizardStateProvider extends React.Component {
  state = { activeStepIndex: 0 };

  prevStep = () => {
    const { activeStepIndex } = this.state;
    this.setState({ activeStepIndex: Math.max(activeStepIndex - 1, 0) });
  };

  nextStep = () => {
    const { numSteps } = this.props;
    const { activeStepIndex } = this.state;

    this.setState({
      activeStepIndex: Math.min(activeStepIndex + 1, numSteps - 1)
    });
  };

  goToStep = activeStepIndex => {
    this.setState({ activeStepIndex });
  };

  render() {
    const { numSteps, children } = this.props;
    const { activeStepIndex } = this.state;
    const activeStep = (activeStepIndex + 1).toString();
    return (
      <React.Fragment>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            numSteps,
            activeStepIndex,
            activeStep,
            onBack: this.prevStep,
            onNext: this.nextStep,
            goToStep: this.goToStep
          })
        )}
      </React.Fragment>
    );
  }
}

ModalWizardStateProvider.propTypes = {
  numSteps: PropTypes.number,
  children: PropTypes.node
};

ModalWizardStateProvider.defaultProps = {
  numSteps: 1,
  children: null
};

export default ModalWizardStateProvider;
