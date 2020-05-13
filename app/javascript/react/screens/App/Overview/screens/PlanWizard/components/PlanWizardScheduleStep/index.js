import { connect } from 'react-redux';
import PlanWizardScheduleStep from './PlanWizardScheduleStep';
import { getCurrentTargetProvider } from '../../PlanWizardSelectors';

const enableWarmMigration = (allVms, selectedVms) =>
  allVms.filter(vm => selectedVms.includes(vm.id)).every(vm => vm.warm_migration_compatible);

const mapStateToProps = ({ planWizardVMStep, overview: { transformationMappings }, form }) => ({
  targetProvider: getCurrentTargetProvider(form, transformationMappings),
  migration_plan_choice_radio:
    form.planWizardScheduleStep &&
    form.planWizardScheduleStep.values &&
    form.planWizardScheduleStep.values.migration_plan_choice_radio,
  migration_plan_type_radio:
    form.planWizardScheduleStep &&
    form.planWizardScheduleStep.values &&
    form.planWizardScheduleStep.values.migration_plan_type_radio,
  initialValues: {
    migration_plan_choice_radio: 'migration_plan_later',
    migration_plan_type_radio: 'migration_type_cold'
  },
  enableWarmMigration: enableWarmMigration(
    [...planWizardVMStep.valid_vms, ...planWizardVMStep.invalid_vms, ...planWizardVMStep.conflict_vms],
    form.planWizardVMStep.values.selectedVms
  )
});

export default connect(mapStateToProps)(PlanWizardScheduleStep);
