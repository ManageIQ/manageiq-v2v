import { sufficientProviders, checkTargetProviders, checkSourceProviders } from '../providersHelpers';

const VMWARE_TYPE = 'ManageIQ::Providers::Vmware::InfraManager';
const RHV_TYPE = 'ManageIQ::Providers::Redhat::InfraManager';
const OSP_TYPE = 'ManageIQ::Providers::Openstack::CloudManager';

describe('checkSourceProviders helper', () => {
  test('false when there are no providers', () => {
    expect(checkSourceProviders()).toBeFalsy();
    expect(checkSourceProviders([])).toBeFalsy();
  });

  test('false when only a target provider exists', () => {
    expect(checkSourceProviders([{ type: RHV_TYPE }])).toBeFalsy();
    expect(checkSourceProviders([{ type: OSP_TYPE }])).toBeFalsy();
  });

  test('true when only a source provider exists', () => {
    expect(checkSourceProviders([{ type: VMWARE_TYPE }])).toBeTruthy();
  });

  test('true when both a source and a target provider exist', () => {
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
  });
});

describe('checkTargetProviders helper', () => {
  test('false when there are no providers', () => {
    expect(checkTargetProviders()).toBeFalsy();
    expect(checkTargetProviders([])).toBeFalsy();
  });

  test('true when only a target provider exists', () => {
    expect(checkTargetProviders([{ type: RHV_TYPE }])).toBeTruthy();
    expect(checkTargetProviders([{ type: OSP_TYPE }])).toBeTruthy();
  });

  test('false when only a source provider exists', () => {
    expect(checkTargetProviders([{ type: VMWARE_TYPE }])).toBeFalsy();
  });

  test('true when both a source and a target provider exist', () => {
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
  });
});

describe('sufficientProviders helper', () => {
  test('false when there are no providers', () => {
    expect(sufficientProviders()).toBeFalsy();
    expect(sufficientProviders([])).toBeFalsy();
  });

  test('false when only a source provider exists', () => {
    expect(sufficientProviders([{ type: VMWARE_TYPE }])).toBeFalsy();
  });

  test('false when only a target provider exists', () => {
    expect(sufficientProviders([{ type: RHV_TYPE }])).toBeFalsy();
    expect(sufficientProviders([{ type: OSP_TYPE }])).toBeFalsy();
    expect(sufficientProviders([{ type: RHV_TYPE }, { type: OSP_TYPE }])).toBeFalsy();
  });

  test('true when both a source and a target provider exist', () => {
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
    expect(sufficientProviders([{ type: VMWARE_TYPE }, { type: RHV_TYPE }, { type: OSP_TYPE }])).toBeTruthy();
  });
});
