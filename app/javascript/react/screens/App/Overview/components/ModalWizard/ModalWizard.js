import React from 'react';
import PropTypes from 'prop-types';
import { noop, Modal, Wizard, Icon, Button } from 'patternfly-react';
import { connect } from 'react-redux';

const reduxFormMap = {
  [__('Infrastructure Mapping Wizard')]: [
    'mappingWizardGeneralStep',
    'mappingWizardClustersStep'
  ],
  [__('Migration Plan Wizard')]: []
};

const ModalWizard = props => {
  const {
    title,
    showWizard,
    onHide,
    onExited,
    onBack,
    onNext,
    activeStepIndex,
    activeStep,
    numSteps,
    goToStep,
    children,
    formContainer
  } = props;
  const onFirstStep = activeStepIndex === 0;
  const onFinalStep = activeStepIndex === numSteps - 1;

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
              activeStep,
              goToStep,
              disableNextStep
            })
          )}
        </Modal.Body>
        <Modal.Footer className="wizard-pf-footer">
          <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
            {__('Cancel')}
          </Button>
          <Button bsStyle="default" onClick={onBack} disabled={onFirstStep}>
            <Icon type="fa" name="angle-left" />
            {__('Back')}
          </Button>
          <Button
            bsStyle="primary"
            onClick={onFinalStep ? onHide : onNext}
            disabled={disableNextStep}
          >
            {onFinalStep ? __('Close') : __('Next')}
            <Icon type="fa" name="angle-right" />
          </Button>
        </Modal.Footer>
      </Wizard>
    </Modal>
  );
};

ModalWizard.propTypes = {
  showWizard: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  numSteps: PropTypes.number,
  goToStep: PropTypes.func,
  children: PropTypes.node,
  formContainer: PropTypes.object
};

ModalWizard.defaultProps = {
  showWizard: false,
  title: '',
  onHide: noop,
  onExited: noop,
  onBack: noop,
  onNext: noop,
  activeStepIndex: 0,
  activeStep: '1',
  numSteps: 1,
  goToStep: PropTypes.func,
  children: null
};

const mapStateToProps = state => ({
  formContainer: state.form
});

export default connect(mapStateToProps)(ModalWizard);
