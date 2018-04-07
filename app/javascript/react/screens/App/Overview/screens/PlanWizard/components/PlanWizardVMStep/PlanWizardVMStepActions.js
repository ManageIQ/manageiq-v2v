import URI from 'urijs';
import API, { globalMockMode } from '../../../../../../../../common/API';
import { V2V_VALIDATE_VMS } from './PlanWizardVMStepConstants';
import { initialState, validateVMsData } from './PlanWizardVMStep.fixtures';

const mockMode = globalMockMode;

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
          if (mockMode) {
            return dispatch({
              type: `${V2V_VALIDATE_VMS}_FULFILLED`,
              payload: validateVMsData.response
            });
          }
          return reject(e);
        });
    })
  });
};

export const validateVmsAction = (url, id, vms) => {
  const uri = new URI(`${url}/${id}`);

  return _validateVmsActionCreator(uri.toString(), vms);
};
