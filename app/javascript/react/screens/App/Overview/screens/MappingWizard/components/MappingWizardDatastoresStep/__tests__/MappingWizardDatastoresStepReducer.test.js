import Immutable from 'seamless-immutable';

import datastoresReducer from '../MappingWizardDatastoresStepReducer';
import { FETCH_V2V_SOURCE_DATASTORES, FETCH_V2V_TARGET_DATASTORES } from '../MappingWizardDatastoresStepConstants';

import { sourceClusterDatastores, targetClusterDatastores } from '../mappingWizardDatastoresStep.fixtures';

const initialState = Immutable({
  isFetchingSourceDatastores: false,
  isRejectedSourceDatastores: false,
  errorSourceDatastores: null,
  isFetchingTargetDatastores: false,
  isRejectedTargetDatastores: false,
  errorTargetDatastores: null,
  sourceDatastores: [],
  targetDatastores: []
});

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = datastoresReducer(undefined, action);

  expect(state).toMatchSnapshot();
});

describe('fetching source datastores', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_DATASTORES}_PENDING`
    };
    const prevState = initialState.set('isRejectedSourceDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_DATASTORES}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSourceDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is fulfilled', () => {
    const payload = {
      sourceDatastores: [sourceClusterDatastores[0].storages[0]]
    };
    const action = {
      type: `${FETCH_V2V_SOURCE_DATASTORES}_FULFILLED`,
      payload
    };
    const prevState = initialState.set('isRejectedSourceDatastores', true).set('isFetchingSourceDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });
});

describe('fetching target datastores', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_DATASTORES}_PENDING`
    };
    const prevState = initialState.set('isRejectedTargetDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_DATASTORES}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingTargetDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is fulfilled', () => {
    const payload = {
      targetDatastores: [targetClusterDatastores[0].storages[0]]
    };
    const action = {
      type: `${FETCH_V2V_TARGET_DATASTORES}_FULFILLED`,
      payload
    };
    const prevState = initialState.set('isRejectedTargetDatastores', true).set('isFetchingTargetDatastores', true);
    const state = datastoresReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });
});
