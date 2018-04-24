import MappingWizardContainer from '../react/screens/App/Overview/screens/MappingWizard';
import MappingWizardClustersStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import MappingWizardDatastoresStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import MappingWizardNetworksStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import MappingWizardResultsStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';

import PlanWizardVMStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardVMStep';
import PlanWizardResultsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';

import OverviewContainer from '../react/screens/App/Overview';
import PlanContainer from '../react/screens/App/Plan';
import NotificationList from '../react/screens/App/common/NotificationList';
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
        : '/api/clusters?expand=resources' +
          '&attributes=ext_management_system.emstype,v_parent_datacenter' +
          '&filter[]=ext_management_system.emstype=vmwarews',
      fetchTargetClustersUrl: mockMode
        ? '/api/dummyProviders'
        : '/api/clusters?expand=resources' +
          '&attributes=ext_management_system.emstype,v_parent_datacenter' +
          '&filter[]=ext_management_system.emstype=rhevm'
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
    name: 'PlanWizardVMStepContainer',
    type: PlanWizardVMStepContainer,
    data: {
      validateVmsUrl: mockMode
        ? '/api/dummyValidateVMUrl'
        : '/api/transformation_mappings'
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
    name: 'OverviewContainer',
    type: OverviewContainer,
    data: {
      fetchTransformationMappingsUrl: mockMode
        ? '/api/dummyMappings'
        : 'api/transformation_mappings?expand=resources' +
          '&attributes=transformation_mapping_items',
      fetchTransformationPlansUrl: mockMode
        ? '/api/dummyTransformationPlans'
        : '/api/service_templates/?' +
          "filter[]=type='ServiceTemplateTransformationPlan'" +
          '&expand=resources' +
          '&attributes=miq_requests,options,created_at' +
          '&sort_by=updated_at' +
          '&sort_order=desc',
      fetchClustersUrl: mockMode
        ? '/api/dummyClusters'
        : 'api/clusters/' +
          '?attributes=v_parent_datacenter' +
          '&expand=resources'
    },
    store: true
  },
  {
    name: 'PlanContainer',
    type: PlanContainer,
    data: {
      fetchPlanUrlBuilder: id =>
        mockMode
          ? '/api/dummyPlan'
          : `/api/service_templates/${id}/?attributes=miq_requests`,
      fetchPlanRequestUrlBuilder: id =>
        mockMode
          ? '/api/dummyPlanRequest'
          : `/api/service_requests/${id}?attributes=miq_request_tasks`
    },
    store: true
  },
  {
    name: 'NotificationList',
    type: NotificationList,
    data: true,
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
