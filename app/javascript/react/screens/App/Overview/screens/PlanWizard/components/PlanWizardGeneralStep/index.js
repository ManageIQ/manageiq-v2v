import { connect } from 'react-redux';
import PlanWizardGeneralStep from './PlanWizardGeneralStep';

const mapStateToProps = ({ overview }) => ({
  transformationMappings: overview.transformationMappings,
  initialValues: {
    infrastructure_mapping: overview.planWizardId,
    vm_choice_radio: 'vms_via_discovery'
  }
});

export default connect(mapStateToProps)(PlanWizardGeneralStep);
