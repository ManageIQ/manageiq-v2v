import URI from 'urijs';
import API from '../../../../../../../../common/API';

import { FETCH_V2V_OSP_GROUPS_AND_FLAVORS } from './PlanWizardInstancePropertiesStepConstants';

export const _getGroupsAndFlavorsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_OSP_GROUPS_AND_FLAVORS,
    payload: API.get(url)
  });

export const fetchGroupsAndFlavorsAction = (url, tenantId, urlParam) => {
  const uri = new URI(`${url}${tenantId}${urlParam}`);
  return _getGroupsAndFlavorsActionCreator(uri.toString());
};
