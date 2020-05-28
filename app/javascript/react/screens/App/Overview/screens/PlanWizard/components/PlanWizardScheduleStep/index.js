import { connect } from 'react-redux';
import PlanWizardScheduleStep from './PlanWizardScheduleStep';
import { getCurrentTargetProvider } from '../../PlanWizardSelectors';

const mapStateToProps = ({ overview: { transformationMappings }, form }) => ({
  targetProvider: getCurrentTargetProvider(form, transformationMappings),
  migration_plan_choice_radio:
    form.planWizardScheduleStep &&
    form.planWizardScheduleStep.values &&
    form.planWizardScheduleStep.values.migration_plan_choice_radio,
  initialValues: {
    migration_plan_choice_radio: 'migration_plan_later'
  }
});

export default connect(mapStateToProps)(PlanWizardScheduleStep);
