import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import TextFileInput from './TextFileInput';
import { FormField } from './FormField';

const requiredWithMessage = required({ msg: __('This field is required') });
const bodyIsRequired = (value = {}) => requiredWithMessage(value.body);

const TextFileField = ({ help, hideBody, ...props }) => (
  <Field component={FormField} required validate={[bodyIsRequired]} {...props}>
    {({ input: { value, onChange, onBlur } }) => (
      <TextFileInput help={help} hideBody={hideBody} value={value} onChange={onChange} onBlur={onBlur} />
    )}
  </Field>
);

TextFileField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  help: PropTypes.string,
  hideBody: PropTypes.bool,
  controlId: PropTypes.string.isRequired
};

TextFileField.defaultProps = {
  help: null,
  hideBody: false
};

export default TextFileField;
