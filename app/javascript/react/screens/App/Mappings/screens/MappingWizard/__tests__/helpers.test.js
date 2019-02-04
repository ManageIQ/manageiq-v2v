import { createTransformationMappings } from '../helpers';
import { constructClusterMappings, constructDatastoreOrNetworkMappings } from '../mappingWizardTestHelpers';
import { sourceClusters } from '../components/MappingWizardClustersStep/mappingWizardClustersStep.fixtures';
import { targetClusters } from '../../../../../../../redux/common/targetResources/targetResources.fixtures';
import {
  sourceClusterDatastores,
  targetClusterDatastores
} from '../components/MappingWizardDatastoresStep/mappingWizardDatastoresStep.fixtures';
import {
  sourceClusterNetworks,
  targetClusterNetworks
} from '../components/MappingWizardNetworksStep/mappingWizardNetworksStep.fixtures';

describe('createTransformationMappings', () => {
  test('creates the POST body', () => {
    const targetCluster = targetClusters.resources[0];
    const sourceCluster = sourceClusters.resources[0];
    const targetDatastore = targetClusterDatastores[0].storages[0];
    const sourceDatastore = sourceClusterDatastores[0].storages[0];
    const targetNetwork = targetClusterNetworks[0].lans[0];
    const sourceNetwork = sourceClusterNetworks[0].lans[0];

    const mappingWizardGeneralStep = {
      values: {
        targetProvider: 'some provider',
        name: 'name of mapping',
        description: 'some description'
      }
    };
    const mappingWizardClustersStep = {
      values: {
        clusterMappings: constructClusterMappings(targetCluster, [sourceCluster])
      }
    };
    const mappingWizardDatastoresStep = {
      values: {
        datastoresMappings: constructDatastoreOrNetworkMappings(targetCluster, targetDatastore, [sourceDatastore])
      }
    };
    const mappingWizardNetworksStep = {
      values: {
        networksMappings: constructDatastoreOrNetworkMappings(targetCluster, targetNetwork, [sourceNetwork])
      }
    };

    const result = createTransformationMappings(
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep
    );

    expect(result).toMatchSnapshot();
  });
});
