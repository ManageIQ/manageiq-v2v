import { OPENSTACK } from '../../../../../../../../../common/constants';
import { VDDK } from '../ConversionHostWizardConstants';

export const getConfigureConversionHostPostBodies = (locationStepValues, hostsStepValues, authStepValues) =>
  hostsStepValues.hosts.map(host => {
    const openstackSpecificProperties =
      locationStepValues.providerType === OPENSTACK ? { auth_user: authStepValues.openstackUser } : {};
    const vddkSpecificProperties =
      authStepValues.transformationMethod === VDDK
        ? { param_v2v_vddk_package_url: authStepValues.vddkLibraryPath }
        : {};
    return {
      name: host.name,
      resource_type: host.type,
      resource_id: host.id,
      ...openstackSpecificProperties,
      ...vddkSpecificProperties
    };
    // TODO: handle authStepValues.conversionHostSshKey
    // TODO: handle authStepValues.transformationMethod (explicitly?)
    // TODO: handle authStepValues.vmwareSshKey (if transformationMethod === SSH)
  });
