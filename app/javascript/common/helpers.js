// todo: expose this from patternfly-react instead?
export const bindMethods = (context, methods) => {
  methods.forEach(method => {
    context[method] = context[method].bind(context);
  });
};

export const noop = Function.prototype;

export const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

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
