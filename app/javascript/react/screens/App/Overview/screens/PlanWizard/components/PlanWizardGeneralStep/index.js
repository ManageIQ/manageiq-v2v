import { connect } from 'react-redux';
import PlanWizardGeneralStep from './PlanWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../PlanWizardActions';
import { findEditingPlan } from '../../PlanWizardSelectors';

const mapStateToProps = ({ overview }) => {
  const editingPlan = findEditingPlan(overview.transformationPlans, overview.editingPlanId);
  const prefilledMappingId =
    editingPlan &&
    editingPlan.options &&
    editingPlan.options.config_info &&
    editingPlan.options.config_info.transformation_mapping_id;
  return {
    transformationMappings: overview.transformationMappings,
    transformationPlans: overview.transformationPlans,
    archivedTransformationPlans: overview.archivedTransformationPlans,
    initialValues: {
      infrastructure_mapping: prefilledMappingId || overview.planWizardId,
      vm_choice_radio: 'vms_via_discovery',
      name: editingPlan ? editingPlan.name : '',
      description: editingPlan ? editingPlan.description : ''
    },
    enableReinitialize: true, // Tells redux-form to use new initialValues when they change
    editingPlan
  };
};

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(PlanWizardGeneralStep);
