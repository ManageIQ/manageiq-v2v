// todo: expose this from patternfly-react instead?
export const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const pluralize = (count, string) =>
  count === 1 ? sprintf('%s', string) : sprintf('%ss', string);
