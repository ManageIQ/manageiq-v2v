import http from './http';

const updateUrl = '/migration/menu_section_url?section=migration&url=/migration%23';
const activeMenuItemSelector = '[data-target="#menu-migration"] > div > ul > li[class="list-group-item active"]';
const plansMenuItemId = 'menu_item_plans';
const mappingsMenuItemId = 'menu_item_mappings';
const settingsMenuItemId = 'menu_item_settings';
const pathToMenuItem = {
  plan: plansMenuItemId,
  plans: plansMenuItemId,
  mappings: mappingsMenuItemId,
  settings: settingsMenuItemId
};

export const updateVerticalMenu = path => {
  // POST /migration/menu_section_url to update session[:tab_url] on server
  http.post(updateUrl + path);

  // Remove 'active' class from current active menu item
  const activeMenuItem = document.querySelector(activeMenuItemSelector);
  if (activeMenuItem !== null) {
    activeMenuItem.classList.remove('active');
  }

  // Based on location.pathname, set menu item id
  const menu_item_id = pathToMenuItem[path.split('/')[1]];

  // Add 'active' class to menu_item_id
  const newActiveMenuItem = document.querySelector(`[id="${menu_item_id}"]`);
  if (newActiveMenuItem !== null) {
    newActiveMenuItem.classList.add('active');
  }
};
