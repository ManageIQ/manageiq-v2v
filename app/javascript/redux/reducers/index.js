import { reducer as formReducer } from 'redux-form';
import { reducers as notificationListReducers } from '../../react/screens/App/common/NotificationList';
import { reducers as planReducers } from '../../react/screens/App/Plan';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingsReducers } from '../../react/screens/App/Mappings';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Mappings/screens/MappingWizard';
import { reducers as mappingWizardGeneralStepReducers } from '../../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardGeneralStep';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardClustersStep';
import { reducers as mappingWizardDatastoresStepReducers } from '../../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardDatastoresStep';
import { reducers as mappingWizardNetworksStepReducers } from '../../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardNetworksStep';
import { reducers as mappingWizardResultsStepReducers } from '../../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardResultsStep';
import { reducers as planWizardReducers } from '../../react/screens/App/Overview/screens/PlanWizard';
import { reducers as planWizardVMStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardVMStep';
import { reducers as planWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import { reducers as planWizardAdvancedOptionsStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardAdvancedOptionsStep';
import { reducers as planWizardInstancePropertiesStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardInstancePropertiesStep';
import { reducers as editPlanNameReducers } from '../../react/screens/App/Overview/components/EditPlanNameModal';

export default () => ({
  ...notificationListReducers,
  ...planReducers,
  ...overviewReducers,
  ...mappingsReducers,
  ...mappingWizardReducers,
  ...mappingWizardGeneralStepReducers,
  ...mappingWizardClustersStepReducers,
  ...mappingWizardDatastoresStepReducers,
  ...mappingWizardNetworksStepReducers,
  ...mappingWizardResultsStepReducers,
  ...planWizardReducers,
  ...planWizardVMStepReducers,
  ...planWizardResultsStepReducers,
  ...planWizardAdvancedOptionsStepReducers,
  ...planWizardInstancePropertiesStepReducers,
  ...editPlanNameReducers,
  form: formReducer
});
