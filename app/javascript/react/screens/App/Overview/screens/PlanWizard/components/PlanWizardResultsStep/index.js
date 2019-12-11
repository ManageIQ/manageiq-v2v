import { connect } from 'react-redux';
import PlanWizardResultsStep from './PlanWizardResultsStep';
import * as PlanWizardResultsStepActions from './PlanWizardResultsStepActions';

import reducer from './PlanWizardResultsStepReducer';
import { findEditingPlan, getTargetProviderType } from '../../PlanWizardSelectors';

export const reducers = { planWizardResultsStep: reducer };

const mapStateToProps = (
  { planWizardResultsStep, planWizard, overview, overview: { transformationPlans, editingPlanId }, form },
  ownProps
) => ({
  ...planWizardResultsStep,
  ...planWizard,
  ...ownProps.data,
  targetProvider: getTargetProviderType({ form, overview }),
  editingPlan: findEditingPlan(transformationPlans, editingPlanId)
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  PlanWizardResultsStepActions,
  mergeProps
)(PlanWizardResultsStep);
