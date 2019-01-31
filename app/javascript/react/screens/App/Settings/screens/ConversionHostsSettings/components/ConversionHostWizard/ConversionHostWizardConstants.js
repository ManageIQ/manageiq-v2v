import { RHV, OPENSTACK } from '../../../../../../../../common/constants';

export const stepIDs = {
  locationStep: 'conversionHostWizardLocationStep',
  hostsStep: 'conversionHostWizardHostsStep',
  authenticationStep: 'conversionHostWizardAuthenticationStep',
  resultsStep: 'conversionHostWizardResultsStep'
};

export const PROVIDER_TYPES = {
  [RHV]: 'ManageIQ::Providers::Redhat::InfraManager',
  [OPENSTACK]: 'ManageIQ::Providers::Openstack::CloudManager'
};
