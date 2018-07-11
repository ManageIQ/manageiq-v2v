import { sourceClusterDatastores, targetClusterDatastores } from '../../mappingWizardDatastoresStep.fixtures';

const [
  { storages: sourceClusterOneStorages, ...sourceClusterOne },
  { storages: sourceClusterTwoStorages, ...sourceClusterTwo }
] = sourceClusterDatastores;

const [
  { storages: targetClusterOneStorages, ...targetClusterOne },
  { storages: targetClusterTwoStorages, ...targetClusterTwo }
] = targetClusterDatastores;

export const sourceDatastores = [sourceClusterOneStorages[0], sourceClusterOneStorages[1], sourceClusterTwoStorages[0]];

export const targetDatastores = [targetClusterOneStorages[0], targetClusterTwoStorages[0]];

export const sourceClusters = [sourceClusterOne, sourceClusterTwo];
export const targetClusters = [targetClusterOne, targetClusterTwo];
