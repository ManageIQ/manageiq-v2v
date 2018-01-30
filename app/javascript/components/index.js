import MappingWizardContainer from './MappingWizard';
import PlanWizardContainer from './PlanWizard';
import Dashboard from '../migration/scenes/Dashboard';
import Overview from '../migration/scenes/Overview';
import MiqV2vUi from '../migration/containers/Application';

export const coreComponents = [
  {
    name: 'MappingWizardContainer',
    type: MappingWizardContainer,
    data: { url: '/api/sourceClusters' }
  },
  {
    name: 'PlanWizardContainer',
    type: PlanWizardContainer,
    data: { url: '/api/migrationPlans' }
  },
  {
    name: 'Dashboard',
    type: Dashboard,
    data: {}
  },
  {
    name: 'Overview',
    type: Overview,
    data: {}
  },
  { name: 'v2v_ui_plugin', type: MiqV2vUi }
];

export const componentSettings = component =>
  coreComponents.find(n => n.type === component);
