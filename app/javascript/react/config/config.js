import OverviewContainer from '../screens/App/Overview';
import Settings from '../screens/App/Settings';
import PlanContainer from '../screens/App/Plan';
import MappingsContainer from '../screens/App/Mappings';

export const links = [
  {
    path: '/migration/plans',
    component: OverviewContainer
  },
  {
    path: '/migration/settings',
    component: Settings
  },
  {
    path: '/migration/plan/:id',
    component: PlanContainer
  },
  {
    path: '/migration/mappings',
    component: MappingsContainer
  }
];
