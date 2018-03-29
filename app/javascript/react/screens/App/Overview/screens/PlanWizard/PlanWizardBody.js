import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import componentRegistry from '../../../../../../components/componentRegistry';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardCSVStep from '../PlanWizard/components/PlanWizardCSVStep';

class PlanWizardBody extends React.Component {
  constructor(props) {
    super(props);

    this.planWizardResultsStepContainer = componentRegistry.markup(
      'PlanWizardResultsStepContainer'
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
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
            render: () => <PlanWizardCSVStep />,
            disableGoto: !this.props.planWizardCSVStep.values
          },
          {
            title: __('Options'),
            render: () => <h3>Migration options</h3>,
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
  planWizardCSVStep: PropTypes.object
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true,
  plansBody: {},
  planWizardGeneralStep: {},
  planWizardCSVStep: {}
};

export default PlanWizardBody;
