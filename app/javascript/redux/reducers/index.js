import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Overview/screens/MappingWizard';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import { reducers as activeMigrationReducers } from '../../react/screens/App/Overview/screens/ActiveMigrations';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...overviewReducers,
    ...activeMigrationReducers,
    ...mappingWizardReducers,
    // This may not be required if using Redux form
    ...mappingWizardClustersStepReducers,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
