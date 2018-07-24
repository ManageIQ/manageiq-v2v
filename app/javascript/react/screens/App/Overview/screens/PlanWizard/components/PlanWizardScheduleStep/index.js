import { connect } from 'react-redux';
import PlanWizardScheduleStep from './PlanWizardScheduleStep';

const mapStateToProps = () => ({
  initialValues: {
    migration_plan_choice_radio: 'migration_plan_later'
  }
});

export default connect(mapStateToProps)(PlanWizardScheduleStep);
