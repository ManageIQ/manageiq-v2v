export const schemaValidationEnabled = true;

export const logSchemaError = err => {
  console.error(err.name, err.errors); // eslint-disable-line no-console
};

export const validateSchema = (schema, models) => {
  if (schemaValidationEnabled) {
    schema.validate(models, { abortEarly: false, strict: true }).catch(err => {
      logSchemaError(err);
    });
  }
};
