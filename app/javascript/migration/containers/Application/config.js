import Welcome from '../../scenes/Welcome';
import Dashboard from '../../scenes/Dashboard';

// eslint-disable-next-line import/prefer-default-export
export const links = [
  {
    text: 'Welcome',
    path: 'migration/',
    component: Welcome,
  },
  {
    text: 'Dashboard',
    path: 'migration/dashboard',
    component: Dashboard,
  },
];
