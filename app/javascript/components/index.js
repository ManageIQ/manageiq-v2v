import MappingWizardContainer from '../react/screens/App/Overview/screens/MappingWizard';
// import MappingWizardGeneralStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardGeneralStep';
import MappingWizardClustersStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';
import OverviewContainer from '../react/screens/App/Overview';
import Dashboard from '../react/screens/App/Dashboard/Dashboard';
import IsoDate from './dates/IsoDate';
import LongDateTime from './dates/LongDateTime';
import RelativeDateTime from './dates/RelativeDateTime';
import ShortDateTime from './dates/ShortDateTime';
import MiqV2vUi from '../react';

export const coreComponents = [
  {
    name: 'MappingWizardContainer',
    type: MappingWizardContainer,
    data: {},
    store: true
  },
  // This may not be required if using Redux form
  // {
  //   name: 'MappingWizardGeneralStepContainer',
  //   type: MappingWizardGeneralStepContainer,
  //   data: {},
  //   store: true
  // },
  {
    name: 'MappingWizardClustersStepContainer',
    type: MappingWizardClustersStepContainer,
    data: {
      fetchSourceClustersUrl: '/api/sourceClusters',
      // '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=vmwarews',
      fetchTargetClustersUrl: '/api/targetClusters'
      // '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=rhevm'
    },
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
    name: 'OverviewContainer',
    type: OverviewContainer,
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
