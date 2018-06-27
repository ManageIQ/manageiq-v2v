import React from 'react';
import { i18nProviderWrapperFactory } from '../../common/i18nProviderWrapperFactory';

const componentRegistry = {
  registry: {},

  register({ name = null, type = null, store = true, data = true }) {
    if (!name || !type) {
      throw new Error('Component name or type is missing');
    }
    if (this.registry[name]) {
      throw new Error(`Component name already taken: ${name}`);
    }

    this.registry[name] = { type, store, data };
    return this.registry;
  },

  registerMultiple(componentObjs) {
    return componentObjs.forEach(obj => {
      this.register(obj);
    });
  },

  getComponent(name) {
    return this.registry[name];
  },

  registeredComponents() {
    return this.registry.map((value, key) => key).join(', ');
  },

  markup(name, data, store) {
    const currentComponent = componentRegistry.getComponent(name);

    if (!currentComponent) {
      throw new Error(`Component not found:  ${name} among ${this.registeredComponents()}`);
    }
    const WrappedComponent = i18nProviderWrapperFactory(
      new Date('2017-10-13 00:54:55 -1100') // mock time to ensure snapshots are same
    )(currentComponent.type);

    // todo: should component registry `markup` actually merge {data} instead?
    // it would be nice to account for `ownProps` (assuming props are not always coming from store)
    return (
      <WrappedComponent
        data={Object.assign({}, data, currentComponent.data)}
        store={currentComponent.store ? store : undefined}
      />
    );
  }
};

const coreComponets = [];

componentRegistry.registerMultiple(coreComponets);

export default componentRegistry;
