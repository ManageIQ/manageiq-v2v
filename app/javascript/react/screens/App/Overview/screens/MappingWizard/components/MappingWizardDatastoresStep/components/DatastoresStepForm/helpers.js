export const datastoreUsedSpace = (datastore = {}) => datastore.total_space - datastore.free_space;

export const totalUsedSpace = (datastores = []) =>
  datastores.reduce((totalSpace, datastore) => (totalSpace += datastoreUsedSpace(datastore)), 0);

export const targetDatastoreAvailableSpace = (targetDatastore, datastoresStepMappings) => {
  const datastoresMappings = datastoresStepMappings.reduce(
    (mappings, targetClusterWithDatastoresMappings) => mappings.concat(targetClusterWithDatastoresMappings.nodes),
    []
  );

  const matchingDatastoresMapping = datastoresMappings.find(
    targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id === targetDatastore.id
  );

  if (datastoresMappings.length > 0 && matchingDatastoresMapping) {
    return targetDatastore.free_space - totalUsedSpace(matchingDatastoresMapping.nodes);
  }
  return targetDatastore.free_space;
};

export const sourceDatastoreInfo = sourceDatastore =>
  sprintf(__('%s \\ %s'), sourceDatastore.providerName, sourceDatastore.name);

export const targetDatastoreInfo = (targetDatastore, datastoresStepMappings) =>
  sprintf(__('%s \\ %s'), targetDatastore.providerName, targetDatastore.name);

export const targetDatastoreTreeViewInfo = targetDatastore => targetDatastore.name;

export const errorMessage = __(
  'The size of the selected source datastores exceeds the available space in the target datastore'
);

export const removeSourceDatastore = (datastoresMapping, nodeToRemove) => {
  const { nodes: sourceDatastores, ...targetDatastore } = datastoresMapping;
  const updatedSourceDatastores = sourceDatastores.filter(sourceDatastore => sourceDatastore.id !== nodeToRemove.id);
  return updatedSourceDatastores.length === 0
    ? undefined
    : {
        ...targetDatastore,
        nodes: updatedSourceDatastores
      };
};

export const updateMappings = (targetClusterWithDatastoresMappings, nodeToRemove) => {
  const isTargetDatastore = nodeToRemove.nodes;
  const { nodes: datastoresMappings, ...targetCluster } = targetClusterWithDatastoresMappings;

  const updatedDatastoresMappings = isTargetDatastore
    ? datastoresMappings.filter(
        targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id !== nodeToRemove.id
      )
    : datastoresMappings
        .map(datastoresMapping => removeSourceDatastore(datastoresMapping, nodeToRemove))
        .filter(item => item !== undefined);

  return updatedDatastoresMappings.length === 0
    ? undefined
    : {
        ...targetCluster,
        nodes: updatedDatastoresMappings
      };
};
