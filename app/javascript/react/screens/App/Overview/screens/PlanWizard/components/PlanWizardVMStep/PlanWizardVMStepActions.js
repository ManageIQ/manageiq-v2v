import { reset } from 'redux-form';
import URI from 'urijs';
import API from '../../../../../../../../common/API';
import { V2V_VM_STEP_RESET, V2V_VALIDATE_VMS } from './PlanWizardVMStepConstants';

export { showConfirmModalAction, hideConfirmModalAction } from '../../../../OverviewActions';

const _validateVmsActionCreator = (url, vms) => dispatch => {
  const postBody = {
    action: 'validate_vms',
    import: vms
  };
  dispatch({
    type: V2V_VALIDATE_VMS,
    payload: new Promise((resolve, reject) => {
      API.post(url, postBody)
        .then(response => {
          resolve(response);
        })
        .catch(e => {
          reject(e);
        });
    })
  });
};

export const validateVmsAction = (url, id, vms) => {
  const uri = new URI(`${url}/${id}`);

  return _validateVmsActionCreator(uri.toString(), vms);
};

export const csvImportAction = () => dispatch => {
  dispatch({
    type: V2V_VM_STEP_RESET
  });
  dispatch(reset('planWizardVMStep'));
};

export const csvParseErrorAction = errMsg => dispatch => {
  dispatch({
    type: `${V2V_VALIDATE_VMS}_CSV_PARSE_ERROR`,
    payload: errMsg
  });
};
