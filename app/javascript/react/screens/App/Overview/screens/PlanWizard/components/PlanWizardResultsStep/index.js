import { connect } from 'react-redux';
import PlanWizardResultsStep from './PlanWizardResultsStep';
import * as PlanWizardResultsStepActions from './PlanWizardResultsStepActions';
import { getMappingType } from '../../../../components/InfrastructureMappingsList/helpers';

import reducer from './PlanWizardResultsStepReducer';
import { findEditingPlan } from '../../PlanWizardSelectors';

export const reducers = { planWizardResultsStep: reducer };

const mapStateToProps = (
  { planWizardResultsStep, planWizard, overview: { transformationPlans, transformationMappings, editingPlanId }, form },
  ownProps
) => {
  const mappingId = form.planWizardGeneralStep.values.infrastructure_mapping;
  const selectedMapping = transformationMappings.find(mapping => mapping.id === mappingId);
  const targetProvider = getMappingType(selectedMapping.transformation_mapping_items);
  return {
    ...planWizardResultsStep,
    ...planWizard,
    ...ownProps.data,
    targetProvider,
    editingPlan: findEditingPlan(transformationPlans, editingPlanId)
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  PlanWizardResultsStepActions,
  mergeProps
)(PlanWizardResultsStep);
