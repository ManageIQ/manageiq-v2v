import React from 'react';
import PropTypes from 'prop-types';
import {
  noop,
  controlled,
  bindMethods,
  Modal,
  Wizard,
  Icon,
  Button
} from 'patternfly-react';

// NOTE: This may be a good component to move up to patternfly-react.
// Let's try to avoid putting any application-specific code in here.

class ModalWizard extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onBackClick', 'onNextClick', 'goToStep']);
  }

  onBackClick() {
    this.goToStep(Math.max(this.props.activeStepIndex - 1, 0));
  }

  onNextClick() {
    const { numSteps, activeStepIndex } = this.props;
    this.goToStep(Math.min(activeStepIndex + 1, numSteps - 1));
  }

  goToStep(newStepIndex) {
    const {
      setControlledState,
      onStepChanged,
      activeStepIndex,
      onNext,
      onBack
    } = this.props;
    setControlledState({ activeStepIndex: newStepIndex });
    onStepChanged && onStepChanged(newStepIndex);
    onNext && newStepIndex === activeStepIndex + 1 && onNext();
    onBack && newStepIndex === activeStepIndex - 1 && onBack();
  }

  render() {
    const {
      title,
      showWizard,
      onHide,
      onExited,
      onBack,
      onNext,
      activeStepIndex,
      numSteps,
      shouldDisableNextStep,
      children
    } = this.props;
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === numSteps - 1;
    const activeStepStr = (activeStepIndex + 1).toString();

    const disableNextStep = shouldDisableNextStep(activeStepIndex);

    return (
      <Modal
        show={showWizard}
        onHide={onHide}
        onExited={onExited}
        dialogClassName="modal-lg wizard-pf"
      >
        <Wizard>
          <Modal.Header>
            <button
              className="close"
              onClick={onHide}
              aria-hidden="true"
              aria-label="Close"
            >
              <Icon type="pf" name="close" />
            </button>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="wizard-pf-body clearfix">
            {React.Children.map(children, child =>
              React.cloneElement(child, {
                activeStepIndex,
                activeStepStr,
                goToStep: this.goToStep,
                disableNextStep
              })
            )}
          </Modal.Body>
          <Modal.Footer className="wizard-pf-footer">
            <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
              {__('Cancel')}
            </Button>
            <Button
              bsStyle="default"
              onClick={this.onBackClick}
              disabled={onFirstStep}
            >
              <Icon type="fa" name="angle-left" />
              {__('Back')}
            </Button>
            <Button
              bsStyle="primary"
              onClick={onFinalStep ? onHide : this.onNextClick}
              disabled={disableNextStep}
            >
              {onFinalStep ? __('Close') : __('Next')}
              <Icon type="fa" name="angle-right" />
            </Button>
          </Modal.Footer>
        </Wizard>
      </Modal>
    );
  }
}

ModalWizard.propTypes = {
  showWizard: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onStepChanged: PropTypes.func,
  numSteps: PropTypes.number,
  shouldDisableNextStep: PropTypes.func,
  children: PropTypes.node
};

ModalWizard.defaultProps = {
  showWizard: false,
  title: '',
  onHide: noop,
  onExited: noop,
  onBack: noop,
  onNext: noop,
  onStepChanged: noop,
  numSteps: 1,
  shouldDisableNextStep: () => false,
  children: null
};

export default controlled({
  types: {
    activeStepIndex: PropTypes.number
  },
  defaults: {
    activeStepIndex: 0
  }
})(ModalWizard);
