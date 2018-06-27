import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormGroup, Grid, ControlLabel } from 'patternfly-react';
import { focus } from 'redux-form';

export class BootstrapSelect extends React.Component {
  componentDidMount() {
    const {
      input,
      form_name,
      meta: { visited, dispatch },
      onSelect,
      pre_selected_value
    } = this.props;

    $(`#${input.name}`).selectpicker('val', input.value || pre_selected_value);

    $(`.${input.name}_select`).on('click', '.dropdown-toggle', e => {
      if (!visited) dispatch(focus(form_name, input.name));
    });
    if (onSelect)
      $(`#${input.name}`).on('changed.bs.select', e => {
        onSelect(e.target.value);
      });
  }

  renderFormGroup = (labelWidth, controlWidth) => {
    const {
      input,
      label,
      required,
      data_live_search,
      options,
      option_key,
      option_value,
      choose_text,
      meta: { visited, error, active }
    } = this.props;
    const formGroupProps = { key: { label }, ...this.props };

    if (visited && !active && error) formGroupProps.validationState = 'error';

    return (
      <FormGroup {...formGroupProps}>
        <Grid.Col componentClass={ControlLabel} sm={labelWidth}>
          {label}
          {required && ' *'}
        </Grid.Col>
        <Grid.Col sm={controlWidth}>
          <select
            id={input.name}
            data-live-search={data_live_search}
            className={`form-control ${input.name}_select`}
            {...input}
          >
            <option disabled value="">
              {choose_text || `<${__('Choose')}>`}
            </option>
            {options.map(val => (
              <option value={val[option_key]} key={val[option_value]}>
                {val[option_value]}
              </option>
            ))}
          </select>
          {visited && !active && error && <Form.HelpBlock>{error}</Form.HelpBlock>}
        </Grid.Col>
      </FormGroup>
    );
  };

  render = () => {
    const { render_within_form } = this.props;

    if (render_within_form) {
      return (
        <div>
          <Form horizontal>{this.renderFormGroup(6, 4)}</Form>
        </div>
      );
    }
    return this.renderFormGroup(2, 9);
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
  form_name: PropTypes.string,
  onSelect: PropTypes.func,
  pre_selected_value: PropTypes.string,
  choose_text: PropTypes.string,
  render_within_form: PropTypes.string
};
