import { combineReducers } from 'redux';
import mappingWizard from './mappingWizard';

export function combineReducersAsync(asyncReducers) {
  return combineReducers({
    mappingWizard,
    ...asyncReducers
  });
}

export default combineReducersAsync();
