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

  test('cloud tenants are fetched and a conversion host alert is triggered', () => {
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
          ospConversionHosts={[]}
        />
      </Provider>
    );

    expect(fetchTargetClustersAction).toHaveBeenCalledWith(FETCH_TARGET_COMPUTE_URLS[targetProvider]);
    expect(showAlertAction).toHaveBeenCalled();

    wrapper.unmount();
  });

  test('no alert is triggered when there are conversion hosts', () => {
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
          ospConversionHosts={[{ mock: 'data' }]}
        />
      </Provider>
    );

    expect(showAlertAction).toHaveBeenCalledTimes(0);

    wrapper.unmount();
  });
});
