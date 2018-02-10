import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

class GeneralInfrastructureMappingContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-horizontal">
        <Field name="name" label={__('Name')} component="input" type="text" />
        <Field
          name="description"
          label={__('Description')}
          component="input"
          type="textarea"
        />
      </form>
    );
  }
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const GeneralInfrastructureMappingForm = reduxForm({
  form: 'generalInfrastructureMapping', // a unique identifier for this form
  destroyOnUnmount: false // preserve form data
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(GeneralInfrastructureMappingContainer);

export default connect()(GeneralInfrastructureMappingForm);
