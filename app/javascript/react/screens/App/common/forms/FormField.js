import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import { Field } from 'redux-form';

export const FormField = ({
  input,
  label,
  required,
  controlId,
  type,
  options,
  optionKey,
  optionValue,
  labelWidth,
  meta: { touched, error },
  ...props
}) => {
  const formGroupProps = { key: { label }, controlId, ...props };

  const addBreak = <br />;

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
      case 'radio':
        field = options.map(val => (
          <div key={val.id}>
            <label htmlFor={input.name}>
              <Field
                name={input.name}
                component="input"
                type="radio"
                value={val.id}
              />
              {` ${val.name}`}
            </label>
            <br />
          </div>
        ));
        break;
      default:
    }
    return field;
  };

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col
        componentClass={Form.ControlLabel}
        sm={Number.parseInt(labelWidth, 10) || 2}
      >
        {label}
        {required && ' *'}
      </Grid.Col>
      <Grid.Col sm={9}>
        {type === 'radio' && addBreak}
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
  labelWidth: PropTypes.string,
  meta: PropTypes.object
};
