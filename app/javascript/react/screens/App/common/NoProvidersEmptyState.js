import React from 'react';
import PropTypes from 'prop-types';
import ShowWizardEmptyState from './ShowWizardEmptyState/ShowWizardEmptyState';

const NoProvidersEmptyState = ({ className, description }) => (
  <ShowWizardEmptyState
    className={className}
    title={__('Missing Providers')}
    description={description}
    action={
      <React.Fragment>
        <a href="/ems_infra/show_list">{__('View VMware and Red Hat Virtualization providers')}</a>
        <br />
        <a href="/ems_cloud/show_list">{__('View Red Hat OpenStack Platform providers')}</a>
      </React.Fragment>
    }
  />
);

NoProvidersEmptyState.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string
};

NoProvidersEmptyState.defaultProps = {
  description: __('Before attempting a migration, you must have at least one VMware and one Red Hat Virtualization or Red Hat OpenStack Platform provider configured.') // prettier-ignore
};

export default NoProvidersEmptyState;
