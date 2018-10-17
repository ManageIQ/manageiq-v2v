import { validateSchema } from '../../../../data/schemaHelpers';
import { clustersSchema } from '../../../../data/models/clusters';
import { datastoresSchema } from '../../../../data/models/datastores';
import { mappingsSchema } from '../../../../data/models/transformationMappings';
import { networksSchema } from '../../../../data/models/networks';

export const validateClusters = clusters => {
  validateSchema(clustersSchema, clusters);
};

export const validateDatastores = datastores => {
  validateSchema(datastoresSchema, datastores);
};

export const validateNetworks = networks => {
  validateSchema(networksSchema, networks);
};

export const validateMappings = mappings => {
  validateSchema(mappingsSchema, mappings);
};
