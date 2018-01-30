import Immutable from 'seamless-immutable';

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
