import './polyfills';
import componentRegistry from '../components/componentRegistry';
import App from '../react/';
import { coreComponents } from '../components';

componentRegistry.registerMultiple(coreComponents);

ManageIQ.component.addReact('manageiq-v2v', App);
