import Immutable from 'seamless-immutable';

import { FETCH_V2V_PROVIDERS } from '../providersConstants';
import providersReducer, { initialState } from '../providersReducer';
import { providers } from '../providers.fixtures';

describe('fetching providers', () => {
  test('is pending', () => {
    const action = { type: `${FETCH_V2V_PROVIDERS}_PENDING` };
    const state = providersReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      isFetchingProviders: true
    });
  });

  test('is successful with sufficient providers', () => {
    const payload = { data: providers };
    const action = {
      type: `${FETCH_V2V_PROVIDERS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true,
      isRejectedProviders: true,
      errorFetchingProviders: 'error'
    });
    const state = providersReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingProviders: false,
      isRejectedProviders: false,
      errorFetchingProviders: null,
      hasSufficientProviders: true,
      hasTargetProvider: true,
      providers: providers.resources
    });
  });

  test('is successful with insufficient providers', () => {
    const payload = { data: [{ type: 'unrelated' }, { type: 'stuff' }] };
    const action = {
      type: `${FETCH_V2V_PROVIDERS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true,
      isRejectedProviders: true
    });
    const state = providersReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isFetchingProviders: false,
      isRejectedProviders: false,
      hasSufficientProviders: false
    });
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_PROVIDERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = Immutable({
      ...initialState,
      isFetchingProviders: true
    });
    const state = providersReducer(prevState, action);

    expect(state).toEqual({
      ...initialState,
      isRejectedProviders: true,
      errorFetchingProviders: 'error'
    });
  });
});
