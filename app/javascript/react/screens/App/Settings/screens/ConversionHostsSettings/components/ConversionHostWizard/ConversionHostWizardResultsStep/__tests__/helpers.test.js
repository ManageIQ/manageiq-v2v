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

  it('constructs a POST body for a VDDK conversion host without CA certs', () => {
    const postBodies = getConfigureConversionHostPostBodies({ hostsStepValues, authStepValues: vddkAuthStepValues });
    expect(postBodies).toMatchSnapshot();
  });

  it('constructs a POST body for an SSH conversion host without CA certs', () => {
    const postBodies = getConfigureConversionHostPostBodies({ hostsStepValues, authStepValues: sshAuthStepValues });
    expect(postBodies).toMatchSnapshot();
  });

  it('constructs a POST body for a VDDK conversion host with CA certs', () => {
    const postBodies = getConfigureConversionHostPostBodies({
      hostsStepValues,
      authStepValues: {
        ...vddkAuthStepValues,
        verifyCaCerts: true,
        caCerts: { body: 'mock CA certs body' }
      }
    });
    expect(postBodies).toMatchSnapshot();
  });

  it('constructs a POST body for an SSH conversion host with CA certs', () => {
    const postBodies = getConfigureConversionHostPostBodies({
      hostsStepValues,
      authStepValues: {
        ...sshAuthStepValues,
        verifyCaCerts: true,
        caCerts: { body: 'mock CA certs body' }
      }
    });
    expect(postBodies).toMatchSnapshot();
  });

  it('does not include the CA cert property if the verify certs switch is turned off even if there is form data for it', () => {
    const postBodies = getConfigureConversionHostPostBodies({
      hostsStepValues,
      authStepValues: {
        ...vddkAuthStepValues,
        verifyCaCerts: false,
        caCerts: { body: 'mock CA certs body' }
      }
    });
    expect(postBodies[0].tls_ca_certs).toBeUndefined();
  });
});
