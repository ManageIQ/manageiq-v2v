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
