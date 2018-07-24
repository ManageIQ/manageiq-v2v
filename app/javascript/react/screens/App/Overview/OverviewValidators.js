import { validateSchema } from '../../../../data/schemaHelpers';
import { clustersSchema } from '../../../../data/models/clusters';
import { datastoresSchema } from '../../../../data/models/datastores';
import { networksSchema } from '../../../../data/models/networks';
import { plansSchema } from '../../../../data/models/plans';
import { providersSchema } from '../../../../data/models/provider';
import { requestsSchema } from '../../../../data/models/requests';
import { mappingsSchema } from '../../../../data/models/transformationMappings';
import { serviceTemplatePlaybookSchema } from '../../../../data/models/playbooks';

export const validateOverviewClusters = clusters => {
  validateSchema(clustersSchema, clusters);
};

export const validateOverviewDatastores = datastores => {
  validateSchema(datastoresSchema, datastores);
};

export const validateOverviewNetworks = networks => {
  validateSchema(networksSchema, networks);
};

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
