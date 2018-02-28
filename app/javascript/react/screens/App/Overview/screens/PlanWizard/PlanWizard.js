import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import PlanWizardGeneralStep from '../PlanWizard/components/PlanWizardGeneralStep';
import PlanWizardCSVStep from '../PlanWizard/components/PlanWizardCSVStep';
import { todo } from '../../../common/helpers';

const PlanWizard = props => {
  const {
    hidePlanWizard,
    hidePlanWizardAction,
    planWizardExitedAction,
    formContainer
  } = props;

  const wizardSteps = [
    {
      title: __('General'),
      render: () => <PlanWizardGeneralStep />,
      reduxFormKey: 'planWizardGeneralStep'
    },
    {
      title: __('VMs'),
      render: () => <PlanWizardCSVStep />,
      reduxFormKey: 'planWizardCSVStep'
    },
    {
      title: __('Results'),
      render: () => todo('Display Progress and Results')
    }
  ];

  return (
    <ModalWizard
      numSteps={3}
      showWizard={!hidePlanWizard}
      onHide={hidePlanWizardAction}
      onExited={planWizardExitedAction}
      title={__('Migration Plan Wizard')}
      shouldDisableNextStep={activeStepIndex => {
        const form = props[wizardSteps[activeStepIndex].reduxFormKey];
        return form && !!form.syncErrors;
      }}
      steps={wizardSteps}
      loadingTitle={__('Loading Clusters...')}
      loadingMessage={__('This may take a minute.')}
      loaded // TODO either remove these 3 props or set loaded to actual loading state
    />
  );
};

PlanWizard.propTypes = {
  hidePlanWizard: PropTypes.bool,
  hidePlanWizardAction: PropTypes.func,
  planWizardExitedAction: PropTypes.func,
  transformationMappings: PropTypes.array, // eslint-disable-line react/no-unused-prop-types
  formContainer: PropTypes.object
};
PlanWizard.defaultProps = {
  hidePlanWizard: true,
  hidePlanWizardAction: noop,
  planWizardExitedAction: noop,
  transformationMappings: [],
  formContainer: {}
};
export default PlanWizard;
