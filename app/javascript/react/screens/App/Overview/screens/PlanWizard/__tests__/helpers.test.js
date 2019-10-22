import { createMigrationPlans } from '../helpers';
import { ospPlanReduxFormState, rhvPlanReduxFormState } from '../planWizard.fixtures';

describe('createMigrationPlans', () => {
  test('with an OSP target', () => {
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep,
      planWizardScheduleStep
    } = ospPlanReduxFormState;
    const plansBody = createMigrationPlans(
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep,
      planWizardScheduleStep
    );
    expect(plansBody).toMatchSnapshot();
  });

  test('with a RHV target and playbooks', () => {
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep,
      planWizardScheduleStep
    } = rhvPlanReduxFormState;
    const plansBody = createMigrationPlans(
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep,
      planWizardScheduleStep
    );
    expect(plansBody).toMatchSnapshot();
  });
});
