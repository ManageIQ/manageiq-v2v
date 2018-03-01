import Immutable from 'seamless-immutable';

import { FETCH_V2V_MIGRATIONS_COMPLETED } from './MigrationsCompletedConstants';

const initialState = Immutable({
  migrationsCompleted: [],
  isFetchingMigrationsCompleted: false,
  isRejectedMigrationsCompleted: false,
  errorMigrationsCompleted: null
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_MIGRATIONS_COMPLETED}_PENDING`:
      return state.set('isFetchingMigrationsCompleted', true);
    case `${FETCH_V2V_MIGRATIONS_COMPLETED}_FULFILLED`:
      return state
        .set('migrationsCompleted', action.payload.data.resources)
        .set('isFetchingMigrationsCompleted', false);
    case `${FETCH_V2V_MIGRATIONS_COMPLETED}_REJECTED`:
      return state
        .set('errorMigrationsCompleted', action.payload)
        .set('isRejectedMigrationsCompleted', true)
        .set('isFetchingMigrationsCompleted', false);
    default:
      return state;
  }
};
