import planWizardVMStepReducer, { initialState } from '../PlanWizardVMStepReducer';
import { V2V_VALIDATE_VMS } from '../PlanWizardVMStepConstants';

describe('VM validation', () => {
  const payload1 = {
    data: {
      valid: [{ id: '1', name: 'vm_1', path: 'some/path' }],
      invalid: [{ id: '2', name: 'vm_2', path: 'some/path' }],
      conflicted: [{ id: '3', name: 'vm_3', path: 'some/path' }]
    }
  };
  const payload2 = {
    data: {
      valid: [{ id: '4', name: 'vm_4', path: 'some/path' }],
      invalid: [{ id: '5', name: 'vm_5', path: 'some/path' }],
      conflicted: [{ id: '6', name: 'vm_6', path: 'some/path' }]
    }
  };

  it('is pending', () => {
    const action = { type: `${V2V_VALIDATE_VMS}_PENDING` };
    const prevState = initialState.set('isRejectedValidatingVms', true);
    const state = planWizardVMStepReducer(prevState, action);
    expect(state.isValidatingVms).toBe(true);
    expect(state.isRejectedValidatingVms).toBe(false);
    expect(state.numPendingValidationRequests).toBe(1);
    const state2 = planWizardVMStepReducer(state, action);
    expect(state2.numPendingValidationRequests).toBe(2);
  });

  it('is fulfilled for a single request', () => {
    const action = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload1, meta: {} };
    const prevState = initialState
      .set('isRejectedValidatingVms', true)
      .set('isValidatingVms', true)
      .set('numPendingValidationRequests', 1);
    const state = planWizardVMStepReducer(prevState, action);
    expect(state.validationServiceCalled).toBe(true);
    expect(state.isRejectedValidatingVms).toBe(false);
    expect(state.isValidatingVms).toBe(false);
    expect(state.numPendingValidationRequests).toBe(0);
    expect(state.valid_vms.map(vm => vm.id)).toEqual(['1']);
    expect(state.invalid_vms.map(vm => vm.id)).toEqual(['2']);
    expect(state.conflict_vms.map(vm => vm.id)).toEqual(['3']);
  });

  it('is fulfilled with attached CSV and path metadata', () => {
    const meta = {
      csvRows: [
        { name: 'vm_1', someArbitraryField: 'value_1' },
        { name: 'vm_2', someArbitraryField: 'value_2' },
        { name: 'vm_3', someArbitraryField: 'value_3' }
      ]
    };
    const action = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload1, meta };
    const prevState = initialState
      .set('isRejectedValidatingVms', true)
      .set('isValidatingVms', true)
      .set('numPendingValidationRequests', 1);
    const state = planWizardVMStepReducer(prevState, action);
    expect(state.valid_vms.map(vm => vm.csvFields.someArbitraryField)).toEqual(['value_1']);
    expect(state.invalid_vms.map(vm => vm.csvFields.someArbitraryField)).toEqual(['value_2']);
    expect(state.conflict_vms.map(vm => vm.csvFields.someArbitraryField)).toEqual(['value_3']);
    expect(state.valid_vms[0].provider).toBe('some');
    expect(state.valid_vms[0].datacenter).toBe('path');
    expect(state.valid_vms[0].folder).toBe('/');
  });

  it('is fulfilled combining two concurrent requests', () => {
    const meta = { combineRequests: true };
    const action1 = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload1, meta };
    const action2 = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload2, meta };
    const prevState = initialState
      .set('isRejectedValidatingVms', true)
      .set('isValidatingVms', true)
      .set('numPendingValidationRequests', 2);
    const stateAfter1 = planWizardVMStepReducer(prevState, action1);
    expect(stateAfter1.validationServiceCalled).toBe(true);
    expect(stateAfter1.isRejectedValidatingVms).toBe(false);
    expect(stateAfter1.isValidatingVms).toBe(true);
    expect(stateAfter1.numPendingValidationRequests).toBe(1);
    expect(stateAfter1.valid_vms.map(vm => vm.id)).toEqual(['1']);
    expect(stateAfter1.invalid_vms.map(vm => vm.id)).toEqual(['2']);
    expect(stateAfter1.conflict_vms.map(vm => vm.id)).toEqual(['3']);
    const stateAfter2 = planWizardVMStepReducer(stateAfter1, action2);
    expect(stateAfter2.isValidatingVms).toBe(false);
    expect(stateAfter2.numPendingValidationRequests).toBe(0);
    expect(stateAfter2.valid_vms.map(vm => vm.id)).toEqual(['1', '4']);
    expect(stateAfter2.invalid_vms.map(vm => vm.id)).toEqual(['2', '5']);
    expect(stateAfter2.conflict_vms.map(vm => vm.id)).toEqual(['3', '6']);
  });

  it('fulfills only the last request if combineRequests is unset', () => {
    const meta = {};
    const action1 = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload1, meta };
    const action2 = { type: `${V2V_VALIDATE_VMS}_FULFILLED`, payload: payload2, meta };
    const prevState = initialState
      .set('isRejectedValidatingVms', true)
      .set('isValidatingVms', true)
      .set('numPendingValidationRequests', 2);
    const stateAfter1 = planWizardVMStepReducer(prevState, action1);
    expect(stateAfter1.validationServiceCalled).toBe(true);
    expect(stateAfter1.isRejectedValidatingVms).toBe(false);
    expect(stateAfter1.isValidatingVms).toBe(true);
    expect(stateAfter1.numPendingValidationRequests).toBe(1);
    expect(stateAfter1.valid_vms.map(vm => vm.id)).toEqual(['1']);
    expect(stateAfter1.invalid_vms.map(vm => vm.id)).toEqual(['2']);
    expect(stateAfter1.conflict_vms.map(vm => vm.id)).toEqual(['3']);
    const stateAfter2 = planWizardVMStepReducer(stateAfter1, action2);
    expect(stateAfter2.isValidatingVms).toBe(false);
    expect(stateAfter2.numPendingValidationRequests).toBe(0);
    expect(stateAfter2.valid_vms.map(vm => vm.id)).toEqual(['4']);
    expect(stateAfter2.invalid_vms.map(vm => vm.id)).toEqual(['5']);
    expect(stateAfter2.conflict_vms.map(vm => vm.id)).toEqual(['6']);
  });

  it('is rejected for a single request', () => {
    const action = { type: `${V2V_VALIDATE_VMS}_REJECTED`, payload: 'error' };
    const prevState = initialState.set('isValidatingVms', true).set('numPendingValidationRequests', 1);
    const state = planWizardVMStepReducer(prevState, action);
    expect(state.errorValidatingVms).toBe('error');
    expect(state.isRejectedValidatingVms).toBe(true);
    expect(state.isValidatingVms).toBe(false);
    expect(state.numPendingValidationRequests).toBe(0);
  });

  it('is rejected for two concurrent requests', () => {
    const action = { type: `${V2V_VALIDATE_VMS}_REJECTED`, payload: 'error' };
    const prevState = initialState.set('isValidatingVms', true).set('numPendingValidationRequests', 2);
    const stateAfter1 = planWizardVMStepReducer(prevState, action);
    expect(stateAfter1.errorValidatingVms).toBe('error');
    expect(stateAfter1.isRejectedValidatingVms).toBe(true);
    expect(stateAfter1.isValidatingVms).toBe(true);
    expect(stateAfter1.numPendingValidationRequests).toBe(1);
    const stateAfter2 = planWizardVMStepReducer(stateAfter1, action);
    expect(stateAfter2.isValidatingVms).toBe(false);
    expect(stateAfter2.numPendingValidationRequests).toBe(0);
  });
});
