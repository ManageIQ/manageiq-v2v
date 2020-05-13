import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, OverlayTrigger, Popover, Button, Icon } from 'patternfly-react';
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
  controlWidth,
  meta: { touched, error },
  help,
  maxLength,
  maxLengthWarning,
  info,
  children,
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
    if (children) return children({ input });

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
            <label>
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

  const renderInfoPopover = () => {
    if (!info) return null;
    return (
      <OverlayTrigger
        rootClose
        trigger="click"
        placement="top"
        overlay={
          <Popover id={`info-popover-${input.name}`} style={{ width: 400 }}>
            {info}
          </Popover>
        }
      >
        <Button bsStyle="link">
          <Icon type="pf" name="info" />
        </Button>
      </OverlayTrigger>
    );
  };

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col componentClass={Form.ControlLabel} sm={Number.parseInt(labelWidth, 10) || 2}>
        {required && <span className="required-asterisk">* </span>}
        {label}
        {renderInfoPopover()}
      </Grid.Col>
      <Grid.Col sm={Number.parseInt(controlWidth, 10) || 9} id={input.name}>
        {renderField()}
        {(help || (touched && error) || warning) && (
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
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  controlWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  meta: PropTypes.object,
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  maxLength: PropTypes.number,
  maxLengthWarning: PropTypes.string,
  info: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.func
};
