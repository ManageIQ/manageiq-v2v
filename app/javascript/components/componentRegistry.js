import React from 'react';
import { i18nProviderWrapperFactory } from '../common/i18nProviderWrapperFactory';

const { componentRegistry } = window.MiqReact;

// extends current MIQ componentRegistry with i18nProviderWrapper
componentRegistry.markup = (name, data, store) => {
  const currentComponent = componentRegistry.getComponent(name);

  if (!currentComponent) {
    throw new Error(
      `Component not found:  ${name} among ${this.registeredComponents()}`
    );
  }
  const WrappedComponent = i18nProviderWrapperFactory(new Date())(
    currentComponent.type
  );

  // todo: should component registry `markup` actually merge {data} instead?
  // it would be nice to account for `ownProps` (assuming props are not always coming from store)
  return (
    <WrappedComponent
      data={
        currentComponent.data
          ? Object.assign({}, data, currentComponent.data)
          : undefined
      }
      store={currentComponent.store ? store : undefined}
    />
  );
};

export default componentRegistry;
