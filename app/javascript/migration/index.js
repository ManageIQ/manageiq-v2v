// import MappingWizardContainer from '../components/MappingWizard';
// import PlanWizardContainer from '../components/PlanWizard';
import MiqV2vUi from '../migration/containers/Application';

// TODO: ensure we can register all components
// const coreComponets = [
//   { name: 'MappingWizardContainer', type: MappingWizardContainer, url: '', controller: ''},
//   { name: 'PlanWizardContainer', type: PlanWizardContainer, url: '', controller: '' },
//   { name: 'v2v_ui_plugin', type: MiqV2vUi },
// ];
// window.MiqReact.componentRegistry.registerMultiple(coreComponets);

window.MiqReact.componentRegistry.register({
  name: 'v2v_ui_plugin',
  type: MiqV2vUi
});

// Another way to mount the component is via JS - e.g.
// ManageIQ.react.mount('v2v_ui_plugin', '#reactRoot');
