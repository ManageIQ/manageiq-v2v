/**
 * returns a unique network based on current UI model
 */
export const networkKey = network => `${network.clusterId}\\${network.uid_ems}`;
