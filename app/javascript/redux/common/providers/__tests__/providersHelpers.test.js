import { sufficientProviders } from '../providersHelpers';

describe('sufficientProviders helper', () => {
  test('false when there are no providers', () => {
    expect(sufficientProviders()).toBeFalsy();
    expect(sufficientProviders([])).toBeFalsy();
  });

  test('false when only a source provider exists', () => {
    expect(sufficientProviders([{ type: 'ManageIQ::Providers::Vmware::InfraManager' }])).toBeFalsy();
  });

  test('false when only a target provider exists', () => {
    expect(sufficientProviders([{ type: 'ManageIQ::Providers::Redhat::InfraManager' }])).toBeFalsy();
    expect(sufficientProviders([{ type: 'ManageIQ::Providers::Openstack::CloudManager' }])).toBeFalsy();
    expect(
      sufficientProviders([
        { type: 'ManageIQ::Providers::Redhat::InfraManager' },
        { type: 'ManageIQ::Providers::Openstack::CloudManager' }
      ])
    ).toBeFalsy();
  });

  test('true when both a source and a target provider exist', () => {
    expect(
      sufficientProviders([
        { type: 'ManageIQ::Providers::Vmware::InfraManager' },
        { type: 'ManageIQ::Providers::Redhat::InfraManager' }
      ])
    ).toBeTruthy();
    expect(
      sufficientProviders([
        { type: 'ManageIQ::Providers::Vmware::InfraManager' },
        { type: 'ManageIQ::Providers::Openstack::CloudManager' }
      ])
    ).toBeTruthy();
    expect(
      sufficientProviders([
        { type: 'ManageIQ::Providers::Vmware::InfraManager' },
        { type: 'ManageIQ::Providers::Redhat::InfraManager' },
        { type: 'ManageIQ::Providers::Openstack::CloudManager' }
      ])
    ).toBeTruthy();
  });
});
