import { groupClusterTransformationItemsByDestinationId } from '../../../../helpers';

export const targetClusterWithExtendedData = targetCluster => ({
  ...targetCluster,
  text: targetCluster.name,
  state: {
    expanded: true
  },
  selectable: true,
  selected: false
});

export const sourceClusterWithExtendedData = sourceCluster => ({
  ...sourceCluster,
  text: sourceCluster.name,
  icon: 'fa fa-file-o'
});

export const clusterInfo = ({ ext_management_system, v_parent_datacenter, name }) =>
  `${ext_management_system.name} \\ ${v_parent_datacenter ? `${v_parent_datacenter} \\` : ''} ${name}`;

export const updateMapping = (clustersStepMapping, targetClusterToAddTo, sourceClustersToAdd) => {
  const { nodes: sourceClusters, ...targetCluster } = clustersStepMapping;

  if (targetCluster.id === targetClusterToAddTo.id) {
    return {
      ...targetCluster,
      nodes: [
        ...sourceClusters,
        ...sourceClustersToAdd.map(sourceCluster => sourceClusterWithExtendedData(sourceCluster))
      ]
    };
  }
  return clustersStepMapping;
};

export const createNewMapping = (targetCluster, sourceClusters) => ({
  ...targetClusterWithExtendedData(targetCluster),
  nodes: sourceClusters.map(sourceCluster => sourceClusterWithExtendedData(sourceCluster))
});

export const createClusterMappings = (transformationItems, targetClusters, sourceClusters) => {
  const mappings = groupClusterTransformationItemsByDestinationId(transformationItems);

  if (targetClusters.length && sourceClusters.length) {
    return Object.keys(mappings).map(key => {
      const target = targetClusters && targetClusters.find(cluster => cluster.id === key);
      const sources = sourceClusters && sourceClusters.filter(cluster => mappings[key].some(id => id === cluster.id));

      return createNewMapping(target, sources);
    });
  }
  return [];
};
