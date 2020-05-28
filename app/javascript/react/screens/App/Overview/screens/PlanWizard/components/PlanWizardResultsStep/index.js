import { connect } from 'react-redux';
import PlanWizardResultsStep from './PlanWizardResultsStep';
import * as PlanWizardResultsStepActions from './PlanWizardResultsStepActions';

import reducer from './PlanWizardResultsStepReducer';
import { findEditingPlan, getCurrentTargetProvider } from '../../PlanWizardSelectors';

export const reducers = { planWizardResultsStep: reducer };

const mapStateToProps = (
  { planWizardResultsStep, planWizard, overview: { transformationPlans, transformationMappings, editingPlanId }, form },
  ownProps
) => ({
  ...planWizardResultsStep,
  ...planWizard,
  ...ownProps.data,
  targetProvider: getCurrentTargetProvider(form, transformationMappings),
  editingPlan: findEditingPlan(transformationPlans, editingPlanId)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  PlanWizardResultsStepActions,
  mergeProps
)(PlanWizardResultsStep);
