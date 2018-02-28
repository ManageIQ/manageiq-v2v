import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Overview/screens/MappingWizard';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import { reducers as mappingWizardDatastoresStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import { reducers as mappingWizardNetworksStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import { reducers as mappingWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';
import { reducers as planWizardResultsStepReducers } from '../../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...overviewReducers,
    ...mappingWizardReducers,
    ...mappingWizardClustersStepReducers,
    ...mappingWizardDatastoresStepReducers,
    ...mappingWizardNetworksStepReducers,
    ...mappingWizardResultsStepReducers,
    ...planWizardResultsStepReducers,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
