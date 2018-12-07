import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../common/testReduxHelpers';
import { reducers } from '../index';
import MappingWizardDatastoresStep from '../MappingWizardDatastoresStep';
import { sourceClusters, cloudTenants } from '../../MappingWizardClustersStep/mappingWizardClustersStep.fixtures';
import { constructClusterMappings } from '../../../mappingWizardTestHelpers';
import { FETCH_STORAGE_URLS } from '../MappingWizardDatastoresStepConstants';
import { V2V_TARGET_PROVIDERS } from '../../../MappingWizardConstants';

const store = generateStore(
  { ...reducers, form: formReducer },
  { form: { mappingWizardDatastoresStep: { values: { datastoresMappings: [] } } } }
);

describe('target provider is OSP, ', () => {
  const targetProvider = V2V_TARGET_PROVIDERS[1].id;
  let fetchTargetDatastoresAction;

  beforeEach(() => {
    fetchTargetDatastoresAction = jest.fn();
  });

  test('fetches cloud volume types when a source cluster is selected', () => {
    // If there is only one mapped source cluster, it is automatically selected
    const clusterMappings = constructClusterMappings(cloudTenants.resources[0], sourceClusters.resources);
    const wrapper = mount(
      <Provider store={store}>
        <MappingWizardDatastoresStep
          clusterMappings={clusterMappings}
          fetchTargetDatastoresAction={fetchTargetDatastoresAction}
          targetProvider={targetProvider}
        />
      </Provider>
    );

    expect(fetchTargetDatastoresAction).toHaveBeenCalledWith(
      FETCH_STORAGE_URLS[targetProvider],
      clusterMappings[0].id,
      targetProvider
    );

    wrapper.unmount();
  });
});
