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
          name: 'amaya-at',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2222',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2223',
          name: 'vmware-1',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2223',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2224',
          name: 'vmware-2',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2224',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2225',
          name: 'vmware-3',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2225',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2226',
          name: 'vmware-4',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2226',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2227',
          name: 'vmware-5',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2227',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2228',
          name: 'vmware-6',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2228',
          reason: 'OK'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/2229',
          name: 'vmware-7',
          cluster: 'Default',
          path: 'RHV/Default',
          allocated_size: '32212254720.0',
          id: '2229',
          reason: 'OK'
        }
      ],
      invalid_vms: [
        {
          name: 'nonsense',
          reason: 'VM does not exist'
        }
      ],
      conflict_vms: [
        {
          href: 'http://localhost:3000/api/transformation_mappings/9',
          name: 'cfmetest67',
          cluster: 'Raleigh',
          path: 'vCenter/Datacenter',
          allocated_size: '17179869184.0',
          id: '9',
          reason: 'Conflict'
        },
        {
          href: 'http://localhost:3000/api/transformation_mappings/8',
          name: 'cfmetest67',
          cluster: 'Raleigh',
          path: 'vCenter/Datacenter',
          allocated_size: '17179869184.0',
          id: '8',
          reason: 'Conflict'
        }
      ]
    }
  }
};
