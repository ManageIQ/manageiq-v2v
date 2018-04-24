import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as notificationListReducers } from '../../react/screens/App/common/NotificationList';
import { reducers as planReducers } from '../../react/screens/App/Plan';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Overview/screens/MappingWizard';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import { reducers as mappingWizardDatastoresStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import { reducers as mappingWizardNetworksStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import { reducers as mappingWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';
import { reducers as planWizardReducers } from '../../react/screens/App/Overview/screens/PlanWizard';
import { reducers as planWizardVMStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardVMStep';
import { reducers as planWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...notificationListReducers,
    ...planReducers,
    ...overviewReducers,
    ...mappingWizardReducers,
    ...mappingWizardClustersStepReducers,
    ...mappingWizardDatastoresStepReducers,
    ...mappingWizardNetworksStepReducers,
    ...mappingWizardResultsStepReducers,
    ...planWizardReducers,
    ...planWizardVMStepReducers,
    ...planWizardResultsStepReducers,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
