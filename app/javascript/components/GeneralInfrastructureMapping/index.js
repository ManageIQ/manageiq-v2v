import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { renderField } from '../../common/formUtilities/renderField';
import { required } from '../../common/formUtilities/validation';

const GeneralInfrastructureMappingContainer = props => (
  <form className="form-horizontal">
    <Field
      name="name"
      label={__('Name')}
      component={renderField}
      validate={[required]}
      type="text"
    />
    <Field
      name="description"
      label={__('Description')}
      component={renderField}
      type="textarea"
    />
  </form>
);

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const GeneralInfrastructureMappingForm = reduxForm({
  form: 'generalInfrastructureMapping', // a unique identifier for this form
  destroyOnUnmount: false // preserve form data
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(GeneralInfrastructureMappingContainer);

export default connect()(GeneralInfrastructureMappingForm);
