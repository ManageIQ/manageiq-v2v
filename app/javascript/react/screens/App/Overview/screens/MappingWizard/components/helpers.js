import { V2V_TARGET_PROVIDERS } from '../MappingWizardConstants';

export const getClusterOptions = clusterMappings => {
  const sourceClustersWithAssociatedTargetClusters = clusterMappings.reduce(
    (mappings, targetClusterWithSourceClusters) => {
      const { nodes: sourceClusters, ...targetCluster } = targetClusterWithSourceClusters;
      const sourceToTargetMappings = sourceClusters.map(sourceCluster => ({
        sourceCluster,
        targetCluster,
        sourceClusterMappedToTargetCluster: {
          name: `${sourceCluster.name} (${targetCluster.name})`,
          id: sourceCluster.id
        }
      }));
      return mappings.concat(sourceToTargetMappings);
    },
    []
  );

  return sourceClustersWithAssociatedTargetClusters.map(
    ({ sourceClusterMappedToTargetCluster }) => sourceClusterMappedToTargetCluster
  );
};

export const multiProviderTargetLabel = (providerType, wizardStep) => {
  switch (providerType) {
    case V2V_TARGET_PROVIDERS[1].id:
      switch (wizardStep) {
        case 'cluster':
          return __('Target Provider \\ Project');
        case 'network':
          return __('Target Project \\ Network');
        default:
          return null;
      }
    default:
      switch (wizardStep) {
        case 'cluster':
          return __('Target Provider \\ Datacenter \\ Cluster');
        case 'network':
          return __('Target Networks');
        default:
          return null;
      }
  }
};
