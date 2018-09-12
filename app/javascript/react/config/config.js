import OverviewContainer from '../screens/App/Overview';
import PlanContainer from '../screens/App/Plan';
import MappingsContainer from '../screens/App/Mappings';

export const links = [
  {
    path: '',
    component: OverviewContainer
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
