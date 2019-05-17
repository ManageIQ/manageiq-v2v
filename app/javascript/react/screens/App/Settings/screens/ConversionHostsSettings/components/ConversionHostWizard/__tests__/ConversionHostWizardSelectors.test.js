import { conversionHostWizardFormFilter } from '../ConversionHostWizardSelectors';

describe('conversion host wizard selectors', () => {
  it('selects form objects matching wizard steps', () => {
    const form = {
      someForm: { mock: 'stuff' },
      someOtherForm: { mock: 'stuff' },
      conversionHostWizardLocationStep: { mock: 'location stuff' },
      conversionHostWizardHostsStep: { mock: 'hosts stuff' },
      conversionHostWizardAuthenticationStep: { mock: 'auth stuff' },
      conversionHostWizardResultsStep: { mock: 'results stuff' }
    };
    expect(conversionHostWizardFormFilter(form)).toEqual({
      conversionHostWizardLocationStep: { mock: 'location stuff' },
      conversionHostWizardHostsStep: { mock: 'hosts stuff' },
      conversionHostWizardAuthenticationStep: { mock: 'auth stuff' },
      conversionHostWizardResultsStep: { mock: 'results stuff' }
    });
  });

  it('does not crash if some of the forms are missing', () => {
    const form = {
      someForm: { mock: 'stuff' },
      someOtherForm: { mock: 'stuff' },
      conversionHostWizardLocationStep: { mock: 'location stuff' }
    };
    expect(conversionHostWizardFormFilter(form)).toEqual({
      conversionHostWizardLocationStep: { mock: 'location stuff' }
    });
  });
});
