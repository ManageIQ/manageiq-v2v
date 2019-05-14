import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import TextFileInput from './TextFileInput';
import { FormField } from './FormField';

const requiredWithMessage = required({ msg: __('This field is required') });
const bodyIsRequired = value => requiredWithMessage(value.body);

const TextFileField = ({ help, ...props }) => (
  <Field component={FormField} required validate={[bodyIsRequired]} {...props}>
    {({ input: { value, onChange, onBlur } }) => (
      <TextFileInput help={help} value={value} onChange={onChange} onBlur={onBlur} />
    )}
  </Field>
);

TextFileField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  controlId: PropTypes.string.isRequired
};

export default TextFileField;
