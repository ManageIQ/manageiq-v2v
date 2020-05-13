import { RHV, OPENSTACK } from '../../../../../../../../../../common/constants';
import { getConfigureConversionHostPostBodies } from '../helpers';
import { VDDK, SSH } from '../../ConversionHostWizardConstants';

describe('conversion host wizard results step helpers', () => {
  const hostsStepValues = {
    hosts: [{ id: '1', type: 'mock host type', name: 'Mock Host' }]
  };
  const commonAuthStepValues = {
    conversionHostSshKey: { body: 'mock conversion host SSH key body' },
    caCerts: { body: '' }
  };
  const vddkAuthStepValues = {
    ...commonAuthStepValues,
    transformationMethod: VDDK,
    vddkLibraryPath: 'mock VDDK path'
  };
  const sshAuthStepValues = {
    ...commonAuthStepValues,
    transformationMethod: SSH,
    vmwareSshKey: { body: 'mock vmware SSH key body' }
  };

  describe('for RHV hosts', () => {
    const locationStepValues = { providerType: RHV };

    it('constructs a POST body for a VDDK conversion host', () => {
      const postBodies = getConfigureConversionHostPostBodies(locationStepValues, hostsStepValues, vddkAuthStepValues);
      expect(postBodies).toMatchSnapshot();
    });

    it('constructs a POST body for an SSH conversion host', () => {
      const postBodies = getConfigureConversionHostPostBodies(locationStepValues, hostsStepValues, sshAuthStepValues);
      expect(postBodies).toMatchSnapshot();
    });
  });

  describe('for OSP hosts', () => {
    const locationStepValues = { providerType: OPENSTACK };

    it('constructs a POST body for a VDDK conversion host without CA certs', () => {
      const postBodies = getConfigureConversionHostPostBodies(locationStepValues, hostsStepValues, {
        ...vddkAuthStepValues,
        openstackUser: 'cloud-user'
      });
      expect(postBodies).toMatchSnapshot();
    });

    it('constructs a POST body for an SSH conversion host without CA certs', () => {
      const postBodies = getConfigureConversionHostPostBodies(locationStepValues, hostsStepValues, {
        ...sshAuthStepValues,
        openstackUser: 'cloud-user'
      });
      expect(postBodies).toMatchSnapshot();
    });

    it('constructs a POST body for an SSH conversion host with CA certs', () => {
      const postBodies = getConfigureConversionHostPostBodies(locationStepValues, hostsStepValues, {
        ...sshAuthStepValues,
        openstackUser: 'cloud-user',
        caCerts: { body: 'mock CA certs body' }
      });
      expect(postBodies).toMatchSnapshot();
    });
  });
});
