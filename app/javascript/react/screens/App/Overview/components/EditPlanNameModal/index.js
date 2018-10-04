import { connect } from 'react-redux';
import EditPlanNameModal from './EditPlanNameModal';
import { findEditingPlan } from '../../screens/PlanWizard/PlanWizardSelectors';
import * as EditPlanNameActions from './EditPlanNameActions';

import reducer from './EditPlanNameReducer';

export const reducers = { editPlanName: reducer };

const mapStateToProps = ({ editPlanName, overview, form }) => {
  const plans = [...overview.transformationPlans, ...overview.archivedTransformationPlans];
  const editingPlan = findEditingPlan(plans, overview.editingPlanId);
  return {
    ...editPlanName,
    editPlanNameModal: form && form.editPlanNameModal,
    initialValues: {
      name: editingPlan ? editingPlan.name : '',
      description: editingPlan ? editingPlan.description : ''
    },
    enableReinitialize: true,
    editingPlan
  };
};

export default connect(
  mapStateToProps,
  EditPlanNameActions
)(EditPlanNameModal);
