import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import BreadcrumbPageSwitcher from './BreadcrumbPageSwitcher';

const items = [
  { name: __('Migration Plans'), href: '#/plans' },
  { name: __('Infrastructure Mappings'), href: '#/mappings' },
  { name: __('Migration Settings'), href: '#/settings' }
];

const MigrationBreadcrumbBar = ({ activeHref }) => {
  const activeItem = items.find(item => item.href === activeHref);
  return (
    <Toolbar>
      <Breadcrumb.Item active>{__('Migration')}</Breadcrumb.Item>
      <Breadcrumb.Item active>
        <strong>{activeItem.name}</strong>
      </Breadcrumb.Item>
      <BreadcrumbPageSwitcher items={items} activeHref={activeHref} />
    </Toolbar>
  );
};

MigrationBreadcrumbBar.propTypes = {
  activeHref: PropTypes.string.isRequired
};

export default MigrationBreadcrumbBar;
