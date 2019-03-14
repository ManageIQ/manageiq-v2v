import { OPENSTACK } from '../../../../../../../../../common/constants';
import { VDDK } from '../ConversionHostWizardConstants';

export const getConfigureConversionHostPostBodies = (locationStepValues, hostsStepValues, authStepValues) =>
  hostsStepValues.hosts.map(host => {
    const openstackSpecificProperties =
      locationStepValues.providerType === OPENSTACK ? { auth_user: authStepValues.openstackUser } : {};
    const vmwareAuthProperties =
      authStepValues.transformationMethod === VDDK
        ? { vmware_vddk_package_url: authStepValues.vddkLibraryPath }
        : { vmware_ssh_private_key: authStepValues.vmwareSshKey.body };
    return {
      name: host.name,
      resource_type: host.type,
      resource_id: host.id,
      ssh_key: authStepValues.conversionHostSshKey.body,
      ...openstackSpecificProperties,
      ...vmwareAuthProperties
    };
  });
