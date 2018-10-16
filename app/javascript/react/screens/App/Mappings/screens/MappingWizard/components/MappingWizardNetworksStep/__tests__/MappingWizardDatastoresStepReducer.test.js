import Immutable from 'seamless-immutable';

import networksReducer from '../MappingWizardNetworksStepReducer';
import { FETCH_V2V_SOURCE_NETWORKS, FETCH_V2V_TARGET_NETWORKS } from '../MappingWizardNetworksStepConstants';

import { sourceClusterNetworks, targetClusterNetworks } from '../mappingWizardNetworksStep.fixtures';

const initialState = Immutable({
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  errorSourceNetworks: null,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false,
  errorTargetNetworks: null,
  sourceNetworks: [],
  targetNetworks: []
});

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = networksReducer(undefined, action);

  expect(state).toMatchSnapshot();
});

describe('fetching source networks', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_NETWORKS}_PENDING`
    };
    const prevState = initialState.set('isRejectedSourceNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_NETWORKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSourceNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is fulfilled', () => {
    const payload = {
      sourceNetworks: [sourceClusterNetworks[0].lans[0]]
    };
    const action = {
      type: `${FETCH_V2V_SOURCE_NETWORKS}_FULFILLED`,
      payload
    };
    const prevState = initialState.set('isRejectedSourceNetworks', true).set('isFetchingSourceNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });
});

describe('fetching target networks', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_NETWORKS}_PENDING`
    };
    const prevState = initialState.set('isRejectedTargetNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_NETWORKS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingTargetNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is fulfilled', () => {
    const payload = {
      targetNetworks: [targetClusterNetworks[0].lans[0]]
    };
    const action = {
      type: `${FETCH_V2V_TARGET_NETWORKS}_FULFILLED`,
      payload
    };
    const prevState = initialState.set('isRejectedTargetNetworks', true).set('isFetchingTargetNetworks', true);
    const state = networksReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });
});
