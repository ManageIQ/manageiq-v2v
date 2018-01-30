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
    const currentComponent = this.getComponent(name);

    if (!currentComponent) {
      throw new Error(
        `Component not found:  ${name} among ${this.registeredComponents()}`
      );
    }
    const ComponentName = currentComponent.type;

    return (
      <ComponentName
        data={currentComponent.data ? data : undefined}
        store={currentComponent.store ? store : undefined}
      />
    );
  },

  markupWithProps(name, data, store) {
    const currentComponent = this.getComponent(name);
    return componentRegistry.markup(
      name,
      Object.assign({}, data, currentComponent.data)
    );
  }
};

const coreComponets = [];

componentRegistry.registerMultiple(coreComponets);

export default componentRegistry;
