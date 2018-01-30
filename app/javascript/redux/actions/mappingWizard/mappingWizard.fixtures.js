import Immutable from 'seamless-immutable';

import {
  FETCH_V2V_SOURCE_CLUSTERS_PENDING,
  FETCH_V2V_SOURCE_CLUSTERS_FULFILLED,
  FETCH_V2V_SOURCE_CLUSTERS_REJECTED
} from '../../consts';

import { sourceClusters } from '../../reducers/mappingWizard/mappingWizard.fixtures';

export const requestData = {
  method: 'GET',
  url: '/api/sourceClusters',
  response: { sourceClusters }
};

export const initialState = Immutable({
  sourceClusters: [],
  url: requestData.url
});
