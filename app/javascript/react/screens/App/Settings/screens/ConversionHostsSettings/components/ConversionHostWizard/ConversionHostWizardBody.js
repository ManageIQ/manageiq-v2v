import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../../../../common/ModalWizard';

class ConversionHostWizardBody extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  render() {
    const { wizardSteps } = this.props;
    return <ModalWizard.Body {...this.props} stepButtonsDisabled steps={wizardSteps} />;
  }
}

ConversionHostWizardBody.propTypes = {
  wizardSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool,
  plansBody: PropTypes.object
};

ConversionHostWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true
};

export default ConversionHostWizardBody;
