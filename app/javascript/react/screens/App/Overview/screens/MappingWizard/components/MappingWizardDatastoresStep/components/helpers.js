import numeral from 'numeral';

const calculateTotalUsedSpace = sourceDatastores =>
  sourceDatastores.reduce(
    (totalSpace, sourceDatastore) =>
      (totalSpace += sourceDatastore.total_space - sourceDatastore.free_space),
    0
  );

const sourceDatastoreInfo = sourceDatastore =>
  `${sourceDatastore.name} (${numeral(
    sourceDatastore.total_space - sourceDatastore.free_space
  ).format('0.00b')})`;

const targetDatastoreInfo = (targetDatastore, datastoresStepMappings) => {
  const datastoresMappings = datastoresStepMappings.reduce(
    (mappings, targetClusterWithDatastoresMappings) =>
      mappings.concat(targetClusterWithDatastoresMappings.nodes),
    []
  );

  const datastoresMapping = datastoresMappings.find(
    targetDatastoreWithSourceDatastores =>
      targetDatastoreWithSourceDatastores.id === targetDatastore.id
  );

  if (datastoresStepMappings.length > 0) {
    if (datastoresMapping) {
      return sprintf(
        __('%s (%s avail)'),
        targetDatastore.name,
        numeral(
          targetDatastore.free_space -
            calculateTotalUsedSpace(datastoresMapping.nodes)
        ).format('0.00b')
      );
    }
    return sprintf(
      __('%s (%s avail)'),
      targetDatastore.name,
      numeral(targetDatastore.free_space).format('0.00b')
    );
  }
  return sprintf(
    __('%s (%s avail)'),
    targetDatastore.name,
    numeral(targetDatastore.free_space).format('0.00b')
  );
};

const diskSpaceInfo = (targetDatastore, sourceDatastores) => {
  const { total_space, free_space } = targetDatastore;
  const availableSpace = free_space - calculateTotalUsedSpace(sourceDatastores);

  return sprintf(
    __('%s (%s total, %s avail)'),
    targetDatastore.name,
    numeral(total_space).format('0.00b'),
    numeral(availableSpace).format('0.00b')
  );
};

export { diskSpaceInfo, sourceDatastoreInfo, targetDatastoreInfo };
