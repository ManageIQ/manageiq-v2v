export const getVMStepSelectedVms = (allVms, selectedVms) => allVms.filter(vm => selectedVms.includes(vm.id));
