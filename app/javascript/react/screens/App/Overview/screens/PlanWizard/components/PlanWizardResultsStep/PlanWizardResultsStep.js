import React from 'react';
import PropTypes from 'prop-types';
import { noop, Spinner } from 'patternfly-react';

class PlanWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postPlansUrl, postMigrationPlansAction, putPlansUrl, putMigrationPlansAction, plansBody, planSchedule, editingPlan } = this.props;
    if (!editingPlan) {
      postMigrationPlansAction(postPlansUrl, plansBody, planSchedule);
    } else {
      putMigrationPlansAction(putPlansUrl, editingPlan.id, plansBody, planSchedule);
    }
  }
  renderSpinner = (title, message) => (
    <div className="wizard-pf-process blank-slate-pf">
      <Spinner loading size="lg" className="blank-slate-pf-icon" />
      <h3 className="blank-slate-pf-main-action">{title}</h3>
      <p className="blank-slate-pf-secondary-action">
        {message}
      </p>
    </div>
  );
  renderError = (title, message, closeAction) => (
    <div className="wizard-pf-complete blank-slate-pf">
      <div className="wizard-pf-success-icon">
        <span className="pficon pficon-error-circle-o" />
      </div>
      <h3 className="blank-slate-pf-main-action">{title}</h3>
      <p className="blank-slate-pf-secondary-action">{message}</p>
      <button type="button" className="btn btn-lg btn-primary" onClick={hidePlanWizardAction}>
        {__('Close')}
      </button>
    </div>
  );
  renderResult = (migrationPlanMessage, migrationPlanFollowupMessage, migrationPlanIcon) => (
    <div className="wizard-pf-complete blank-slate-pf">
      <div className="plan-wizard-results-step-icon">
        <span className={migrationPlanIcon} />
      </div>
      <h3 className="blank-slate-pf-main-action" id="migration-plan-results-message">
        {migrationPlanMessage}
      </h3>
      <p className="blank-slate-pf-secondary-action">{migrationPlanFollowupMessage}</p>
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
      hidePlanWizardAction
    } = this.props;

    if (isPostingPlans) {
      return this.renderSpinner(__('Creating Migration Plan...'), __('Please wait while the migration plan is created.'));
    } else if (isRejectedPostingPlans) {
      const errorData = errorPostingPlans && errorPostingPlans.data;
      const errorMessage = errorData && errorData.error && errorData.error.message;
      return this.renderError(__('Error Creating Migration Plan'), errorMessage, hidePlanWizardAction);
    } else if (isPuttingPlans) {
      return this.renderSpinner(__('Saving Migration Plan...'), __('Please wait while the migration plan is saved.'));
    } else if (isRejectedPuttingPlans) {
      const errorData = errorPuttingPlans && errorPuttingPlans.data;
      const errorMessage = errorData && errorData.error && errorData.error.message;
      return this.renderError(__('Error Saving Migration Plan'), errorMessage, hidePlanWizardAction);
    } else if (planSchedule === 'migration_plan_later' && migrationPlansResult) {
      const migrationPlanSaved = sprintf(__(" Migration Plan: '%s' has been saved"), plansBody.name);
      const migrationPlanFollowupMessage = __('Select Migrate on the Overview page to begin migration');
      return this.renderResult(migrationPlanSaved, migrationPlanFollowupMessage, 'pficon pficon-ok');
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
  putPlansUrl: PropTypes.string,
  postMigrationPlansAction: PropTypes.func,
  putMigrationPlansAction: PropTypes.func,
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
  editingPlan: PropTypes.object
};
PlanWizardResultsStep.defaultProps = {
  postPlansUrl: '/api/service_templates',
  putPlansUrl: '/api/service_templates',
  postMigrationPlansAction: noop,
  putMigrationPlansAction: noop,
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
