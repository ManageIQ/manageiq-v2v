import { combineReducers } from 'redux';
import { reducers as overviewReducers } from '../../app/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../app/screens/App/Overview/screens/MappingWizard';
import { reducers as mappingWizardClustersStepReducers } from '../../app/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...overviewReducers,
    ...mappingWizardReducers,
    ...mappingWizardClustersStepReducers,
    ...asyncReducers
  });
}

export default combineReducersAsync();
