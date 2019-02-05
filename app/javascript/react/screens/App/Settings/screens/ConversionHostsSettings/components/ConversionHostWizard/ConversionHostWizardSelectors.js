import { stepIDs } from './ConversionHostWizardConstants';

export const conversionHostWizardFormFilter = form =>
  Object.values(stepIDs).reduce(
    (newObject, stepID) => ({
      ...newObject,
      [stepID]: form[stepID]
    }),
    {}
  );
