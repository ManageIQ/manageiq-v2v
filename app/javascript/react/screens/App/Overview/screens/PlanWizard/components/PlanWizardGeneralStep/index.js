import { connect } from 'react-redux';
import PlanWizardGeneralStep from './PlanWizardGeneralStep';
import { showAlertAction, hideAlertAction } from '../../PlanWizardActions';

const mapStateToProps = ({ overview }) => ({
  transformationMappings: overview.transformationMappings,
  transformationPlans: overview.transformationPlans,
  archivedTransformationPlans: overview.archivedTransformationPlans,
  initialValues: {
    infrastructure_mapping: overview.planWizardId,
    vm_choice_radio: 'vms_via_discovery'
  }
});

const actions = { showAlertAction, hideAlertAction };

export default connect(
  mapStateToProps,
  actions
)(PlanWizardGeneralStep);
