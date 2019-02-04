import { validateSchema } from '../../../data/schemaHelpers';
import { providersSchema } from '../../../data/models/provider';

export const validateProviders = providers => {
  validateSchema(providersSchema, providers);
};
