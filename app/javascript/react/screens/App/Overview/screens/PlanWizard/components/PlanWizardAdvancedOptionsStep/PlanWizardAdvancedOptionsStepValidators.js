import { validateSchema } from '../../../../../../../../data/schemaHelpers';
import { playbooksSchema } from '../../../../../../../../data/models/serviceTemplateAnsiblePlaybooks';

export const validatePlaybooks = playbooks => {
  validateSchema(playbooksSchema, playbooks);
};
