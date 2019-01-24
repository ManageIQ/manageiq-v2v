import OverviewContainer from '../screens/App/Overview';
import Settings from '../screens/App/Settings';
import PlanContainer from '../screens/App/Plan';
import MappingsContainer from '../screens/App/Mappings';

export const links = [
  {
    path: 'plans',
    component: OverviewContainer,
    menu_item_id: 'menu_item_plans'
  },
  {
    path: 'settings',
    component: Settings,
    menu_item_id: 'menu_item_settings'
  },
  {
    path: 'settings/conversion_hosts',
    component: Settings,
    menu_item_id: 'menu_item_settings'
  },
  {
    path: 'plan/:id',
    component: PlanContainer,
    menu_item_id: 'menu_item_plans'
  },
  {
    path: 'mappings',
    component: MappingsContainer,
    menu_item_id: 'menu_item_mappings'
  },
  {
    path: '',
    redirect: 'plans'
  }
];
