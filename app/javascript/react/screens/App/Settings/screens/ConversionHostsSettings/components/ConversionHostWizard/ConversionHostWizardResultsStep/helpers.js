import { VDDK } from '../ConversionHostWizardConstants';

export const getConfigureConversionHostPostBodies = ({ hostsStepValues, authStepValues }) =>
  hostsStepValues.hosts.map(host => {
    const vmwareAuthProperties =
      authStepValues.transformationMethod === VDDK
        ? { vmware_vddk_package_url: authStepValues.vddkLibraryPath }
        : { vmware_ssh_private_key: authStepValues.vmwareSshKey.body };
    return {
      name: host.name,
      resource_type: host.type,
      resource_id: host.id,
      conversion_host_ssh_private_key: authStepValues.conversionHostSshKey.body,
      auth_user: 'cloud-user',
      ...(authStepValues.verifyCaCerts && authStepValues.caCerts.body && { tls_ca_certs: authStepValues.caCerts.body }),
      ...vmwareAuthProperties
    };
  });
