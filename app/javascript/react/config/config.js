import OverviewContainer from '../screens/App/Overview';
import PlanContainer from '../screens/App/Plan';

export const links = [
  {
    path: '',
    component: OverviewContainer
  },
  {
    path: 'plan/:id',
    component: PlanContainer
  }
];
