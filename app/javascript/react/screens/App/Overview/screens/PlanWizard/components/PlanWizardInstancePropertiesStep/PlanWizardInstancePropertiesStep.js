import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import PlanWizardInstancePropertiesStepTable from './components/PlanWizardInstancePropertiesStepTable';
import { OSP_TENANT } from '../../../../OverviewConstants';
import {
  getTenantsById,
  getDestinationTenantIdsBySourceClusterId,
  getVmsWithTargetClusterName
} from './helpers';

class PlanWizardInstancePropertiesStep extends Component {
  componentDidMount() {
    const {
      selectedMapping,
      fetchOpenstackTenantUrl,
      queryOpenstackTenantAttributes,
      queryTenantsWithAttributesAction
    } = this.props;

    const targetTenants =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.filter(item => item.destination_type === OSP_TENANT);

    if (targetTenants) {
      const targetTenantIds = targetTenants.map(tenant => tenant.destination_id);
      queryTenantsWithAttributesAction(fetchOpenstackTenantUrl, targetTenantIds, queryOpenstackTenantAttributes);
    }
  }

  render() {
    const { vmStepSelectedVms, tenantsWithAttributes, isFetchingTenantsWithAttributes, selectedMapping } = this.props;

    if (isFetchingTenantsWithAttributes) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Loading OpenStack Properties...')}</h3>
        </div>
      );
    }

    const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
    const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
      selectedMapping.transformation_mapping_items
    );
    const rows = getVmsWithTargetClusterName(
      vmStepSelectedVms,
      destinationTenantIdsBySourceClusterId,
      tenantsWithAttributesById
    );

    return (
      <Field
        name="ospInstanceProperties"
        component={PlanWizardInstancePropertiesStepTable}
        rows={rows}
        tenantsWithAttributesById={tenantsWithAttributesById}
        destinationTenantIdsBySourceClusterId={destinationTenantIdsBySourceClusterId}
      />
    );
  }
}

PlanWizardInstancePropertiesStep.propTypes = {
  vmStepSelectedVms: PropTypes.array,
  selectedMapping: PropTypes.object,
  fetchOpenstackTenantUrl: PropTypes.string,
  queryOpenstackTenantAttributes: PropTypes.arrayOf(PropTypes.string),
  queryTenantsWithAttributesAction: PropTypes.func,
  tenantsWithAttributes: PropTypes.array,
  isFetchingTenantsWithAttributes: PropTypes.bool
};

PlanWizardInstancePropertiesStep.defaultProps = {
  fetchOpenstackTenantUrl: '/api/cloud_tenants',
  queryOpenstackTenantAttributes: ['flavors', 'security_groups']
};

export default reduxForm({
  form: 'planWizardInstancePropertiesStep',
  initialValues: {},
  destroyOnUnmount: false
})(PlanWizardInstancePropertiesStep);
