import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import BreadcrumbPageSwitcher from './BreadcrumbPageSwitcher';

const defaultItems = [
  { name: __('Migration Plans'), href: '#/plans', productFeature: 'migration' },
  { name: __('Infrastructure Mappings'), href: '#/mappings', productFeature: 'mappings' },
  { name: __('Migration Settings'), href: '#/settings', productFeature: 'migration_settings' }
];

const MigrationBreadcrumbBar = ({ activeHref, productFeatures }) => {
  const activeItem = defaultItems.find(item => item.href === activeHref);
  const enabledItems = productFeatures.includes('everything')
    ? defaultItems
    : defaultItems.filter(item => productFeatures.includes(item.productFeature));
  return (
    <Toolbar>
      <Breadcrumb.Item active>{__('Migration')}</Breadcrumb.Item>
      <Breadcrumb.Item active>
        <strong>{activeItem.name}</strong>
      </Breadcrumb.Item>
      <BreadcrumbPageSwitcher items={enabledItems} activeHref={activeHref} />
    </Toolbar>
  );
};

MigrationBreadcrumbBar.propTypes = {
  activeHref: PropTypes.string.isRequired,
  productFeatures: PropTypes.array
};

export default MigrationBreadcrumbBar;
