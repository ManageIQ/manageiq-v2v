import URI from 'urijs';
import API from '../../../../../../../../common/API';

import { QUERY_V2V_OSP_TENANT_ATTRIBUTES } from './PlanWizardInstancePropertiesStepConstants';

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
