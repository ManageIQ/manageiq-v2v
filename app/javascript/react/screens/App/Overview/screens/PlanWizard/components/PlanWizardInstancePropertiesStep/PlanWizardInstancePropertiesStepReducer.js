import Immutable from 'seamless-immutable';
import {
  QUERY_V2V_OSP_TENANT_ATTRIBUTES,
  SET_V2V_INSTANCE_PROPERTIES_ROWS,
  QUERY_V2V_OSP_BEST_FIT_FLAVOR,
  SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
  PLAN_WIZARD_EXITED,
  PLAN_WIZARD_NEXT
} from './PlanWizardInstancePropertiesStepConstants';

import { stepIDs } from '../../PlanWizardConstants';

const initialState = Immutable({
  tenantsWithAttributes: [],
  isFetchingTenantsWithAttributes: false,
  isRejectedTenantsWithAttributes: false,
  errorTenantsWithAttributes: null,
  bestFitFlavors: [],
  isFetchingBestFitFlavor: false,
  isRejectedBestFitFlavor: false,
  errorBestFitFlavor: null,
  instancePropertiesRows: [],
  isSettingSecurityGroupsAndBestFitFlavors: true,
  recalculateBestFitFlavorAndSecurityGroup: true
});

export default (state = initialState, action) => {
  switch (action.type) {
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_PENDING`:
      return state
        .set('isSettingSecurityGroupsAndBestFitFlavors', true)
        .set('isFetchingTenantsWithAttributes', true)
        .set('isRejectedTenantsWithAttributes', false);
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_FULFILLED`:
      return state
        .set('tenantsWithAttributes', action.payload.data.results)
        .set('isFetchingTenantsWithAttributes', false)
        .set('isRejectedTenantsWithAttributes', false)
        .set('errorTenantsWithAttributes', null);
    case `${QUERY_V2V_OSP_TENANT_ATTRIBUTES}_REJECTED`:
      return state
        .set('errorTenantsWithAttributes', action.payload)
        .set('isFetchingTenantsWithAttributes', false)
        .set('isRejectedTenantsWithAttributes', true);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_PENDING`:
      return state.set('isFetchingBestFitFlavor', true).set('isRejectedBestFitFlavor', false);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_FULFILLED`:
      return state
        .set('bestFitFlavors', action.payload.data.results)
        .set('isFetchingBestFitFlavor', false)
        .set('isRejectedBestFitFlavor', false)
        .set('errorBestFitFlavor', null);
    case `${QUERY_V2V_OSP_BEST_FIT_FLAVOR}_REJECTED`:
      return state
        .set('errorBestFitFlavor', action.payload)
        .set('isFetchingBestFitFlavor', false)
        .set('isRejectedBestFitFlavor', true);
    case SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS: {
      const { vmBestFitFlavors, editingPlan } = action.payload;
      const instancePropertiesRowsUpdatedWithBestFlavor = [];
      vmBestFitFlavors.forEach(vmFlavor => {
        const existingInstancePropertiesRow = state.instancePropertiesRows.find(row => row.id === vmFlavor.vm_id);
        const tenant = state.tenantsWithAttributes.find(
          tenantsWithAttribute => tenantsWithAttribute.id === vmFlavor.tenant_id
        );
        const tenantFlavors = tenant && tenant.flavors;
        const tenantSecurityGroups = tenant && tenant.security_groups;

        let bestFitFlavor;
        let bestFitFlavorId = vmFlavor.flavor_id;
        if (bestFitFlavorId) {
          bestFitFlavor = tenantFlavors && tenantFlavors.find(flavor => flavor.id === bestFitFlavorId);
        } else {
          bestFitFlavor =
            tenantFlavors &&
            tenantFlavors.reduce((prev, current) => {
              if (prev.memory > current.memory) return prev;
              if (prev.memory < current.memory) return current;
              return prev.cpus > current.cpus ? prev : current;
            });
          bestFitFlavorId = bestFitFlavor && bestFitFlavor.id;
        }

        const bestFitFlavorName = bestFitFlavor && bestFitFlavor.name;
        const defaultSecurityGroup = tenant && tenant.default_security_group;
        const defaultSecurityGroupId = defaultSecurityGroup && defaultSecurityGroup.id;
        const defaultSecurityGroupName = defaultSecurityGroup && defaultSecurityGroup.name;

        const bestFlavor = { name: bestFitFlavorName, id: bestFitFlavorId };
        const bestGroup = { name: defaultSecurityGroupName, id: defaultSecurityGroupId };

        let preselectedFlavor;
        let preselectedGroup;

        if (editingPlan) {
          const existingVm = editingPlan.options.config_info.actions.find(
            vm => vm.vm_id === existingInstancePropertiesRow.id
          );
          if (existingVm) {
            const existingFlavor =
              tenantFlavors && tenantFlavors.find(flavor => flavor.id === existingVm.osp_flavor_id);
            const existingGroup =
              tenantSecurityGroups && tenantSecurityGroups.find(group => group.id === existingVm.osp_security_group_id);
            preselectedFlavor = existingFlavor && { name: existingFlavor.name, id: existingFlavor.id };
            preselectedGroup = existingGroup && { name: existingGroup.name, id: existingGroup.id };
          }
        }

        const rowUpdatedWithBestFlavor = {
          ...existingInstancePropertiesRow,
          osp_flavor: preselectedFlavor || bestFlavor,
          osp_security_group: preselectedGroup || bestGroup,
          target_cluster_name: tenant.name
        };
        instancePropertiesRowsUpdatedWithBestFlavor.push(rowUpdatedWithBestFlavor);
      });
      return state
        .set('isSettingSecurityGroupsAndBestFitFlavors', false)
        .set('instancePropertiesRows', instancePropertiesRowsUpdatedWithBestFlavor);
    }
    case SET_V2V_INSTANCE_PROPERTIES_ROWS:
      return state.set('instancePropertiesRows', action.payload);
    case PLAN_WIZARD_EXITED:
      return initialState;
    case PLAN_WIZARD_NEXT:
      return state.set('recalculateBestFitFlavorAndSecurityGroup', action.payload === stepIDs.vmStep);
    default:
      return state;
  }
};
