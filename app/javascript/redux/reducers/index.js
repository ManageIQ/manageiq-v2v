import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Overview/screens/MappingWizard';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import { reducers as mappingWizardDatastoresStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import { reducers as mappingWizardNetworksStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import { reducers as mappingWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';
import { reducers as planWizardReducers } from '../../react/screens/App/Overview/screens/PlanWizard';
import { reducers as planWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import { reducers as migrationsCompletedReducers } from '../../react/screens/App/Overview/components/Cards/MigrationsCompletedCard';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...overviewReducers,
    ...migrationsCompletedReducers,
    ...mappingWizardReducers,
    ...mappingWizardClustersStepReducers,
    ...mappingWizardDatastoresStepReducers,
    ...mappingWizardNetworksStepReducers,
    ...mappingWizardResultsStepReducers,
    ...planWizardReducers,
    ...planWizardResultsStepReducers,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
