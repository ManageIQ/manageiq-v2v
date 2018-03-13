import { connect } from 'react-redux';
import PlanWizardGeneralStep from './PlanWizardGeneralStep';

const mapStateToProps = ({ overview }) => ({
  transformationMappings: overview.transformationMappings,
  initialValues: { infrastructure_mapping: overview.planWizardId }
});

export default connect(mapStateToProps)(PlanWizardGeneralStep);
