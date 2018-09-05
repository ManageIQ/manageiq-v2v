import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlanWizardInstancePropertiesStepTable from './components/PlanWizardInstancePropertiesStepTable';
import { OSP_TENANT } from '../../../../OverviewConstants';
import { getTenantsById, getDestinationTenantIdsBySourceClusterId, getVmsWithTargetClusterName } from './helpers';

class PlanWizardInstancePropertiesStep extends Component {
  componentDidMount() {
    const {
      selectedMapping,
      fetchOpenstackTenantUrl,
      queryOpenstackTenantAttributes,
      queryTenantsWithAttributesAction,
      vmStepSelectedVms,
      tenantsWithAttributes,
      instancePropertiesRows,
      instancePropertiesRowsAction,
      bestFitFlavorAction,
      bestFitFlavorUrl
    } = this.props;

    const targetTenants =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.filter(item => item.destination_type === OSP_TENANT);

    if (targetTenants) {
      const targetTenantIds = targetTenants.map(tenant => tenant.destination_id);

      queryTenantsWithAttributesAction(fetchOpenstackTenantUrl, targetTenantIds, queryOpenstackTenantAttributes);

      const sourceAndDestinationHrefSlugsForBestFit = [];

      vmStepSelectedVms.forEach(vm => {
        const destinationTenantId = targetTenants.filter(tenant => tenant.source_id === vm.ems_cluster_id)[0]
          .destination_id;
        sourceAndDestinationHrefSlugsForBestFit.push({
          source_href_slug: `vms/${vm.id}`,
          destination_href_slug: `cloud_tenants/${destinationTenantId}`
        });
      });

      bestFitFlavorAction(bestFitFlavorUrl, sourceAndDestinationHrefSlugsForBestFit);

      const tenantsWithAttributesById = getTenantsById(tenantsWithAttributes);
      const destinationTenantIdsBySourceClusterId = getDestinationTenantIdsBySourceClusterId(
        selectedMapping.transformation_mapping_items
      );
      const rows = getVmsWithTargetClusterName(
        vmStepSelectedVms,
        destinationTenantIdsBySourceClusterId,
        tenantsWithAttributesById
      );

      instancePropertiesRowsAction(rows);
    }
  }

  render() {
    const {
      isFetchingTenantsWithAttributes,
      tenantsWithAttributes,
      selectedMapping,
      instancePropertiesRows,
      isSettingSecurityGroupsAndBestFitFlavors,
      setUpdatedRowOnStandbyAction,
      updatedInstancePropertiesRowOnStandby,
      instancePropertiesRowsAction
    } = this.props;

    if (isFetchingTenantsWithAttributes || isSettingSecurityGroupsAndBestFitFlavors) {
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

    return (
      <PlanWizardInstancePropertiesStepTable
        rows={instancePropertiesRows}
        tenantsWithAttributesById={tenantsWithAttributesById}
        destinationTenantIdsBySourceClusterId={destinationTenantIdsBySourceClusterId}
        setUpdatedRowOnStandbyAction={setUpdatedRowOnStandbyAction}
        updatedInstancePropertiesRowOnStandby={updatedInstancePropertiesRowOnStandby}
        instancePropertiesRowsAction={instancePropertiesRowsAction}
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
  isFetchingTenantsWithAttributes: PropTypes.bool,
  instancePropertiesRowsAction: PropTypes.func,
  bestFitFlavorAction: PropTypes.func,
  isSettingSecurityGroupsAndBestFitFlavors: PropTypes.bool,
  setUpdatedRowOnStandbyAction: PropTypes.func,
  updatedInstancePropertiesRowOnStandby: PropTypes.object,
  instancePropertiesRows: PropTypes.array,
  bestFitFlavorUrl: PropTypes.string
};

PlanWizardInstancePropertiesStep.defaultProps = {
  fetchOpenstackTenantUrl: '/api/cloud_tenants',
  bestFitFlavorUrl: 'api/transformation_mappings',
  queryOpenstackTenantAttributes: ['flavors', 'security_groups']
};

export default PlanWizardInstancePropertiesStep;
