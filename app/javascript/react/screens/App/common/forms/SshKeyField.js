import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import TextFileInput from './TextFileInput';
import { FormField } from './FormField';

const requiredWithMessage = required({ msg: __('This field is required') });
const bodyIsRequired = value => requiredWithMessage(value.body);

const SshKeyField = props => (
  <Field component={FormField} required validate={[bodyIsRequired]} {...props}>
    {({ input: { value, onChange, onBlur } }) => (
      <TextFileInput
        help={__('Upload your SSH key file or paste its contents below.')}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    )}
  </Field>
);

SshKeyField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  controlId: PropTypes.string.isRequired
};

export default SshKeyField;
