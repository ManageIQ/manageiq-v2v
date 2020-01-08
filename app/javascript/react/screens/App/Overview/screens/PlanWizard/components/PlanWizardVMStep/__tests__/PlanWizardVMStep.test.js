import React from 'react';
import { mount, shallow } from 'enzyme';
import { PlanWizardVMStep } from '../PlanWizardVMStep';
import { RHV } from '../../../../../../../../../common/constants';

const getBaseProps = () => ({
  infrastructure_mapping_id: '1',
  pristine: true,
  vm_choice_radio: 'vms_via_discovery',
  validateVmsAction: jest.fn(),
  csvImportAction: jest.fn(),
  showConfirmModalAction: jest.fn(),
  hideConfirmModalAction: jest.fn(),
  csvParseErrorAction: jest.fn(),
  fetchTargetValidationDataAction: jest.fn(),
  targetProviderType: RHV
});

describe('VM discovery and target validation on mount', () => {
  test('validate VMs action is called on mount in discovery mode', () => {
    const props = getBaseProps();
    mount(<PlanWizardVMStep {...props} />);
    expect(props.validateVmsAction).toHaveBeenCalledTimes(1);
  });

  test('validate VMs action is NOT called on mount in CSV mode', () => {
    const props = {
      ...getBaseProps(),
      vm_choice_radio: 'vms_via_csv'
    };
    mount(<PlanWizardVMStep {...props} />);
    expect(props.validateVmsAction).toHaveBeenCalledTimes(0);
  });

  test('validate VMs action is NOT called on mount if the form is dirty', () => {
    const props = {
      ...getBaseProps(),
      pristine: false
    };
    mount(<PlanWizardVMStep {...props} />);
    expect(props.validateVmsAction).toHaveBeenCalledTimes(0);
  });

  test('validate VMs action is called twice on mount when editing a plan', async () => {
    const props = {
      ...getBaseProps(),
      editingPlan: { options: { config_info: { actions: [{ vm_id: '1' }] } } },
      shouldPrefillForEditing: true,
      queryPreselectedVmsAction: jest.fn(() => Promise.resolve({ value: { data: { results: [{ name: 'vm_1' }] } } }))
    };
    mount(<PlanWizardVMStep {...props} />);
    await expect(props.queryPreselectedVmsAction).toHaveBeenCalledTimes(1);
    expect(props.validateVmsAction).toHaveBeenCalledTimes(2);
  });

  test('fetch target validation data action is called on mount', () => {
    const props = getBaseProps();
    mount(<PlanWizardVMStep {...props} />);
    expect(props.fetchTargetValidationDataAction).toHaveBeenCalledTimes(1);
    expect(props.fetchTargetValidationDataAction).toHaveBeenCalledWith(props.targetProviderType);
  });
});

describe('table rows', () => {
  test('render correctly with nothing pre-selected', () => {
    const props = {
      ...getBaseProps(),
      validationServiceCalled: true,
      valid_vms: [{ id: '1', name: 'vm_1' }, { id: '2', name: 'vm_2' }],
      invalid_vms: [{ id: '3', name: 'vm_3' }]
    };
    const component = shallow(<PlanWizardVMStep {...props} />);
    expect(component).toMatchSnapshot();
  });

  test('render correctly with some VMs pre-selected for editing', () => {
    const props = {
      ...getBaseProps(),
      validationServiceCalled: true,
      valid_vms: [{ id: '1', name: 'vm_1' }, { id: '2', name: 'vm_2' }],
      invalid_vms: [{ id: '3', name: 'vm_3' }],
      editingPlan: { options: { config_info: { actions: [{ vm_id: '1' }] } } },
      shouldPrefillForEditing: true,
      queryPreselectedVmsAction: jest.fn(() => Promise.resolve({ value: { data: { results: [{ name: 'vm_1' }] } } }))
    };
    const component = shallow(<PlanWizardVMStep {...props} />);
    expect(component).toMatchSnapshot();
  });
});
