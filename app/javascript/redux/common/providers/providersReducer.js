import Immutable from 'seamless-immutable';

import { FETCH_V2V_PROVIDERS } from './providersConstants';
import { validateProviders } from './providersValidators';
import { sufficientProviders, checkTargetProviders } from './providersHelpers';

export const initialState = Immutable({
  isFetchingProviders: false,
  isRejectedProviders: false,
  errorFetchingProviders: null,
  providers: [],
  hasSufficientProviders: false,
  hasTargetProvider: false
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PROVIDERS}_PENDING`:
      return state
        .set('isFetchingProviders', true)
        .set('isRejectedProviders', false)
        .set('errorFetchingProviders', null);
    case `${FETCH_V2V_PROVIDERS}_FULFILLED`:
      return (() => {
        const insufficient = state
          .set('hasSufficientProviders', false)
          .set('isFetchingProviders', false)
          .set('isRejectedProviders', false)
          .set('errorFetchingProviders', null);
        if (!action.payload.data || !action.payload.data.resources) {
          return insufficient;
        }
        validateProviders(action.payload.data.resources);
        return insufficient
          .set('hasSufficientProviders', sufficientProviders(action.payload.data.resources))
          .set('hasTargetProvider', checkTargetProviders(action.payload.data.resources))
          .set('providers', action.payload.data.resources);
      })();
    case `${FETCH_V2V_PROVIDERS}_REJECTED`:
      return state
        .set('isFetchingProviders', false)
        .set('isRejectedProviders', true)
        .set('errorFetchingProviders', action.payload);
    default:
      return state;
  }
};
