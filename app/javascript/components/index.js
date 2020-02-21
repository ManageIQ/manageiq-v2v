import MappingWizardContainer from '../react/screens/App/Mappings/screens/MappingWizard';
import MappingWizardGeneralStepContainer from '../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardGeneralStep';
import MappingWizardClustersStepContainer from '../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardClustersStep';
import MappingWizardDatastoresStepContainer from '../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardDatastoresStep';
import MappingWizardNetworksStepContainer from '../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardNetworksStep';
import MappingWizardResultsStepContainer from '../react/screens/App/Mappings/screens/MappingWizard/components/MappingWizardResultsStep';

import PlanWizardVMStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardVMStep';
import PlanWizardResultsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardResultsStep';
import PlanWizardContainer from '../react/screens/App/Overview/screens/PlanWizard';
import PlanWizardAdvancedOptionsStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardAdvancedOptionsStep';
import PlanWizardInstancePropertiesStepContainer from '../react/screens/App/Overview/screens/PlanWizard/components/PlanWizardInstancePropertiesStep';

import OverviewContainer from '../react/screens/App/Overview';
import SettingsContainer from '../react/screens/App/Settings';
import PlanContainer from '../react/screens/App/Plan';
import MappingsContainer from '../react/screens/App/Mappings';
import NotificationList from '../react/screens/App/common/NotificationList';

/**
 * NOTE: This should not exist, predefining (default) props should be in components not in some registry
 * This should be deleted and all the data should be moved to popper location.
 * If you want to achieve adaptability, the simplest way is to move it into some redux store and connect components that need this
 */
export const coreComponents = [
  {
    name: 'MappingWizardContainer',
    type: MappingWizardContainer,
    store: true
  },
  {
    name: 'MappingWizardGeneralStepContainer',
    type: MappingWizardGeneralStepContainer,
    store: true
  },
  {
    name: 'MappingWizardClustersStepContainer',
    type: MappingWizardClustersStepContainer,
    store: true
  },
  {
    name: 'MappingWizardDatastoresStepContainer',
    type: MappingWizardDatastoresStepContainer,
    store: true
  },
  {
    name: 'MappingWizardNetworksStepContainer',
    type: MappingWizardNetworksStepContainer,
    store: true
  },
  {
    name: 'MappingWizardResultsStepContainer',
    type: MappingWizardResultsStepContainer
  },
  {
    name: 'PlanWizardVMStepContainer',
    type: PlanWizardVMStepContainer
  },
  {
    name: 'PlanWizardResultsStepContainer',
    type: PlanWizardResultsStepContainer
  },
  {
    name: 'PlanWizardContainer',
    type: PlanWizardContainer,
    data: {
      url: '/api/migrationPlans' // did not find this prop in the PlanWizard component
    },
    store: true
  },
  {
    name: 'PlanWizardInstancePropertiesStepContainer',
    type: PlanWizardInstancePropertiesStepContainer,
    store: true
  },
  {
    name: 'PlanWizardAdvancedOptionsStepContainer',
    type: PlanWizardAdvancedOptionsStepContainer,
    store: true
  },
  {
    name: 'OverviewContainer',
    type: OverviewContainer,
    store: true
  },
  {
    name: 'SettingsContainer',
    type: SettingsContainer,
    store: true
  },
  {
    name: 'PlanContainer',
    type: PlanContainer,
    store: true
  },
  {
    name: 'MappingsContainer',
    type: MappingsContainer,
    store: true
  },
  {
    name: 'NotificationList',
    type: NotificationList,
    data: true,
    store: true
  }
];

export const componentSettings = component => coreComponents.find(n => n.type === component);
