import Immutable from 'seamless-immutable';
import clustersReducer, { initialState } from '../MappingWizardClustersStepReducer';
import {
  FETCH_V2V_SOURCE_CLUSTERS,
  FETCH_V2V_TARGET_CLUSTERS,
  QUERY_V2V_PROVIDERS
} from '../MappingWizardClustersStepConstants';
import { sourceClusters, targetClusters } from '../mappingWizardClustersStep.fixtures';

test('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = clustersReducer(undefined, action);

  expect(state).toMatchSnapshot();
});

describe('fetching source clusters', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_CLUSTERS}_PENDING`
    };
    const prevState = initialState.set('isRejectedSourceClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_SOURCE_CLUSTERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingSourceClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  describe('is successful,', () => {
    let prevState;
    beforeEach(() => {
      prevState = initialState.set('isRejectedSourceClusters', true).set('isFetchingSourceClusters', true);
    });

    test('and there is data', () => {
      const { resources } = sourceClusters;
      const payload = {
        data: {
          ...sourceClusters,
          resources: [
            {
              ...resources
            }
          ]
        }
      };
      const action = {
        type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });

    test('and there is no data', () => {
      const payload = {
        data: {
          ...sourceClusters,
          resources: []
        }
      };
      const action = {
        type: `${FETCH_V2V_SOURCE_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });
  });
});

describe('fetching target clusters', () => {
  test('is pending', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_CLUSTERS}_PENDING`
    };
    const prevState = initialState.set('isRejectedTargetClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  test('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_TARGET_CLUSTERS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingTargetClusters', true);
    const state = clustersReducer(prevState, action);

    expect(state).toMatchSnapshot();
  });

  describe('is successful,', () => {
    let prevState;
    beforeEach(() => {
      prevState = initialState.set('isRejectedTargetClusters', true).set('isFetchingTargetClusters', true);
    });
    test('and there is data', () => {
      const { resources } = targetClusters;
      const payload = {
        data: {
          ...targetClusters,
          resources: [
            {
              ...resources
            }
          ]
        }
      };
      const action = {
        type: `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });

    test('and there is no data', () => {
      const payload = {
        data: {
          ...targetClusters,
          resources: []
        }
      };
      const action = {
        type: `${FETCH_V2V_TARGET_CLUSTERS}_FULFILLED`,
        payload
      };
      const state = clustersReducer(prevState, action);

      expect(state).toMatchSnapshot();
    });
  });
});

describe('QUERY_V2V_PROVIDERS', () => {
  test('querying providers is pending', () => {
    const action = { type: `${QUERY_V2V_PROVIDERS}_PENDING` };
    const prevState = Immutable({
      ...initialState,
      isRejectedQueryProviders: true
    });
    const state = clustersReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isQueryingProviders: true,
      isRejectedQueryProviders: false
    });
  });

  test('querying providers is fulfilled', () => {
    const payload = {
      data: {
        results: [{ mock: 'data' }]
      }
    };
    const action = {
      type: `${QUERY_V2V_PROVIDERS}_FULFILLED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isQueryingProviders: true,
      isRejectedQueryProviders: true,
      errorQueryProviders: 'error'
    });
    const state = clustersReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      providers: payload.data.results,
      isQueryingProviders: false,
      isRejectedQueryProviders: false,
      errorQueryProviders: null
    });
  });

  test('fetching a plan is rejected', () => {
    const payload = { error: 'error' };
    const action = {
      type: `${QUERY_V2V_PROVIDERS}_REJECTED`,
      payload
    };
    const prevState = Immutable({
      ...initialState,
      isQueryingProviders: true
    });
    const state = clustersReducer(prevState, action);

    expect(state).toEqual({
      ...prevState,
      isQueryingProviders: false,
      isRejectedQueryProviders: true,
      errorQueryProviders: payload
    });
  });
});
