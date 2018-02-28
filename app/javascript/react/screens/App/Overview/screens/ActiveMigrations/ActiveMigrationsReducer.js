import Immutable from 'seamless-immutable';
import _ from 'lodash';

import { FETCH_V2V_ACTIVE_MIGRATIONS } from './ActiveMigrationsConstants';

const initialState = Immutable({
  activeMigrations: [],
  isFetchingActiveMigrations: false,
  isRejectedActiveMigrations: false,
  errorActiveMigrations: ''
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_ACTIVE_MIGRATIONS}_PENDING`:
      return state.set('isFetchingActiveMigrations', true);
    case `${FETCH_V2V_ACTIVE_MIGRATIONS}_FULFILLED`:
      return state
        .set('activeMigrations', _.get(action, 'payload.data.resources', []))
        .set('isFetchingActiveMigrations', false);
    case `${FETCH_V2V_ACTIVE_MIGRATIONS}_REJECTED`:
      return state
        .set('errorActiveMigrations', action.payload)
        .set('isRejectedActiveMigrations', true)
        .set('isFetchingActiveMigrations', false);
    default:
      return state;
  }
};
