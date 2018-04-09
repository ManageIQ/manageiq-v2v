import OverviewContainer from '../screens/App/Overview';
import PlanContainer from '../screens/App/Plan';

export const links = [
  {
    text: 'Overview',
    path: 'migration/',
    component: OverviewContainer
  },
  {
    text: 'Plan',
    path: 'migration/plan/:id',
    component: PlanContainer
  }
];
