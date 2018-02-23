import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';

export const FormField = ({
  input,
  label,
  required,
  controlId,
  type,
  options,
  optionKey,
  optionValue,
  meta: { touched, error },
  ...props
}) => {
  const formGroupProps = { key: { label }, controlId, ...props };

  if (touched && error) formGroupProps.validationState = 'error';

  const renderField = () => {
    let field;
    switch (type) {
      case 'textarea':
        field = (
          <Form.FormControl {...input} type={type} componentClass="textarea" />
        );
        break;
      case 'text':
        field = <Form.FormControl {...input} type={type} />;
        break;
      case 'select':
        field = (
          <select className="form-control" {...input}>
            <option disabled value="">{`<${__('Choose')}>`}</option>
            {options.map(val => (
              <option value={val[optionKey]} key={val[optionValue]}>
                {val[optionValue]}
              </option>
            ))}
          </select>
        );
        break;
      default:
    }
    return field;
  };

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col componentClass={Form.ControlLabel} sm={2}>
        {label}
        {required && ' *'}
      </Grid.Col>
      <Grid.Col sm={9}>
        {renderField()}
        {touched && error && <Form.HelpBlock>{error}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  required: PropTypes.bool,
  controlId: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  optionKey: PropTypes.string,
  optionValue: PropTypes.string,
  meta: PropTypes.object
};
