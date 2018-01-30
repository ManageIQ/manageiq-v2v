const componentRegistry = { ...window.MiqReact.componentRegistry };

// todo: should component registry `markup` actually merge {data} instead?
// it would be nice to account for `ownProps` (assuming props are not always coming from store)
componentRegistry.markupWithProps = (name, data, store) => {
  const component = componentRegistry.getComponent(name);
  return componentRegistry.markup(
    name,
    Object.assign({}, data, component.data)
  );
};

export default componentRegistry;
