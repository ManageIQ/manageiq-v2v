export const ospPlanReduxFormState = {
  planWizardGeneralStep: {
    registeredFields: {
      infrastructure_mapping: { name: 'infrastructure_mapping', type: 'Field', count: 0 },
      name: { name: 'name', type: 'Field', count: 0 },
      description: { name: 'description', type: 'Field', count: 0 },
      vm_choice_radio: { name: 'vm_choice_radio', type: 'Field', count: 0 }
    },
    values: {
      infrastructure_mapping: '42000000000002',
      vm_choice_radio: 'vms_via_discovery',
      name: 'test OSP plan',
      description: ''
    },
    initial: { infrastructure_mapping: null, vm_choice_radio: 'vms_via_discovery', name: '', description: '' },
    fields: {
      infrastructure_mapping: { visited: true },
      name: { visited: true, touched: true },
      description: { visited: true, touched: true }
    },
    anyTouched: true
  },
  planWizardVMStep: {
    registeredFields: { selectedVms: { name: 'selectedVms', type: 'Field', count: 0 } },
    values: { selectedVms: ['42000000000017', '42000000000006'] },
    initial: { selectedVms: [] }
  },
  planWizardInstancePropertiesStep: {
    values: {
      instancePropertiesVms: {
        rows: {
          '42000000000017': { osp_security_group_id: '42000000000016', osp_flavor_id: '42000000000004' },
          '42000000000006': { osp_security_group_id: '42000000000022', osp_flavor_id: '42000000000002' }
        },
        updatedInstancePropertiesRowOnStandby: {}
      }
    },
    initial: { instancePropertiesVms: { updatedInstancePropertiesRowOnStandby: {} } },
    registeredFields: { instancePropertiesVms: { name: 'instancePropertiesVms', type: 'Field', count: 0 } }
  },
  planWizardAdvancedOptionsStep: {
    values: {
      playbookVms: { preMigration: [], postMigration: [] },
      preMigrationPlaybook: '',
      postMigrationPlaybook: ''
    },
    initial: {
      playbookVms: { preMigration: [], postMigration: [] },
      preMigrationPlaybook: '',
      postMigrationPlaybook: ''
    },
    registeredFields: {
      preMigrationPlaybook: { name: 'preMigrationPlaybook', type: 'Field', count: 0 },
      postMigrationPlaybook: { name: 'postMigrationPlaybook', type: 'Field', count: 0 },
      playbookVms: { name: 'playbookVms', type: 'Field', count: 0 }
    }
  }
};

export const rhvPlanReduxFormState = {
  planWizardGeneralStep: {
    values: {
      infrastructure_mapping: '1',
      vm_choice_radio: 'vms_via_discovery',
      name: 'test RHV w/ playbooks',
      description: ''
    },
    initial: { infrastructure_mapping: null, vm_choice_radio: 'vms_via_discovery', name: '', description: '' },
    registeredFields: {
      infrastructure_mapping: { name: 'infrastructure_mapping', type: 'Field', count: 0 },
      name: { name: 'name', type: 'Field', count: 0 },
      description: { name: 'description', type: 'Field', count: 0 },
      vm_choice_radio: { name: 'vm_choice_radio', type: 'Field', count: 0 }
    },
    fields: {
      infrastructure_mapping: { visited: true },
      name: { visited: true, touched: true },
      description: { visited: true, touched: true }
    },
    anyTouched: true
  },
  planWizardVMStep: {
    values: { selectedVms: ['28', '36'] },
    initial: { selectedVms: [] },
    registeredFields: { selectedVms: { name: 'selectedVms', type: 'Field', count: 0 } }
  },
  planWizardInstancePropertiesStep: {},
  planWizardAdvancedOptionsStep: {
    values: {
      playbookVms: { preMigration: ['28'], postMigration: ['36'] },
      preMigrationPlaybook: '1',
      postMigrationPlaybook: '2'
    },
    initial: {
      playbookVms: { preMigration: [], postMigration: [] },
      preMigrationPlaybook: '',
      postMigrationPlaybook: ''
    },
    registeredFields: {
      preMigrationPlaybook: { name: 'preMigrationPlaybook', type: 'Field', count: 0 },
      postMigrationPlaybook: { name: 'postMigrationPlaybook', type: 'Field', count: 0 },
      playbookVms: { name: 'playbookVms', type: 'Field', count: 0 }
    }
  }
};
