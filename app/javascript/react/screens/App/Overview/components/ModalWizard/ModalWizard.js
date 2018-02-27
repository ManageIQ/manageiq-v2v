import React from 'react';
import PropTypes from 'prop-types';
import { noop, controlled, bindMethods, Modal, Wizard, Icon, Button } from 'patternfly-react';
import { connect } from 'react-redux';

// TODO we should lift this application-specific stuff out of this generalized component file.
const reduxFormMap = {
  [__('Infrastructure Mapping Wizard')]: [
    'mappingWizardGeneralStep',
    'mappingWizardClustersStep'
  ],
  [__('Migration Plan Wizard')]: ['planWizardGeneralStep', 'planWizardCSVStep']
};

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
    const { setControlledState, onStepChanged, activeStepIndex, onNext, onBack } = this.props;
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
      children,
      formContainer
    } = this.props;
    const onFirstStep = activeStepIndex === 0;
    const onFinalStep = activeStepIndex === numSteps - 1;
    const activeStepStr = (activeStepIndex + 1).toString();

    const currentReduxForm = reduxFormMap[title][activeStepIndex];
    const disableNextStep =
      formContainer &&
      Object.prototype.hasOwnProperty.call(formContainer, currentReduxForm) &&
      !!formContainer[currentReduxForm].syncErrors;

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
            <Button bsStyle="default" onClick={this.onBackClick} disabled={onFirstStep}>
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
};

ModalWizard.propTypes = {
  showWizard: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  onStepChanged: PropTypes.func,
  activeStepIndex: PropTypes.number,
  numSteps: PropTypes.number,
  children: PropTypes.node,
  formContainer: PropTypes.object,
  setControlledState: PropTypes.func
};

ModalWizard.defaultProps = {
  showWizard: false,
  title: '',
  onHide: noop,
  onExited: noop,
  onBack: noop,
  onNext: noop,
  onStepChanged: noop,
  activeStepIndex: 0,
  numSteps: 1,
  children: null
};

const mapStateToProps = state => ({
  formContainer: state.form
});

const stateTypes = {
  activeStepIndex: PropTypes.number
};

const stateDefaults = {
  activeStepIndex: 0
};

export default connect(mapStateToProps)(
  controlled(stateTypes, stateDefaults)(ModalWizard)
);
