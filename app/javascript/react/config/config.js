import OverviewContainer from '../screens/App/Overview';
import PlanContainer from '../screens/App/Plan';

export const links = [
  {
    path: 'migration/',
    component: OverviewContainer
  },
  {
    path: 'migration/plan/:id',
    component: PlanContainer
  }
];
