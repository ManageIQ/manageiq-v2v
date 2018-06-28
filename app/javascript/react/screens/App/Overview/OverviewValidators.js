import { array, string, object } from 'yup';
import { logSchemaError } from '../../../../common/schemaHelpers';

const providersSchema = array()
  .of(
    object().shape({
      href: string().required(),
      type: string().required(),
      id: string().required()
    })
  )
  .nullable();

export const validateProviders = providers => {
  providersSchema
    .validate(providers, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const clustersSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      ems_id: string().required(),
      uid_ems: string().required(),
      ext_management_system: object()
        .shape({
          emstype: string().required(),
          name: string().required()
        })
        .required(),
      v_parent_datacenter: string().required()
    })
  )
  .nullable();

export const validateClusters = clusters => {
  clustersSchema
    .validate(clusters, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const networksSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      switch_id: string().required(),
      name: string().required(),
      uid_ems: string().required()
    })
  )
  .nullable();

export const validateNetworks = networks => {
  networksSchema
    .validate(networks, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const datastoresSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required()
    })
  )
  .nullable();

export const validateDatastores = datastores => {
  datastoresSchema
    .validate(datastores, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const mappingsSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      name: string().required(),
      created_at: string().required(),
      service_templates: array()
        .of(
          object().shape({
            id: string().required(),
            name: string().required()
          })
        )
        .nullable(),
      transformation_mapping_items: array()
        .of(
          object().shape({
            id: string().required(),
            source_id: string().required(),
            source_type: string().required(),
            destination_id: string().required(),
            destination_type: string().required(),
            transformation_mapping_id: string().required()
          })
        )
        .required()
    })
  )
  .nullable();

export const validateTransformationMappings = mappings => {
  mappingsSchema
    .validate(mappings, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const plansSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      name: string().required(),
      description: string().nullable(),
      options: object()
        .shape({
          config_info: object().shape({
            transformation_mapping_id: string().required(),
            vm_ids: array()
              .of(string())
              .required()
          })
        })
        .required(),
      created_at: string().required(),
      miq_requests: array()
        .of(
          object().shape({
            href: string().required(),
            id: string().required(),
            description: string().required(),
            created_on: string().required(),
            updated_on: string().nullable(),
            fulfilled_on: string().nullable(),
            request_state: string().required(),
            status: string().required(),
            options: object()
              .shape({
                src_id: string(),
                delivered_on: string().nullable()
              })
              .required()
          })
        )
        .nullable()
    })
  )
  .nullable();

export const validatePlans = plans => {
  plansSchema
    .validate(plans, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};

const requestsSchema = array()
  .of(
    object().shape({
      href: string().required(),
      id: string().required(),
      description: string().nullable(),
      approval_state: string().nullable(),
      created_on: string().required(),
      updated_on: string().nullable(),
      fulfilled_on: string().nullable(),
      request_state: string().nullable(),
      status: string(),
      options: object()
        .shape({
          delivered_on: string()
        })
        .required(),
      miq_request_tasks: array()
        .of(
          object().shape({
            href: string().required(),
            id: string().required(),
            description: string().required(),
            state: string().required(),
            options: object()
              .shape({
                src_id: string(),
                delivered_on: string().nullable(),
                transformation_host_name: string().nullable()
              })
              .required(),
            created_on: string().required(),
            updated_on: string().nullable(),
            message: string().required(),
            status: string().required()
          })
        )
        .nullable()
    })
  )
  .nullable();

export const validateRequests = requests => {
  requestsSchema
    .validate(requests, { abortEarly: false, strict: true })
    .catch(err => {
      logSchemaError(err);
    });
};
