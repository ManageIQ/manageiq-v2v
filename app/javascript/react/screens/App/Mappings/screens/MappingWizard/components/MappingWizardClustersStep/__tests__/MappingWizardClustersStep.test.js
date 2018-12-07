import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import { reducers } from '../index';
import { initialState } from '../MappingWizardClustersStepReducer';
import MappingWizardClustersStep from '../MappingWizardClustersStep';
import { FETCH_TARGET_COMPUTE_URLS } from '../MappingWizardClustersStepConstants';
import { V2V_TARGET_PROVIDERS } from '../../../MappingWizardConstants';

const store = generateStore(
  { ...reducers, form: formReducer },
  { mappingWizardClustersStep: initialState, form: { mappingWizardClustersStep: { values: { clusterMappings: [] } } } }
);

describe('target provider is OSP', () => {
  const targetProvider = V2V_TARGET_PROVIDERS[1].id;

  let fetchTargetClustersAction;
  let showAlertAction;
  let hideAlertAction;
  beforeEach(() => {
    fetchTargetClustersAction = jest.fn();
    showAlertAction = jest.fn();
    hideAlertAction = jest.fn();
  });

  test('cloud tenants are fetched', () => {
    fetchTargetClustersAction.mockReturnValue(Promise.resolve());

    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardClustersStep
          fetchTargetClustersAction={fetchTargetClustersAction}
          fetchTargetComputeUrls={FETCH_TARGET_COMPUTE_URLS}
          hideAlertAction={hideAlertAction}
          showAlertAction={showAlertAction}
          sourceClusters={[]}
          targetProvider={targetProvider}
        />
      </Provider>
    );

    expect(fetchTargetClustersAction).toHaveBeenCalledWith(FETCH_TARGET_COMPUTE_URLS[targetProvider]);

    wrapper.unmount();
  });
});
