import http from './http';
import { links } from '../react/config/config';

const updateUrl = '/migration/menu_section_url?section=migration&url=/migration%23';
const activeMenuItemSelector = '[data-target="#menu-migration"] > div > ul > li[class="list-group-item active"]';

export const updateVerticalMenu = path => {
  // POST /migration/menu_section_url to update session[:tab_url] on server
  http.post(updateUrl + path);

  // Remove 'active' class from current active menu item
  const activeMenuItem = document.querySelector(activeMenuItemSelector);
  if (activeMenuItem !== null) {
    activeMenuItem.classList.remove('active');
  }

  // Based on location.pathname, set menu item id
  const link_item = links.find(element => {
    return element['path'].split('/')[0] === path.split('/')[1];
  });

  // Add 'active' class to correct menu item
  const newActiveMenuItem = document.querySelector(`[id="${link_item['menu_item_id']}"]`);
  if (newActiveMenuItem !== null) {
    newActiveMenuItem.classList.add('active');
  }
};
