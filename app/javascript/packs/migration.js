// require('../migration');
import componentRegistry from '../components/componentRegistry';
import { coreComponents } from '../components';

componentRegistry.registerMultiple(coreComponents);

// Another way to mount the component is via JS - e.g.
// ManageIQ.react.mount('v2v_ui_plugin', '#reactRoot');
