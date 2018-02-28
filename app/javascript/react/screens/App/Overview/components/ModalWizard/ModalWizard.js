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
import ModalWizardBody from './ModalWizardBody';

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
    const { steps, activeStepIndex } = this.props;
    this.goToStep(Math.min(activeStepIndex + 1, steps.length - 1));
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
    onNext && newStepIndex === activeStepIndex + 1 && onNext(newStepIndex);
    onBack && newStepIndex === activeStepIndex - 1 && onBack(newStepIndex);
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
      steps,
      shouldDisableNextStep,
      children
    } = this.props;
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === steps.length - 1;
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
            <ModalWizardBody
              {...this.props}
              goToStep={this.goToStep}
              disabelNextStep={disableNextStep}
              activeStepStr={activeStepStr}
            />
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
  loadingTitle: __('Loading Wizard...'),
  loadingMessage: __('Loading...'),
  loaded: false,
  steps: [{ title: __('General'), render: () => <p>{__('General')}</p> }],
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
