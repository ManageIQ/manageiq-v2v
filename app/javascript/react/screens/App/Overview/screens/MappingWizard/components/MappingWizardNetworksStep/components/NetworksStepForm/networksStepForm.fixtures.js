import { sourceClusterNetworks, targetClusterNetworks } from '../../mappingWizardNetworksStep.fixtures';

import {
  targetClusterWithExtendedData,
  sourceClusterWithExtendedData
} from '../../../MappingWizardClustersStep/components/ClustersStepForm/helpers';

const [{ lans: sourceNetworks, ...sourceCluster }] = sourceClusterNetworks;

const [{ lans: targetNetworks, ...targetCluster }] = targetClusterNetworks;

export const networkGrouping = [sourceNetworks[0], sourceNetworks[1]];
export const clustersMapping = {
  ...targetClusterWithExtendedData(targetCluster),
  nodes: [
    {
      ...sourceClusterWithExtendedData(sourceCluster)
    }
  ]
};

export { sourceNetworks, targetNetworks, sourceCluster, targetCluster };
