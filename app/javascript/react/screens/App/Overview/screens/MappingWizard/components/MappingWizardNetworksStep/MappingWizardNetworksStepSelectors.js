export const groupByUidEms = (networks = []) =>
  networks.reduce(
    (networksMap, network) => ({
      ...networksMap,
      [network.uid_ems]: networksMap[network.uid_ems] ? [...networksMap[network.uid_ems], network] : [network]
    }),
    {}
  );
