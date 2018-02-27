export const formHasErrors = (formContainer, formKey) =>
  formContainer &&
  Object.prototype.hasOwnProperty.call(formContainer, formKey) &&
  !!formContainer[formKey].syncErrors;
