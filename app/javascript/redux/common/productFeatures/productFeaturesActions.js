import URI from 'urijs';
import API from '../../../common/API';

import { FETCH_V2V_PRODUCT_FEATURES } from './productFeaturesConstants';

const _getProductFeaturesActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_PRODUCT_FEATURES,
    payload: API.get(url)
  });

export const fetchProductFeaturesAction = url => {
  const uri = new URI(url);
  return _getProductFeaturesActionCreator(uri.toString());
};
