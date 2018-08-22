export const getHostsByClusterID = hostsQueryFulfilledAction => {
  const {
    meta: { hostIDsByClusterID },
    payload: { data }
  } = hostsQueryFulfilledAction;
  const hostsByID = data.results.reduce(
    (newObject, host) => ({
      ...newObject,
      [host.id]: host
    }),
    {}
  );
  return Object.keys(hostIDsByClusterID).reduce(
    (newObject, clusterID) => ({
      ...newObject,
      [clusterID]: hostIDsByClusterID[clusterID].map(hostID => hostsByID[hostID])
    }),
    {}
  );
};
