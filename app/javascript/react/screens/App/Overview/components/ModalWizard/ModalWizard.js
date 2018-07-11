import React from 'react';
import PropTypes from 'prop-types';
import { noop, Wizard, Icon, Button } from 'patternfly-react';
import { connect } from 'react-redux';

// TODO we should lift this application-specific stuff out of this generalized component file.
const reduxFormMap = {
  [__('Infrastructure Mapping Wizard')]: ['mappingWizardGeneralStep', 'mappingWizardClustersStep'],
  [__('Migration Plan Wizard')]: ['planWizardGeneralStep', 'planWizardVMStep']
};

// NOTE: This may be a good component to move up to patternfly-react.
// Let's try to avoid putting any application-specific code in here.

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
    stepButtonsDisabled,
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
    <Wizard show={showWizard} onHide={onHide} onExited={onExited} dialogClassName="modal-lg wizard-pf">
      <Wizard.Header onClose={onHide} title={title} />
      <Wizard.Body>
        {React.Children.map(children, child =>
          React.cloneElement(child, {
            activeStepIndex,
            activeStep,
            goToStep,
            stepButtonsDisabled,
            disableNextStep
          })
        )}
      </Wizard.Body>
      <Wizard.Footer>
        <Button bsStyle="default" className="btn-cancel" onClick={onHide}>
          {__('Cancel')}
        </Button>
        <Button bsStyle="default" onClick={onBack} disabled={onFirstStep}>
          <Icon type="fa" name="angle-left" />
          {__('Back')}
        </Button>
        <Button bsStyle="primary" onClick={onFinalStep ? onHide : onNext} disabled={disableNextStep}>
          {onFinalStep ? __('Close') : __('Next')}
          <Icon type="fa" name="angle-right" />
        </Button>
      </Wizard.Footer>
    </Wizard>
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
  stepButtonsDisabled: PropTypes.bool,
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
  stepButtonsDisabled: false,
  children: null
};

const mapStateToProps = state => ({
  formContainer: state.form
});

export default connect(mapStateToProps)(ModalWizard);
