import { ospConversionHostsFilter } from '../MappingWizardClustersStepSelectors';

describe('mapping wizard clusters step selectors', () => {
  it('filters OSP conversion hosts', () => {
    const conversionHosts = [
      {
        some: 'mockData',
        resource: {
          more: 'mockData',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Vm'
        }
      },
      {
        someOther: 'mockData',
        resource: {
          evenMore: 'mockData',
          type: 'ManageIQ::Providers::Openstack::CloudManager::Vm'
        }
      },
      {
        yetAnother: 'mockData',
        resource: {
          soMuch: 'mockData',
          type: 'SomeOtherType'
        }
      }
    ];
    const filteredHosts = ospConversionHostsFilter(conversionHosts);
    expect(filteredHosts).toHaveLength(2);
  });
});
