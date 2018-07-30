import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import componentRegistry from '../../../../../../components/componentRegistry';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardScheduleStep from '../PlanWizard/components/PlanWizardScheduleStep';

class PlanWizardBody extends React.Component {
  constructor(props) {
    super(props);

    this.planWizardVMStepContainer = componentRegistry.markup('PlanWizardVMStepContainer');
    this.planWizardResultsStepContainer = componentRegistry.markup('PlanWizardResultsStepContainer');
    this.planWizardAdvancedOptionsStepContainer = componentRegistry.markup('PlanWizardAdvancedOptionsStepContainer');
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  componentWillUnmount() {
    const { hideAlertAction } = this.props;
    hideAlertAction();
  }
  render() {
    return (
      <ModalWizard.Body
        {...this.props}
        loadingTitle={__('Loading Migration Plans...')}
        loadingMessage={__('This may take a minute.')}
        stepButtonsDisabled
        steps={[
          {
            title: __('General'),
            render: () => <PlanWizardGeneralStep />,
            disableGoto: !this.props.planWizardGeneralStep.values
          },
          {
            title: __('VMs'),
            render: () => this.planWizardVMStepContainer,
            disableGoto: !this.props.planWizardVMStep.values
          },
          {
            title: __('Advanced Options'),
            render: () => this.planWizardAdvancedOptionsStepContainer,
            disableGoto: true
          },
          {
            title: __('Schedule'),
            render: () => <PlanWizardScheduleStep />,
            disableGoto: true
          },
          {
            title: __('Results'),
            render: () => this.planWizardResultsStepContainer,
            disableGoto: true
          }
        ]}
      />
    );
  }
}

PlanWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool,
  plansBody: PropTypes.object,
  planWizardGeneralStep: PropTypes.object,
  planWizardVMStep: PropTypes.object,
  hideAlertAction: PropTypes.func
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true,
  plansBody: {},
  planWizardGeneralStep: {},
  planWizardVMStep: {},
  hideAlertAction: noop
};

export default PlanWizardBody;
