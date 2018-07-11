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
  help,
  maxLength,
  maxLengthWarning,
  ...props
}) => {
  const warning = maxLength && input.value.length >= maxLength && maxLengthWarning;
  const validationState = (touched && error && 'error') || (warning && 'warning') || null;
  const formGroupProps = {
    key: { label },
    controlId,
    validationState,
    ...props
  };

  const onChangeWithMaxLength = event => {
    const newValue = event.target.value;
    if (maxLength && newValue.length > maxLength) return; // Don't even tell redux-form about values over the max.
    input.onChange(event);
  };

  const renderField = () => {
    let field;
    switch (type) {
      case 'textarea':
        field = <Form.FormControl {...input} onChange={onChangeWithMaxLength} type={type} componentClass="textarea" />;
        break;
      case 'text':
        field = <Form.FormControl {...input} onChange={onChangeWithMaxLength} type={type} />;
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
              <Field name={input.name} component="input" type="radio" value={val.id} />
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
      <Grid.Col componentClass={Form.ControlLabel} sm={Number.parseInt(labelWidth, 10) || 2}>
        {label}
        {required && ' *'}
      </Grid.Col>
      <Grid.Col sm={9} id={input.name}>
        {renderField()}
        {(help || error || warning) && (
          <Form.HelpBlock>
            {(touched && error) || warning || help // If we have any of these, render one of them, in priority order.
            }
          </Form.HelpBlock>
        )}
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
  meta: PropTypes.object,
  help: PropTypes.string,
  maxLength: PropTypes.number,
  maxLengthWarning: PropTypes.string
};
