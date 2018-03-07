import MappingWizardContainer from '../react/screens/App/Overview/screens/MappingWizard';
import MappingWizardClustersStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import MappingWizardDatastoresStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import MappingWizardNetworksStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import MappingWizardResultsStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';
import PlanWizardResultsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';
import OverviewContainer from '../react/screens/App/Overview';
import InfrastructureMappings from '../react/screens/App/InfrastructureMappings/InfrastructureMappings';
import IsoDate from './dates/IsoDate';
import LongDateTime from './dates/LongDateTime';
import RelativeDateTime from './dates/RelativeDateTime';
import ShortDateTime from './dates/ShortDateTime';
import MiqV2vUi from '../react';
import { globalMockMode } from '../common/API';

const mockMode = globalMockMode;

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
      fetchSourceClustersUrl: mockMode
        ? '/api/dummyProviders'
        : '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=vmwarews',
      fetchTargetClustersUrl: mockMode
        ? '/api/dummyProviders'
        : '/api/providers?expand=resources&attributes=emstype,ems_clusters&filter[]=emstype=rhevm'
    },
    store: true
  },
  {
    name: 'MappingWizardDatastoresStepContainer',
    type: MappingWizardDatastoresStepContainer,
    data: {
      fetchDatastoresUrl: mockMode ? '/api/dummyClusters' : 'api/clusters'
    },
    store: true
  },
  {
    name: 'MappingWizardNetworksStepContainer',
    type: MappingWizardNetworksStepContainer,
    data: {
      fetchNetworksUrl: mockMode ? '/api/dummyClusters' : 'api/clusters'
    },
    store: true
  },
  {
    name: 'MappingWizardResultsStepContainer',
    type: MappingWizardResultsStepContainer,
    data: {
      postMappingsUrl: mockMode
        ? '/api/dummyPostMappings'
        : 'api/transformation_mappings'
    }
  },
  {
    name: 'PlanWizardResultsStepContainer',
    type: PlanWizardResultsStepContainer,
    data: {
      postPlansUrl: mockMode
        ? '/api/dummyMigrationPlansAndRequests'
        : '/api/service_templates'
    }
  },
  {
    name: 'PlanWizardContainer',
    type: PlanWizardContainer,
    data: {
      url: mockMode ? '/api/dummyMigrationPlans' : '/api/migrationPlans'
    },
    store: true
  },
  {
    name: 'InfrastructureMappings',
    type: InfrastructureMappings,
    navigation: 'Infrastructure Mappings',
    data: {}
  },
  {
    name: 'OverviewContainer',
    type: OverviewContainer,
    navigation: 'Overview',
    data: {
      fetchTransformationMappingsUrl: mockMode
        ? '/api/dummyMappings'
        : 'api/transformation_mappings?expand=resources'
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
