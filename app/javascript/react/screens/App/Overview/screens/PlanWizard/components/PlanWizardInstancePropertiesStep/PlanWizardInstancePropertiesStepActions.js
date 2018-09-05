import URI from 'urijs';
import API from '../../../../../../../../common/API';

import {
  QUERY_V2V_OSP_TENANT_ATTRIBUTES,
  SET_V2V_INSTANCE_PROPERTIES_ROWS,
  QUERY_V2V_OSP_BEST_FIT_FLAVOR,
  SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
  SET_UPDATED_INSTANCE_PROPERTIES_ROW_ON_STANDBY
} from './PlanWizardInstancePropertiesStepConstants';

export const _getTenantWithAttributesActionCreator = (url, tenantIds) => dispatch =>
  dispatch({
    type: QUERY_V2V_OSP_TENANT_ATTRIBUTES,
    payload: API.post(url, {
      action: 'query',
      resources: tenantIds.map(id => ({ id }))
    })
  });

export const queryTenantsWithAttributesAction = (url, tenantIds, attributes) => {
  const uri = new URI(url);
  uri.addSearch({ expand: 'resources', attributes: attributes.join(',') });
  return _getTenantWithAttributesActionCreator(uri.toString(), tenantIds);
};

export const setFlavorsAndSecurityGroups = (response, mappings, dispatch) => {
  const vmsSlugPrefix = 'vms/';
  const flavorsSlugPrefix = 'flavors/';
  const cloudTenantsSlugPrefix = 'cloud_tenants/';

  const vmBestFitFlavors = [];
  response.data.results.forEach(result => {
    const vmId = result.source_href_slug.slice(vmsSlugPrefix.length);
    const flavorId = result.best_fit.slice(flavorsSlugPrefix.length);
    const tenantId = mappings
      .find(mapping => mapping.source_href_slug === `${vmsSlugPrefix}${vmId}`)
      .destination_href_slug.slice(cloudTenantsSlugPrefix.length);

    vmBestFitFlavors.push({ vm_id: vmId, tenant_id: tenantId, flavor_id: flavorId });
  });

  dispatch({
    type: SET_V2V_BEST_FIT_FLAVORS_AND_DEFAULT_SECURITY_GROUPS,
    payload: vmBestFitFlavors
  });
};

export const _bestFitFlavorActionCreator = (url, flavor_mappings) => dispatch => {
  const postBody = {
    action: 'vm_flavor_fit',
    mappings: flavor_mappings
  };
  dispatch({
    type: QUERY_V2V_OSP_BEST_FIT_FLAVOR,
    payload: new Promise((resolve, reject) => {
      API.post(url, postBody)
        .then(response => {
          resolve(response);
          setFlavorsAndSecurityGroups(response, flavor_mappings, dispatch);
        })
        .catch(e => {
          reject(e);
        });
    })
  });
};

export const bestFitFlavorAction = (url, mappings) => {
  const uri = new URI(url);
  return _bestFitFlavorActionCreator(uri.toString(), mappings);
};

export const instancePropertiesRowsAction = rows => dispatch =>
  dispatch({
    type: SET_V2V_INSTANCE_PROPERTIES_ROWS,
    payload: rows
  });

export const setUpdatedRowOnStandbyAction = row => dispatch =>
  dispatch({
    type: SET_UPDATED_INSTANCE_PROPERTIES_ROW_ON_STANDBY,
    payload: row
  });
