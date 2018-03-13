import Immutable from 'seamless-immutable';

import { FETCH_V2V_MIGRATIONS_IN_PROGRESS } from './MigrationsInProgressConstants';

const initialState = Immutable({
  migrationsInProgress: [],
  isFetchingMigrationsInProgress: false,
  isRejectedMigrationsInProgress: false,
  errorMigrationsInProgress: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_PENDING`:
      return state.set('isFetchingMigrationsInProgress', true);
    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_FULFILLED`:
      return state
        .set('migrationsInProgress', action.payload.data.resources)
        .set('isFetchingMigrationsInProgress', false);
    case `${FETCH_V2V_MIGRATIONS_IN_PROGRESS}_REJECTED`:
      return state
        .set('errorMigrationsInProgress', action.payload)
        .set('isRejectedMigrationsInProgress', true)
        .set('isFetchingMigrationsInProgress', false);
    default:
      return state;
  }
};
