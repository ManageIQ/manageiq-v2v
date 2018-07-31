import MappingWizardContainer from '../react/screens/App/Overview/screens/MappingWizard';
import MappingWizardClustersStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardClustersStep';
import MappingWizardDatastoresStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardDatastoresStep';
import MappingWizardNetworksStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardNetworksStep';
import MappingWizardResultsStepContainer from '../react/screens/App/Overview/screens/MappingWizard/components/MappingWizardResultsStep';

import PlanWizardVMStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardVMStep';
import PlanWizardResultsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';
import PlanWizardAdvancedOptionsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardAdvancedOptionsStep';

import OverviewContainer from '../react/screens/App/Overview';
import PlanContainer from '../react/screens/App/Plan';
import NotificationList from '../react/screens/App/common/NotificationList';
import IsoDate from './dates/IsoDate';
import LongDateTime from './dates/LongDateTime';
import RelativeDateTime from './dates/RelativeDateTime';
import ShortDateTime from './dates/ShortDateTime';
import ManageIQV2V from '../react';

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
      fetchSourceClustersUrl:
        '/api/clusters?expand=resources' +
        '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name' +
        '&filter[]=ext_management_system.emstype=vmwarews',
      fetchTargetComputeUrls: {
        rhevm:
          '/api/clusters?expand=resources' +
          '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
          '&filter[]=ext_management_system.emstype=rhevm',
        openstack: '/api/cloud_tenants?expand=resources&attributes=ext_management_system.name'
      },
      queryHostsUrl: '/api/hosts?attributes=tags'
    },
    store: true
  },
  {
    name: 'MappingWizardDatastoresStepContainer',
    type: MappingWizardDatastoresStepContainer,
    data: {
      fetchStoragesUrls: {
        source: 'api/clusters',
        rhevm: 'api/clusters',
        openstack: 'api/cloud_tenants'
      }
    },
    store: true
  },
  {
    name: 'MappingWizardNetworksStepContainer',
    type: MappingWizardNetworksStepContainer,
    data: {
      fetchNetworksUrls: {
        source: 'api/clusters',
        rhevm: 'api/clusters',
        openstack: 'api/cloud_tenants'
      }
    },
    store: true
  },
  {
    name: 'MappingWizardResultsStepContainer',
    type: MappingWizardResultsStepContainer,
    data: {
      postMappingsUrl: 'api/transformation_mappings'
    }
  },
  {
    name: 'PlanWizardVMStepContainer',
    type: PlanWizardVMStepContainer,
    data: {
      validateVmsUrl: '/api/transformation_mappings'
    }
  },
  {
    name: 'PlanWizardResultsStepContainer',
    type: PlanWizardResultsStepContainer,
    data: {
      postPlansUrl: '/api/service_templates'
    }
  },
  {
    name: 'PlanWizardContainer',
    type: PlanWizardContainer,
    data: {
      url: '/api/migrationPlans'
    },
    store: true
  },
  {
    name: 'PlanWizardAdvancedOptionsStepContainer',
    type: PlanWizardAdvancedOptionsStepContainer,
    data: {
      fetchPlaybooksUrl: "/api/service_templates/?filter[]=type='ServiceTemplateAnsiblePlaybook'&expand=resources"
    },
    store: true
  },
  {
    name: 'OverviewContainer',
    type: OverviewContainer,
    data: {
      archiveTransformationPlanUrl: '/api/service_templates',
      fetchTransformationMappingsUrl:
        'api/transformation_mappings?expand=resources' +
        '&attributes=transformation_mapping_items,service_templates' +
        '&sort_by=updated_at' +
        '&sort_order=desc',
      fetchTransformationPlansUrl:
        '/api/service_templates/?' +
        "filter[]=type='ServiceTemplateTransformationPlan'" +
        '&filter[]=active=true' +
        '&expand=resources,schedules' +
        '&attributes=name,description,miq_requests,options,created_at' +
        '&sort_by=updated_at' +
        '&sort_order=desc',
      fetchServiceTemplateAnsiblePlaybooksUrl:
        '/api/service_templates/?' +
        "filter[]=type='ServiceTemplateAnsiblePlaybook'" +
        '&expand=resources' +
        '&attributes=name,description,created_at',
      fetchArchivedTransformationPlansUrl:
        '/api/service_templates/?' +
        "filter[]=type='ServiceTemplateTransformationPlan'" +
        '&filter[]=archived=true' +
        '&expand=resources' +
        '&attributes=name,description,miq_requests,options,created_at' +
        '&sort_by=updated_at' +
        '&sort_order=desc',
      fetchClustersUrl:
        'api/clusters/' +
        '?attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,lans,storages' +
        '&expand=resources',
      fetchNetworksUrl: 'api/lans/?expand=resources',
      fetchDatastoresUrl: 'api/data_stores?expand=resources'
    },
    store: true
  },
  {
    name: 'PlanContainer',
    type: PlanContainer,
    data: {
      fetchPlanUrl: '/api/service_templates',
      fetchTasksForAllRequestsForPlanUrl: '/api/requests?expand=resource&attributes=miq_request_tasks',
      fetchOrchestrationStackUrl: '/api/orchestration_stacks',
      cancelPlanRequestTasksUrl: '/api/request_tasks'
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
  { name: 'manageiq-v2v', type: ManageIQV2V }
];

export const componentSettings = component => coreComponents.find(n => n.type === component);
