import Immutable from 'seamless-immutable';

import { FETCH_V2V_PRODUCT_FEATURES } from './productFeaturesConstants';

export const initialState = Immutable({
  isFetchingProductFeatures: false,
  isRejectedProductFeatures: false,
  errorFetchingProductFeatures: null,
  productFeatures: []
});

const _parseProductFeatures = payload => {
  const productFeatures = {};
  payload.data.identity.miq_groups.forEach(group =>
    group.product_features.forEach(feature => (productFeatures[feature] = true))
  );
  return Object.keys(productFeatures);
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `${FETCH_V2V_PRODUCT_FEATURES}_PENDING`:
      return state.set('isFetchingProductFeatures', true).set('isRejectedProductFeatures', false);
    case `${FETCH_V2V_PRODUCT_FEATURES}_FULFILLED`:
      return state
        .set('productFeatures', _parseProductFeatures(action.payload))
        .set('isRejectedProductFeatures', false)
        .set('isFetchingProductFeatures', false);
    case `${FETCH_V2V_PRODUCT_FEATURES}_REJECTED`:
      return state
        .set('errorFetchingProductFeatures', action.payload)
        .set('isRejectedProductFeatures', true)
        .set('isFetchingProductFeatures', false);
    default:
      return state;
  }
};
