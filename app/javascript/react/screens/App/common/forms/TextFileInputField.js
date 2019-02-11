import React from 'react';
import PropTypes from 'prop-types';
import TextFileInput from './TextFileInput';

// TODO wrap for redux-form Field usage
const TextFileInputField = props => <TextFileInput {...props} />;

TextFileInputField.propTypes = {};

export default TextFileInputField;
