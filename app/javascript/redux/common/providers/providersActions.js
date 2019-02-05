import URI from 'urijs';
import API from '../../../common/API';

import { FETCH_V2V_PROVIDERS } from './providersConstants';

const _getProvidersActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PROVIDERS,
    payload: API.get(url)
  });

export const fetchProvidersAction = url => {
  const uri = new URI(url);
  return _getProvidersActionCreator(uri.toString());
};
