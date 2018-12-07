import { createMigrationPlans } from '../helpers';
import { ospPlanReduxFormState, rhvPlanReduxFormState } from '../planWizard.fixtures';

describe('createMigrationPlans', () => {
  test('with an OSP target', () => {
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep
    } = ospPlanReduxFormState;
    const plansBody = createMigrationPlans(
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep
    );
    expect(plansBody).toMatchSnapshot();
  });

  test('with a RHV target and playbooks', () => {
    const {
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep
    } = rhvPlanReduxFormState;
    const plansBody = createMigrationPlans(
      planWizardGeneralStep,
      planWizardVMStep,
      planWizardInstancePropertiesStep,
      planWizardAdvancedOptionsStep
    );
    expect(plansBody).toMatchSnapshot();
  });
});
