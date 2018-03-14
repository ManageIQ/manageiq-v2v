import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid } from 'patternfly-react';
import { focus } from 'redux-form';

const $ = require('jquery');
require('bootstrap-select');

export class BootstrapSelect extends React.Component {
  componentDidMount() {
    const { input, form_name, meta: { visited, dispatch } } = this.props;
    $(`#${input.name}`).selectpicker();

    $(`.${input.name}_select`).on('click', '.dropdown-toggle', e => {
      if (!visited) dispatch(focus(form_name, input.name));
    });
  }

  render = () => {
    const {
      input,
      label,
      required,
      data_live_search,
      options,
      option_key,
      option_value,
      meta: { visited, error, active }
    } = this.props;

    const formGroupProps = { key: { label }, ...this.props };

    if (visited && !active && error) formGroupProps.validationState = 'error';

    return (
      <Form.FormGroup {...formGroupProps}>
        <Grid.Col componentClass={Form.ControlLabel} sm={2}>
          {label}
          {required && ' *'}
        </Grid.Col>
        <Grid.Col sm={9}>
          <select
            id={input.name}
            data-live-search={data_live_search}
            className={`form-control ${input.name}_select`}
            {...input}
          >
            <option disabled value="">{`<${__('Choose')}>`}</option>
            {options.map(val => (
              <option value={val[option_key]} key={val[option_value]}>
                {val[option_value]}
              </option>
            ))}
          </select>
          {visited &&
            !active &&
            error && <Form.HelpBlock>{error}</Form.HelpBlock>}
        </Grid.Col>
      </Form.FormGroup>
    );
  };
}

BootstrapSelect.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  required: PropTypes.bool,
  data_live_search: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.array,
  option_key: PropTypes.string,
  option_value: PropTypes.string,
  meta: PropTypes.object,
  form_name: PropTypes.string
};
