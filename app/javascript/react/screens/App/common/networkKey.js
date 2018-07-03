/**
 * returns a unique network based on current UI model
 */
export const networkKey = network => `${network.id}\\${network.uid_ems}`;
