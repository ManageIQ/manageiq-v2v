import generalStepReducer, { initialState } from '../MappingWizardGeneralStepReducer';
import { SET_V2V_EDITING_MAPPING, FETCH_V2V_CONVERSION_HOSTS } from '../MappingWizardGeneralStepConstants';
import { conversionHosts } from '../mappingWizardGeneralStep.fixtures';

it('sets default state', () => {
  const action = { type: '@@INIT' };
  const state = generalStepReducer(undefined, action);
  expect(state).toMatchSnapshot();
});

it('sets editingMapping', () => {
  const action = {
    type: SET_V2V_EDITING_MAPPING,
    payload: '1'
  };
  const state = generalStepReducer(initialState, action);
  expect(state).toMatchSnapshot();
});

describe('fetching conversion hosts', () => {
  it('is pending', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOSTS}_PENDING`
    };
    const prevState = initialState.set('isRejectedConversionHosts', true);
    const state = generalStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  it('is rejected', () => {
    const action = {
      type: `${FETCH_V2V_CONVERSION_HOSTS}_REJECTED`,
      payload: 'error'
    };
    const prevState = initialState.set('isFetchingConversionHosts', true);
    const state = generalStepReducer(prevState, action);
    expect(state).toMatchSnapshot();
  });

  describe('is successful', () => {
    const prevState = initialState.set('isRejectedConversionHosts', true).set('isFetchingConversionHosts', true);

    test('and there is data', () => {
      const payload = {
        data: {
          ...conversionHosts
        }
      };
      const action = {
        type: `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`,
        payload
      };
      const state = generalStepReducer(prevState, action);
      expect(state).toMatchSnapshot();
    });

    test('and there is no data', () => {
      const payload = {
        data: {
          ...conversionHosts,
          resources: []
        }
      };
      const action = {
        type: `${FETCH_V2V_CONVERSION_HOSTS}_FULFILLED`,
        payload
      };
      const state = generalStepReducer(prevState, action);
      expect(state).toMatchSnapshot();
    });
  });
});
