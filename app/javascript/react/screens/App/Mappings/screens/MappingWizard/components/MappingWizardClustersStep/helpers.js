export const getProviderIds = clusters => {
  const providerIds = new Set();
  clusters.forEach(cluster => providerIds.add(cluster.ems_id));
  return [...providerIds];
};
