import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import { reducers } from '../index';
import MappingWizardNetworksStep from '../MappingWizardNetworksStep';
import { sourceClusters } from '../../MappingWizardClustersStep/mappingWizardClustersStep.fixtures';
import { cloudTenants } from '../../../../../../../../../redux/common/targetResources/targetResources.fixtures';
import { constructClusterMappings } from '../../../mappingWizardTestHelpers';
import { V2V_TARGET_PROVIDERS } from '../../../MappingWizardConstants';
import { FETCH_NETWORK_URLS } from '../MappingWizardNetworksStepConstants';

const store = generateStore(
  { ...reducers, form: formReducer },
  { form: { mappingWizardNetworksStep: { values: { networksMappings: [] } } } }
);

describe('target provider is OSP, ', () => {
  const targetProvider = V2V_TARGET_PROVIDERS[1].id;
  const targetCloudTenant = cloudTenants.resources[0];
  const clusterMappings = constructClusterMappings(targetCloudTenant, sourceClusters.resources);

  let fetchTargetNetworksAction;
  let fetchPublicCloudNetworksAction;
  beforeEach(() => {
    fetchTargetNetworksAction = jest.fn();
    fetchPublicCloudNetworksAction = jest.fn();
  });

  test('fetches private cloud networks when a source cluster is selected', () => {
    // if there is only one mapped source cluster, it is automatically selected
    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardNetworksStep
          clusterMappings={clusterMappings}
          fetchPublicCloudNetworksAction={fetchPublicCloudNetworksAction}
          fetchTargetNetworksAction={fetchTargetNetworksAction}
          targetProvider={targetProvider}
        />
      </Provider>
    );

    expect(fetchTargetNetworksAction).toHaveBeenCalledWith(
      FETCH_NETWORK_URLS[targetProvider],
      targetCloudTenant.id,
      targetProvider
    );

    wrapper.unmount();
  });

  test('fetches public cloud networks when a source cluster is selected', () => {
    // if there is only one mapped source cluster, it is automatically selected
    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardNetworksStep
          clusterMappings={clusterMappings}
          fetchPublicCloudNetworksAction={fetchPublicCloudNetworksAction}
          fetchTargetNetworksAction={fetchTargetNetworksAction}
          targetProvider={targetProvider}
        />
      </Provider>
    );

    expect(fetchPublicCloudNetworksAction).toHaveBeenCalledWith(FETCH_NETWORK_URLS.public, targetCloudTenant);

    wrapper.unmount();
  });
});
