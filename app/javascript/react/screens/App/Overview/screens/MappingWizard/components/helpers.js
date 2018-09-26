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
        case 'storage':
          return __('Target Provider \\ Cloud Volume');
        case 'network':
          return __('Target Project \\ Network');
        default:
          return null;
      }
    default:
      switch (wizardStep) {
        case 'cluster':
          return __('Target Provider \\ Datacenter \\ Cluster');
        case 'storage':
          return __('Target Datastores');
        case 'network':
          return __('Target Network');
        default:
          return null;
      }
  }
};

export const updateMappings = (mappings, clusterStepMappings) =>
  mappings.filter(mapping => {
    const potentialAssociatedClusterStepMappings = clusterStepMappings.filter(
      clusterStepMapping => clusterStepMapping.id === mapping.id
    );

    if (potentialAssociatedClusterStepMappings.length === 0) {
      return false;
    }

    const associatedClusterMapping = potentialAssociatedClusterStepMappings.find(clusterStepMapping => {
      const { nodes: sourceClusters } = clusterStepMapping;
      const sourceClusterIds = sourceClusters.map(sourceCluster => sourceCluster.id);
      const { nodes: mappedSourceStoragesOrNetworks } = mapping.nodes[0];

      return mappedSourceStoragesOrNetworks.every(storageOrNetwork =>
        sourceClusterIds.some(id => id === storageOrNetwork.sourceClusterId)
      );
    });

    return associatedClusterMapping;
  });
