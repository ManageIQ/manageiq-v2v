import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../../common/ModalWizard';

class PlanWizardBody extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  componentWillUnmount() {
    const { hideAlertAction } = this.props;
    hideAlertAction();
  }
  render() {
    const { wizardSteps } = this.props;
    return (
      <ModalWizard.Body
        {...this.props}
        loadingTitle={__('Loading Migration Plans...')}
        loadingMessage={__('This may take a minute.')}
        stepButtonsDisabled
        steps={wizardSteps}
      />
    );
  }
}

PlanWizardBody.propTypes = {
  wizardSteps: PropTypes.arrayOf(PropTypes.object).isRequired,
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool,
  plansBody: PropTypes.object,
  hideAlertAction: PropTypes.func
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true,
  plansBody: {},
  hideAlertAction: noop
};

export default PlanWizardBody;
