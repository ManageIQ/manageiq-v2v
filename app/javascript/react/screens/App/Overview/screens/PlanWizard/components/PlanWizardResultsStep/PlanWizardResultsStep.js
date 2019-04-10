import React from 'react';
import PropTypes from 'prop-types';
import { noop, Icon } from 'patternfly-react';
import { planHasBeenEdited } from './helpers';
import WizardLoadingState from '../../../../../common/WizardLoadingState';
import WizardErrorState from '../../../../../common/WizardErrorState';

class PlanWizardResultsStep extends React.Component {
  componentDidMount() {
    const {
      postPlansUrl,
      postMigrationPlansAction,
      editPlansUrl,
      editMigrationPlansAction,
      plansBody,
      planSchedule,
      editingPlan
    } = this.props;
    if (!editingPlan) {
      postMigrationPlansAction(postPlansUrl, plansBody, planSchedule);
    } else if (planHasBeenEdited(editingPlan, plansBody, planSchedule)) {
      editMigrationPlansAction(editPlansUrl, editingPlan.id, plansBody, planSchedule);
    }
  }
  renderResult = (migrationPlanMessage, migrationPlanFollowupMessage, migrationPlanIcon, showVmPowerWarning) => (
    <div className="wizard-pf-complete blank-slate-pf">
      <div className="modal-wizard-results-grey-icon">
        <span className={migrationPlanIcon} />
      </div>
      <h3 className="blank-slate-pf-main-action" id="migration-plan-results-message">
        {migrationPlanMessage}
      </h3>
      <p className="blank-slate-pf-secondary-action">{migrationPlanFollowupMessage}</p>
      {showVmPowerWarning && (
        <div className="plan-wizard-vm-power-warning">
          <Icon type="pf" name="warning-triangle-o" />
          <p>
            {__('VMs must be powered on in order to migrate.')}
            <br />
            {__('Ensure that all VMs in the Migration Plan are powered on before starting migration.')}
          </p>
        </div>
      )}
    </div>
  );

  render() {
    const {
      isPostingPlans,
      isRejectedPostingPlans,
      isPuttingPlans,
      isRejectedPuttingPlans,
      migrationPlansResult,
      migrationRequestsResult,
      errorPostingPlans,
      errorPuttingPlans,
      plansBody,
      planSchedule,
      hidePlanWizardAction,
      targetProvider
    } = this.props;

    if (isPostingPlans) {
      return <WizardLoadingState title={__('Creating Migration Plan...')} />;
    } else if (isRejectedPostingPlans) {
      const errorData = errorPostingPlans && errorPostingPlans.data;
      const errorMessage = errorData && errorData.error && errorData.error.message;
      return (
        <WizardErrorState
          title={__('Error Creating Migration Plan')}
          message={errorMessage}
          onClose={hidePlanWizardAction}
        />
      );
    } else if (isPuttingPlans) {
      return <WizardLoadingState title={__('Saving Migration Plan...')} />;
    } else if (isRejectedPuttingPlans) {
      const errorData = errorPuttingPlans && errorPuttingPlans.data;
      const errorMessage = errorData && errorData.error && errorData.error.message;
      return (
        <WizardErrorState
          title={__('Error Saving Migration Plan')}
          message={errorMessage}
          onClose={hidePlanWizardAction}
        />
      );
    } else if (planSchedule === 'migration_plan_later' && migrationPlansResult) {
      const migrationPlanSaved = sprintf(__(" Migration Plan: '%s' has been saved"), plansBody.name);
      const migrationPlanFollowupMessage = __('Select Migrate on the Migration Plans page to begin migration');
      const showVmPowerWarning = targetProvider === 'openstack';
      return this.renderResult(
        migrationPlanSaved,
        migrationPlanFollowupMessage,
        'pficon pficon-ok',
        showVmPowerWarning
      );
    } else if (planSchedule === 'migration_plan_now' && migrationPlansResult && migrationRequestsResult) {
      const migrationPlanProgress = sprintf(__(" Migration Plan: '%s' is in progress"), plansBody.name);
      const migrationPlanFollowupMessage = __('This may take a long time. Progress of the plan will be shown in the Migration area'); // prettier-ignore
      return this.renderResult(migrationPlanProgress, migrationPlanFollowupMessage, 'fa fa-clock-o');
    }
    return null;
  }
}
PlanWizardResultsStep.propTypes = {
  postPlansUrl: PropTypes.string,
  editPlansUrl: PropTypes.string,
  postMigrationPlansAction: PropTypes.func,
  editMigrationPlansAction: PropTypes.func,
  plansBody: PropTypes.object,
  planSchedule: PropTypes.string,
  isPostingPlans: PropTypes.bool,
  isRejectedPostingPlans: PropTypes.bool,
  errorPostingPlans: PropTypes.object,
  isPuttingPlans: PropTypes.bool,
  isRejectedPuttingPlans: PropTypes.bool,
  errorPuttingPlans: PropTypes.object,
  migrationPlansResult: PropTypes.object,
  migrationRequestsResult: PropTypes.object,
  hidePlanWizardAction: PropTypes.func,
  editingPlan: PropTypes.object,
  targetProvider: PropTypes.string
};
PlanWizardResultsStep.defaultProps = {
  postPlansUrl: '/api/service_templates',
  editPlansUrl: '/api/service_templates',
  postMigrationPlansAction: noop,
  editMigrationPlansAction: noop,
  plansBody: {},
  planSchedule: '',
  isPostingPlans: true,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  migrationPlansResult: null,
  migrationRequestsResult: null,
  hidePlanWizardAction: noop
};
export default PlanWizardResultsStep;
