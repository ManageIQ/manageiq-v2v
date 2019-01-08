import { conversionHostsFilter } from '../MappingWizardClustersStepSelectors';
import { RHV, OPENSTACK } from '../../../MappingWizardConstants';

describe('mapping wizard clusters step selectors', () => {
  it('filters conversion hosts by type', () => {
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
          type: 'ManageIQ::Providers::Redhat::InfraManager::Host'
        }
      }
    ];
    const ospHosts = conversionHostsFilter(conversionHosts, OPENSTACK);
    expect(ospHosts).toHaveLength(2);
    const rhvHosts = conversionHostsFilter(conversionHosts, RHV);
    expect(rhvHosts).toHaveLength(1);
  });
});
