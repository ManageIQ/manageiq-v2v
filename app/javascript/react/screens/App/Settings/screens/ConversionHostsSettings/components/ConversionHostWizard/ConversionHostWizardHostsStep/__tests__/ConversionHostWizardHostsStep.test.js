import React from 'react';
import { shallow } from 'enzyme';
import { reducer as formReducer } from 'redux-form';

import { generateStore } from '../../../../../../../common/testReduxHelpers';
import ConversionHostWizardHostsStep from '../ConversionHostWizardHostsStep';
import { RHV, CONVERSION_HOST_TYPES, OPENSTACK } from '../../../../../../../../../../common/constants';
import { FINISHED } from '../../../../ConversionHostsSettingsConstants';

const mockConfiguredRhvHost = { id: '1', name: 'already-configured-host', type: CONVERSION_HOST_TYPES[RHV][0] };
const mockInProgressRhvHost = { id: '2', name: 'host-being-configured', type: CONVERSION_HOST_TYPES[RHV][0] };

const mockConfiguredOspVm = { id: '1', name: 'already-configured-vm', type: CONVERSION_HOST_TYPES[OPENSTACK][0] };
const mockInProgressOspVm = { id: '2', name: 'vm-being-configured', type: CONVERSION_HOST_TYPES[OPENSTACK][0] };

const mockRhvCluster = {
  mock: 'cluster',
  vms: [
    mockConfiguredRhvHost,
    mockInProgressRhvHost,
    { id: '3', name: 'available-host-1', type: CONVERSION_HOST_TYPES[RHV][0] },
    { id: '4', name: 'available-host-2', type: CONVERSION_HOST_TYPES[RHV][0] }
  ]
};

const mockOspTenant = {
  mock: 'tenant',
  vms: [
    mockConfiguredOspVm,
    mockInProgressOspVm,
    { id: '3', name: 'available-vm-1', type: CONVERSION_HOST_TYPES[OPENSTACK][0] },
    { id: '4', name: 'available-vm-2', type: CONVERSION_HOST_TYPES[OPENSTACK][0] }
  ]
};

const mockConversionHosts = [
  {
    mock: 'rhvConversionHost',
    resource: { ...mockConfiguredRhvHost }
  },
  {
    mock: 'ospConversionHost',
    resource: { ...mockConfiguredOspVm }
  }
];

const mockTasksByResource = {
  [CONVERSION_HOST_TYPES[RHV][0]]: {
    '1': { enable: [{ mock: 'task', state: FINISHED }] },
    '2': { enable: [{ mock: 'task', state: 'Active' }] }
  },
  [CONVERSION_HOST_TYPES[OPENSTACK][0]]: {
    '1': { enable: [{ mock: 'task', state: FINISHED }] },
    '2': { enable: [{ mock: 'task', state: 'Active' }] }
  }
};

describe('conversion host wizard hosts step', () => {
  const store = generateStore({ form: formReducer }, {});

  const baseProps = {
    selectedProviderType: RHV,
    selectedCluster: mockRhvCluster,
    conversionHosts: mockConversionHosts,
    conversionHostTasksByResource: mockTasksByResource,
    store
  };

  const shallowDive = jsx => {
    const connectWrapper = shallow(jsx); // <Connect(Form(ConversionHostWizardHostsStep))>
    const formWrapper = connectWrapper.dive(); // <Form(ConversionHostWizardHostsStep)>
    const componentWrapper = formWrapper.dive(); // <ConversionHostWizardHostsStep>
    return componentWrapper.dive(); // shallow-rendered ConversionHostWizardHostsStep
  };

  it('renders the redux-form wrapper correctly', () => {
    const component = shallow(<ConversionHostWizardHostsStep {...baseProps} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly in the RHV example case', () => {
    const component = shallowDive(<ConversionHostWizardHostsStep {...baseProps} />);
    expect(component).toMatchSnapshot();
  });

  it('filters out options for RHV hosts that are configured or being configured', () => {
    const component = shallowDive(<ConversionHostWizardHostsStep {...baseProps} />);
    const filteredHostOptions = component.find('Field[controlId="host-selection"]').props().options;
    expect(filteredHostOptions.find(option => option === mockConfiguredRhvHost)).toBeFalsy();
    expect(filteredHostOptions.find(option => option === mockInProgressRhvHost)).toBeFalsy();
  });

  it('renders correctly in the OSP example case', () => {
    const component = shallowDive(
      <ConversionHostWizardHostsStep {...baseProps} selectedProviderType={OPENSTACK} selectedCluster={mockOspTenant} />
    );
    expect(component).toMatchSnapshot();
  });

  it('filters out options for OSP hosts that are configured or being configured', () => {
    const component = shallowDive(
      <ConversionHostWizardHostsStep {...baseProps} selectedProviderType={OPENSTACK} selectedCluster={mockOspTenant} />
    );
    const filteredHostOptions = component.find('Field[controlId="host-selection"]').props().options;
    expect(filteredHostOptions.find(option => option === mockConfiguredOspVm)).toBeFalsy();
    expect(filteredHostOptions.find(option => option === mockInProgressOspVm)).toBeFalsy();
  });

  it('renders correctly when there are no hosts available', () => {
    const component = shallowDive(<ConversionHostWizardHostsStep {...baseProps} selectedCluster={{ vms: [] }} />);
    expect(component).toMatchSnapshot();
  });
});
