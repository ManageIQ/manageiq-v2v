import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'patternfly-react';

class TextInputWithCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEnabled: props.inputEnabledFunction(props.input.value)
    };
  }

  render() {
    const {
      id,
      label,
      input: { value, onChange },
      postfix
    } = this.props;

    const onCheckboxChange = event => this.setState({ inputEnabled: event.target.checked });

    return (
      <Form.FormGroup>
        <Form.ControlLabel className="col-md-4">
          <div className="checkbox-inline pull-left">
            <label>
              <input
                type="checkbox"
                name={`${id}_checkbox`}
                id={`${id}_checkbox`}
                defaultChecked={this.state.inputEnabled}
                onChange={event => onCheckboxChange(event)}
              />
              {label}
            </label>
          </div>
        </Form.ControlLabel>
        <div className="col-md-2">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              name={id}
              id={id}
              defaultValue={value}
              readOnly={!this.state.inputEnabled}
              onChange={event => onChange(event.target.value)}
            />
            <div className="input-group-addon postfix-label">{postfix}</div>
          </div>
        </div>
      </Form.FormGroup>
    );
  }
}

TextInputWithCheckbox.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
  }),
  label: PropTypes.string.isRequired,
  postfix: PropTypes.string,
  inputEnabledFunction: PropTypes.func.isRequired
};

TextInputWithCheckbox.normalizeStringToInt = str => (str && parseInt(str.replace(/\D/g, ''), 10)) || 0;

export default TextInputWithCheckbox;
