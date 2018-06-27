const getMostRecentRequest = requests =>
  requests.reduce((prev, current) => (prev.created_on > current.created_on ? prev : current));

export default getMostRecentRequest;
