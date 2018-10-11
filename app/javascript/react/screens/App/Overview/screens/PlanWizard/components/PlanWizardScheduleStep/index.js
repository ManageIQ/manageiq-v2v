import { connect } from 'react-redux';
import PlanWizardScheduleStep from './PlanWizardScheduleStep';
import { getMappingType } from '../../../../components/InfrastructureMappingsList/helpers';

const mapStateToProps = ({ overview, form }) => {
  const mappingId = form.planWizardGeneralStep.values.infrastructure_mapping;
  const selectedMapping = overview.transformationMappings.find(mapping => mapping.id === mappingId);
  const targetProvider = getMappingType(selectedMapping.transformation_mapping_items);
  return {
    targetProvider,
    migration_plan_choice_radio:
      form.planWizardScheduleStep && form.planWizardScheduleStep.values.migration_plan_choice_radio,
    initialValues: {
      migration_plan_choice_radio: 'migration_plan_later'
    }
  };
};

export default connect(mapStateToProps)(PlanWizardScheduleStep);
