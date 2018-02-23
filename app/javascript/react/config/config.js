import OverviewContainer from '../screens/App/Overview';
import InfrastructureMappings from '../screens/App/InfrastructureMappings/InfrastructureMappings';

export const links = [
  {
    text: 'Overview',
    path: 'migration/',
    component: OverviewContainer
  },
  {
    text: 'Infrastructure Mappings',
    path: 'migration/infrastructure-mappings',
    component: InfrastructureMappings
  }
];
