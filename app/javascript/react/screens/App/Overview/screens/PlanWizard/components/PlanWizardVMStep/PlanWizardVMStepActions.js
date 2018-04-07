import URI from 'urijs';
import API, { globalMockMode } from '../../../../../../../../common/API';
import {
  V2V_VM_STEP_RESET,
  V2V_VALIDATE_VMS
} from './PlanWizardVMStepConstants';
import { validateVMsData } from './PlanWizardVMStep.fixtures';

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
            let response = null;
            if (vms && vms.length) {
              // create a dummy response with the imported csv vms for mock mode testing
              const dummyVms = vms.map((v, i) => {
                v.id = v.name + i;
                return v;
              });
              response = {
                data: {
                  valid_vms: dummyVms,
                  invalid_vms: validateVMsData.response.data.invalid_vms,
                  conflict_vms: validateVMsData.response.data.conflict_vms
                }
              };
            }
            return dispatch({
              type: `${V2V_VALIDATE_VMS}_FULFILLED`,
              payload: response || validateVMsData.response
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

export const csvImportAction = () => dispatch => {
  dispatch({
    type: V2V_VM_STEP_RESET
  });
};
