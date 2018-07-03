import './polyfills';
import componentRegistry from '../components/componentRegistry';
import { coreComponents } from '../components';
import { mount } from '../components/mounter';

componentRegistry.registerMultiple(coreComponents);

window.v2v = {
  mount,
  componentRegistry
};

// Another way to mount the component is via JS - e.g.
// v2v.mount('manageiq-v2v', '#reactRoot');
