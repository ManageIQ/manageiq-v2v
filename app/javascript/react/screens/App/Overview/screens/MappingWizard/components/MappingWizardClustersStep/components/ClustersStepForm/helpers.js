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
