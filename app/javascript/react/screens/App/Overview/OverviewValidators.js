import { validateSchema } from '../../../../data/schemaHelpers';
import { plansSchema } from '../../../../data/models/plans';
import { providersSchema } from '../../../../data/models/provider';
import { requestsSchema } from '../../../../data/models/requests';
import { mappingsSchema } from '../../../../data/models/transformationMappings';
import { serviceTemplatePlaybookSchema } from '../../../../data/models/playbooks';

export const validateOverviewPlans = plans => {
  validateSchema(plansSchema, plans);
};

export const validateOverviewProviders = providers => {
  validateSchema(providersSchema, providers);
};

export const validateOverviewRequests = requests => {
  validateSchema(requestsSchema, requests);
};

export const validateOverviewMappings = mappings => {
  validateSchema(mappingsSchema, mappings);
};

export const validateServiceTemplatePlaybooks = playbooks => {
  validateSchema(serviceTemplatePlaybookSchema, playbooks);
};
