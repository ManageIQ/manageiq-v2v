// todo: expose this from patternfly-react instead?
export const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

// TODO upgrade to latest patternfly-react after next release, these are exposed now:
export const bindMethods = (context, methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};
export const noop = Function.prototype;
export const selectKeys = (obj, keys, fn = val => val) =>
  keys.reduce((values, key) => ({ ...values, [key]: fn(obj[key]) }), {});

// https://github.com/yahoo/react-intl/wiki/Upgrade-Guide#flatten-messages-object
export const flattenMessages = (nestedMessages, prefix = '') =>
  Object.keys(nestedMessages).reduce((messages, key) => {
    const value = nestedMessages[key];
    const prefixedKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') {
      messages[prefixedKey] = value;
    } else {
      Object.assign(messages, flattenMessages(value, prefixedKey));
    }

    return messages;
  }, {});
