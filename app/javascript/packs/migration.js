import './polyfills';
import componentRegistry from '../components/componentRegistry';
import { mount } from '../components/mounter';
import App from '../react/';

window.v2v = {
  mount,
  componentRegistry
};

ManageIQ.component.addReact('manageiq-v2v', App);
// Another way to mount the component is via JS - e.g.
// v2v.mount('manageiq-v2v', '#reactRoot');
