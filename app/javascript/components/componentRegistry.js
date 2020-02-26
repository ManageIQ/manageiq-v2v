import React from 'react';

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
    return componentObjs.forEach(obj => this.register(obj));
  },

  getComponent(name) {
    return this.registry[name];
  },

  registeredComponents() {
    return Object.keys(this.registry).join(', ');
  },

  markup(name, data, store) {
    const currentComponent = this.getComponent(name);

    if (!currentComponent) {
      throw new Error(`Component not found:  ${name} among ${this.registeredComponents()}`);
    }
    // todo: should component registry `markup` actually merge {data} instead?
    // it would be nice to account for `ownProps` (assuming props are not always coming from store)
    return (
      <currentComponent.type
        data={currentComponent.data ? Object.assign({}, data, currentComponent.data) : undefined}
        store={currentComponent.store ? store : undefined}
      />
    );
  }
};

const coreComponets = [];

componentRegistry.registerMultiple(coreComponets);

export default componentRegistry;
