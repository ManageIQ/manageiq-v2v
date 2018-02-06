import MappingWizardContainer from './MappingWizard';
import PlanWizardContainer from './PlanWizard';
import Dashboard from '../migration/scenes/Dashboard';
import Overview from '../migration/scenes/Overview';
import IsoDate from './dates/IsoDate';
import LongDateTime from './dates/LongDateTime';
import RelativeDateTime from './dates/RelativeDateTime';
import ShortDateTime from './dates/ShortDateTime';
import MiqV2vUi from '../migration/containers/Application';

export const coreComponents = [
  {
    name: 'MappingWizardContainer',
    type: MappingWizardContainer,
    data: { url: '/api/sourceClusters' },
    store: true
  },
  {
    name: 'PlanWizardContainer',
    type: PlanWizardContainer,
    data: { url: '/api/migrationPlans' },
    store: true
  },
  {
    name: 'Dashboard',
    type: Dashboard,
    data: {}
  },
  {
    name: 'Overview',
    type: Overview,
    data: {},
    store: true
  },
  {
    name: 'RelativeDateTime',
    type: RelativeDateTime,
    data: true,
    store: false
  },
  {
    name: 'LongDateTime',
    type: LongDateTime,
    data: true,
    store: false
  },
  {
    name: 'ShortDateTime',
    type: ShortDateTime,
    data: true,
    store: false
  },
  {
    name: 'IsoDate',
    type: IsoDate,
    data: true,
    store: false
  },
  { name: 'v2v_ui_plugin', type: MiqV2vUi }
];

export const componentSettings = component =>
  coreComponents.find(n => n.type === component);
