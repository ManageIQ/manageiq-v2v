import MappingWizardContainer from '../react/screens/App/Overview/screens/MappingWizard';
import MappingWizardClustersStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import MappingWizardDatastoresStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import MappingWizardNetworksStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';
import OverviewContainer from '../react/screens/App/Overview';
import InfrastructureMappings from '../react/screens/App/InfrastructureMappings/InfrastructureMappings';
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
  {
    name: 'MappingWizardClustersStepContainer',
    type: MappingWizardClustersStepContainer,
    data: {
      fetchSourceClustersUrl: '/api/dummyProviders',
      // '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=vmwarews',
      fetchTargetClustersUrl: '/api/dummyProviders'
      // '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=rhevm'
    },
    store: true
  },
  {
    name: 'MappingWizardDatastoresStepContainer',
    type: MappingWizardDatastoresStepContainer,
    data: {
      fetchDatastoresUrl: '/api/dummyClusters'
      // will become 'api/clusters/1?attributes=storages'
    },
    store: true
  },
  {
    name: 'MappingWizardNetworksStepContainer',
    type: MappingWizardNetworksStepContainer,
    data: {
      fetchNetworksUrl: '/api/dummyClusters'
      // will become 'api/clusters/1?attributes=lans'
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
    name: 'InfrastructureMappings',
    type: InfrastructureMappings,
    navigation: 'Infrastructure Mappings',
    path: '/migration/infrastructure-mappings',
    data: {}
  },
  {
    name: 'OverviewContainer',
    type: OverviewContainer,
    navigation: 'Overview',
    path: '/migration',
    data: {
      fetchTransformationMappingsUrl: '/api/dummyMappings'
      // 'api/transformation_mappings'
    },
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
