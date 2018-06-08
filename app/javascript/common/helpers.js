// todo: expose this from patternfly-react instead?
export const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

export const simplePluralize = (count, singular, plural) =>
  count === 1 ? singular : plural;
