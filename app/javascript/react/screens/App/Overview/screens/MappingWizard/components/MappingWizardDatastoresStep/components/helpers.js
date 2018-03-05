import numeral from 'numeral';

export const datastoreUsedSpace = (datastore = {}) =>
  datastore.total_space - datastore.free_space;

export const totalUsedSpace = (datastores = []) =>
  datastores.reduce(
    (totalSpace, datastore) => (totalSpace += datastoreUsedSpace(datastore)),
    0
  );

export const targetDatastoreAvailableSpace = (
  targetDatastore,
  datastoresStepMappings
) => {
  const datastoresMappings = datastoresStepMappings.reduce(
    (mappings, targetClusterWithDatastoresMappings) =>
      mappings.concat(targetClusterWithDatastoresMappings.nodes),
    []
  );

  const matchingDatastoresMapping = datastoresMappings.find(
    targetDatastoreWithSourceDatastores =>
      targetDatastoreWithSourceDatastores.id === targetDatastore.id
  );

  if (datastoresMappings.length > 0 && matchingDatastoresMapping) {
    return (
      targetDatastore.free_space -
      totalUsedSpace(matchingDatastoresMapping.nodes)
    );
  }
  return targetDatastore.free_space;
};

export const sourceDatastoreInfo = sourceDatastore =>
  sprintf(
    __('%s (%s)'),
    sourceDatastore.name,
    numeral(datastoreUsedSpace(sourceDatastore)).format('0.00b')
  );

export const targetDatastoreInfo = (targetDatastore, datastoresStepMappings) =>
  sprintf(
    __('%s (%s avail)'),
    targetDatastore.name,
    numeral(
      targetDatastoreAvailableSpace(targetDatastore, datastoresStepMappings)
    ).format('0.00b')
  );

export const targetDatastoreTreeViewInfo = (
  targetDatastore,
  sourceDatastores
) => {
  const { total_space, free_space } = targetDatastore;
  const availableSpace = free_space - totalUsedSpace(sourceDatastores);

  return sprintf(
    __('%s (%s total, %s avail)'),
    targetDatastore.name,
    numeral(total_space).format('0.00b'),
    numeral(availableSpace).format('0.00b')
  );
};

export const errorMessage = __(
  'The size of the selected source datastores exceeds the available space in the target datastore'
);
