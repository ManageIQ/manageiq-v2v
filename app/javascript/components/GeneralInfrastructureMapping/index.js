import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Form, Grid } from 'patternfly-react';

class GeneralInfrastructureMappingContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <form className="form-horizontal">
        <Field
          name="name"
          label={__('Name')}
          component={renderField}
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
  }
}

const renderField = ({
  input,
  label,
  controlId,
  type,
  meta: { pristine, touched, error },
  ...props
}) => {
  const formGroupProps = { key: { label }, controlId, ...props };

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col componentClass={Form.ControlLabel} sm={2}>
        {label}
      </Grid.Col>
      <Grid.Col sm={9}>
        <Form.FormControl
          {...input}
          type={type}
          componentClass={type === 'text' ? undefined : type}
        />
      </Grid.Col>
    </Form.FormGroup>
  );
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
const GeneralInfrastructureMappingForm = reduxForm({
  form: 'generalInfrastructureMapping', // a unique identifier for this form
  destroyOnUnmount: false // preserve form data
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(GeneralInfrastructureMappingContainer);

export default connect()(GeneralInfrastructureMappingForm);
