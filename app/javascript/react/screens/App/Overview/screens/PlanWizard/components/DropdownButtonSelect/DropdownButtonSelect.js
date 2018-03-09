import React from 'react';
import PropTypes from 'prop-types';
import { focus } from 'redux-form';
import {
  DropdownButton,
  Grid,
  Form,
  MenuItem,
  InputGroup,
  FormControl
} from 'patternfly-react';

const DropdownButtonSelect = ({
  input,
  label,
  controlId,
  required,
  options,
  optionKey,
  optionValue,
  selectedValue,
  selectText,
  formName,
  meta: { visited, error, active, dispatch },
  ...props
}) => {
  const formGroupProps = { key: { label }, controlId, ...props };

  if (visited && !active && error) formGroupProps.validationState = 'error';

  if (selectedValue) input.onChange(selectedValue);

  const onSelectItem = eventKey => {
    input.onChange(eventKey);
  };

  const handleClick = event => {
    if (!visited) dispatch(focus(formName, controlId));
  };

  const renderDropdownButtonSelect = dropdownButtonSelectClass => {
    return (
      <div className={dropdownButtonSelectClass}>
        <InputGroup>
          <FormControl.Static>
            {input.value !== '' ? (
              options.find(val => val[optionKey] === input.value).name
            ) : (
              <span className="placeholder-text">{selectText}</span>
            )}
          </FormControl.Static>
          <DropdownButton
            className="dropdownbutton"
            id={controlId}
            title=""
            componentClass={InputGroup.Button}
            pullRight
            onClick={handleClick}
          >
            {options.map(val => (
              <MenuItem
                onSelect={onSelectItem}
                key={val[optionKey]}
                eventKey={val[optionKey]}
              >
                {val[optionValue]}
              </MenuItem>
            ))}
          </DropdownButton>
        </InputGroup>
      </div>
    );
  };

  const dropdownButtonSelectClass =
    visited && !active && error
      ? 'dropdown-button-select-error'
      : 'dropdown-button-select';

  return (
    <Form.FormGroup {...formGroupProps}>
      <Grid.Col componentClass={Form.ControlLabel} sm={2}>
        {label}
        {required && ' *'}
      </Grid.Col>
      <Grid.Col sm={9}>
        {renderDropdownButtonSelect(dropdownButtonSelectClass)}
        {visited &&
          !active &&
          error && <Form.HelpBlock>{error}</Form.HelpBlock>}
      </Grid.Col>
    </Form.FormGroup>
  );
};

DropdownButtonSelect.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  controlId: PropTypes.string,
  required: PropTypes.bool,
  options: PropTypes.array,
  optionKey: PropTypes.string,
  optionValue: PropTypes.string,
  selectedValue: PropTypes.string,
  selectText: PropTypes.string,
  formName: PropTypes.string,
  meta: PropTypes.object
};

export default DropdownButtonSelect;
