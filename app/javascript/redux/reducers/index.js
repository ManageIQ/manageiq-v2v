import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducers as overviewReducers } from '../../react/screens/App/Overview';
import { reducers as mappingWizardReducers } from '../../react/screens/App/Overview/screens/MappingWizard';
// import { reducers as mappingWizardGeneralStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardGeneralStep';
import { reducers as mappingWizardClustersStepReducers } from '../../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    ...overviewReducers,
    ...mappingWizardReducers,
    // This may not be required if using Redux form
    // ...mappingWizardGeneralStepReducers,
    ...mappingWizardClustersStepReducers,
    form: formReducer,
    ...asyncReducers
  });
}

export default combineReducersAsync();
