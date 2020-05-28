import React from 'react';
import PropTypes from 'prop-types';
import { TypeAheadSelect } from 'patternfly-react';

// Wraps TypeAheadSelect for use as the `component` prop of a redux-form Field.
const TypeAheadSelectField = ({ input: { value, onChange }, controlId, ...props }) => (
  <TypeAheadSelect selected={value} onChange={onChange} inputProps={{ id: controlId }} {...props} />
);

TypeAheadSelectField.propTypes = {
  controlId: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.array,
    onChange: PropTypes.func
  })
};

export default TypeAheadSelectField;
