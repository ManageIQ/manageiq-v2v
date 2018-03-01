import numeral from 'numeral';

const calculateTotalUsedSpace = sourceDatastores =>
  sourceDatastores.reduce(
    (totalSpace, sourceDatastore) =>
      (totalSpace += sourceDatastore.total_space - sourceDatastore.free_space),
    0
  );

const diskSpaceInfo = (targetDatastore, sourceDatastores) => {
  const { total_space, free_space } = targetDatastore;
  const availableSpace = free_space - calculateTotalUsedSpace(sourceDatastores);

  return sprintf(
    __('%s (%s MB total, %s avail)'),
    targetDatastore.name,
    numeral(total_space).format('0.00b'),
    numeral(availableSpace).format('0.00b')
  );
};

export { diskSpaceInfo };
