import { connect } from 'react-redux';
import PlanWizardOptionsStep from './PlanWizardOptionsStep';

const mapStateToProps = () => ({
  initialValues: {
    migration_plan_choice_radio: 'migration_plan_later'
  }
});

export default connect(mapStateToProps)(PlanWizardOptionsStep);
