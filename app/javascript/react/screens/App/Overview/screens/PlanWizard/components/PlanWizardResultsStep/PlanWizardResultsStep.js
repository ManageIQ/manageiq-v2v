import React from 'react';
import PropTypes from 'prop-types';
import { noop, Spinner } from 'patternfly-react';

class PlanWizardResultsStep extends React.Component {
  componentDidMount() {
    const { postPlansUrl, postMigrationPlansAction, plansBody } = this.props;

    postMigrationPlansAction(postPlansUrl, plansBody);
  }

  render() {
    const {
      isPostingPlans,
      isRejectedPostingPlans,
      migrationPlansResult,
      migrationRequestsResult,
      errorPostingPlans, // eslint-disable-line no-unused-vars
      plansBody
    } = this.props;

    if (isPostingPlans) {
      return (
        <div className="wizard-pf-process blank-slate-pf">
          <Spinner loading size="lg" className="blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            {__('Creating Migration Plans...')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Please wait while infrastructure mapping is created.')}
          </p>
        </div>
      );
    } else if (isRejectedPostingPlans) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {__('Error Creating Migration Plans')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__("We're' sorry, something went wrong. Please try again.")}
          </p>
          <button type="button" className="btn btn-lg btn-primary">
            {__('Retry')}
          </button>
        </div>
      );
    } else if (migrationPlansResult && migrationRequestsResult) {
      const migrationPlanProgress = sprintf(
        __(" Migration Plan: '%s' is in progress"),
        plansBody.name
      );
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="plan-wizard-results-step-icon">
            <span className="fa fa-clock-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {migrationPlanProgress}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__(
              'This may take a long time. Progress of the plan will be shown in the Migration area'
            )}
          </p>
        </div>
      );
    }
    return null;
  }
}
PlanWizardResultsStep.propTypes = {
  postPlansUrl: PropTypes.string,
  postMigrationPlansAction: PropTypes.func,
  plansBody: PropTypes.object,
  isPostingPlans: PropTypes.bool,
  isRejectedPostingPlans: PropTypes.bool,
  errorPostingPlans: PropTypes.object,
  migrationPlansResult: PropTypes.object,
  migrationRequestsResult: PropTypes.object
};
PlanWizardResultsStep.defaultProps = {
  postPlansUrl: '',
  postMigrationPlansAction: noop,
  plansBody: {},
  isPostingPlans: true,
  isRejectedPostingPlans: false,
  errorPostingPlans: null,
  migrationPlansResult: null,
  migrationRequestsResult: null
};
export default PlanWizardResultsStep;
