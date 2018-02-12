import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';

export const renderField = ({
  input,
  label,
  controlId,
  type,
  meta: { pristine, touched, error },
  ...props
}) => {
  const formGroupProps = { key: { label }, controlId, ...props };

  if (error) formGroupProps.validationState = 'error';

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
        {(pristine || touched) &&
          error && <Form.HelpBlock>{error}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};

renderField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.string,
  controlId: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object
};
