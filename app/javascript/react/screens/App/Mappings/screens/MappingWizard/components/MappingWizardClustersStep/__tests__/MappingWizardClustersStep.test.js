import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import { reducers } from '../index';
import { initialState } from '../MappingWizardClustersStepReducer';
import MappingWizardClustersStep from '../MappingWizardClustersStep';
import { FETCH_TARGET_COMPUTE_URLS } from '../../../../../../../../../redux/common/targetResources/targetResourcesConstants';
import { OPENSTACK } from '../../../MappingWizardConstants';

const store = generateStore(
  { ...reducers, form: formReducer },
  { mappingWizardClustersStep: initialState, form: { mappingWizardClustersStep: { values: { clusterMappings: [] } } } }
);

describe('target provider is OSP', () => {
  const getBaseProps = () => ({
    fetchTargetClustersAction: jest
      .fn()
      .mockReturnValue(Promise.resolve({ value: { data: { resources: [{ mock: 'data' }] } } })),
    fetchTargetComputeUrls: FETCH_TARGET_COMPUTE_URLS,
    hideAlertAction: jest.fn(),
    showAlertAction: jest.fn(),
    sourceClusters: [],
    targetProvider: OPENSTACK
  });

  test('cloud tenants are fetched and a conversion host alert is triggered', () => {
    const baseProps = getBaseProps();
    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardClustersStep {...baseProps} ospConversionHosts={[]} />
      </Provider>
    );

    expect(baseProps.fetchTargetClustersAction).toHaveBeenCalledWith(
      FETCH_TARGET_COMPUTE_URLS[baseProps.targetProvider]
    );
    expect(baseProps.showAlertAction).toHaveBeenCalled();

    wrapper.unmount();
  });

  test('no alert is triggered when there are conversion hosts', () => {
    const baseProps = getBaseProps();
    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardClustersStep {...baseProps} ospConversionHosts={[{ mock: 'data' }]} />
      </Provider>
    );

    expect(baseProps.showAlertAction).toHaveBeenCalledTimes(0);

    wrapper.unmount();
  });
});
