import Immutable from 'seamless-immutable';

export const initialState = Immutable({
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: [],
  validateVmsUrl: '/api/dummyValidateVmsUrl'
});

export const validateVMsData = {
  method: 'POST',
  response: {
    data: {
      valid_vms: [
        {
          href: 'http://localhost:3000/api/transformation_mappings/2222',
          name: 'VMWare_VM1',
          cluster: 'VMWareCluster1',
          path: 'VMW/App1_VM1',
          allocated_size: '615577026560.0',
          id: '2222',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2223',
          name: 'VMWare_VM2',
          cluster: 'VMWareCluster2',
          path: 'VMW/App1_VM2',
          allocated_size: '532478427136.0',
          id: '2223',
          reason: 'OK'
        }
      ],
      invalid_vms: [],
      conflict_vms: []
    }
  }
};
