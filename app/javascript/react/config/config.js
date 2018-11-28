import OverviewContainer from '../screens/App/Overview';
import Settings from '../screens/App/Settings';
import PlanContainer from '../screens/App/Plan';
import MappingsContainer from '../screens/App/Mappings';

export const links = [
  {
    path: 'plans',
    component: OverviewContainer
  },
  {
    path: 'settings',
    component: Settings
  },
  {
    path: 'plan/:id',
    component: PlanContainer
  },
  {
    path: 'mappings',
    component: MappingsContainer
  }
];
