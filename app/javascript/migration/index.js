import MiqV2vUi from '../migration/containers/Application';

window.MiqReact.componentRegistry.register({
  name: 'v2v_ui_plugin',
  type: MiqV2vUi,
});

// Another way to mount the component is via JS - e.g.
// ManageIQ.react.mount('v2v_ui_plugin', '#reactRoot');
