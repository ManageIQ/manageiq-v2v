import URI from 'urijs';
import API from '../../../../../../../../common/API';
import { SET_V2V_EDITING_MAPPING, FETCH_V2V_CONVERSION_HOSTS } from './MappingWizardGeneralStepConstants';

export const setEditingMappingAction = payload => ({
  type: SET_V2V_EDITING_MAPPING,
  payload
});

const _getConversionHostsActionCreator = url => dispatch =>
  dispatch({
    type: FETCH_V2V_CONVERSION_HOSTS,
    payload: API.get(url)
  });

export const fetchConversionHostsAction = url => {
  const uri = new URI(url);
  return _getConversionHostsActionCreator(uri.toString());
};
