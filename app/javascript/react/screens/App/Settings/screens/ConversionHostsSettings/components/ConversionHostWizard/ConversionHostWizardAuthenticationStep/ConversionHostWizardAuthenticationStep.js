import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form } from 'patternfly-react';
import TextFileInput from '../../../../../../common/forms/TextFileInput';
import { stepIDs } from '../ConversionHostWizardConstants';
import { FormField } from '../../../../../../common/forms/FormField';

const ConversionHostWizardAuthenticationStep = () => (
  <Form className="form-horizontal">
    <Field
      component={FormField}
      label={__('Conversion Host SSH key')}
      labelWidth={3}
      controlWidth={8}
      name="sshKey"
      controlId="host-ssh-key-input"
      required
      validate={[]} // TODO
    >
      {({ input: { value, onChange } }) => (
        <TextFileInput
          help={__('Upload your SSH key file or paste its contents below.')}
          value={value}
          onChange={onChange}
        />
      )}
    </Field>
  </Form>
);

export default reduxForm({
  form: stepIDs.authenticationStep,
  destroyOnUnmount: false
})(ConversionHostWizardAuthenticationStep);
