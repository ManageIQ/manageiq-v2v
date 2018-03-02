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

const targetDatastoreInfo = (targetDatastore, mappings) => {
  if (mappings.length > 0) {
    const hasMappedSourceDatastores = mappings.some(
      targetClusterWithDatastoreMappings =>
        targetClusterWithDatastoreMappings.nodes.some(
          targetDatastoreWithSourceDatastores =>
            targetDatastoreWithSourceDatastores.id === targetDatastore.id
        )
    );
    if (hasMappedSourceDatastores) {
      const sourceDatastores = mappings
        .filter(targetClusterWithDatastoreMappings =>
          targetClusterWithDatastoreMappings.nodes.some(
            targetDatastoreWithSourceDatastores =>
              targetDatastoreWithSourceDatastores.id === targetDatastore.id
          )
        )[0]
        .nodes.find(
          targetDatastoreWithSourceDatastores =>
            targetDatastoreWithSourceDatastores.id === targetDatastore.id
        ).nodes;
      return sprintf(
        __('%s (%s avail)'),
        targetDatastore.name,
        numeral(
          targetDatastore.free_space - calculateTotalUsedSpace(sourceDatastores)
        ).format('0.00b')
      );
    }
  } else {
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
