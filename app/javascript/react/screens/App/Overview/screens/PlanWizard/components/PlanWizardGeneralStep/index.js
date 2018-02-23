import { connect } from 'react-redux';
import PlanWizardGeneralStep from './PlanWizardGeneralStep';

const mapStateToProps = state => ({
  transformationMappings: state.overview.transformationMappings
});

export default connect(mapStateToProps)(PlanWizardGeneralStep);
