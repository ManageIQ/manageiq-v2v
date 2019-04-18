import React from 'react';
import PropTypes from 'prop-types';
import { Form, FormControl, HelpBlock, InputGroup } from 'patternfly-react';

class TextInputWithCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputEnabled: props.inputEnabledFunction(props.input.value)
    };
  }

  render() {
    const { id, label, input, postfix, initialUncheckedValue, meta, vertical } = this.props;

    const onCheckboxChange = event => {
      if (event.target.checked) {
        if (meta.initial === initialUncheckedValue) {
          input.onChange(0);
        } else {
          input.onChange(meta.initial);
        }
      } else {
        input.onChange(initialUncheckedValue);
      }
      this.setState({ inputEnabled: event.target.checked });
    };

    return (
      <Form.FormGroup validationState={meta.error ? 'error' : undefined}>
        <Form.ControlLabel className={vertical ? '' : 'col-md-5'}>
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
        <div className={vertical ? '' : 'col-md-2'} style={{ width: vertical ? '150px' : 'auto' }}>
          <InputGroup>
            <FormControl type="text" name={id} id={id} readOnly={!this.state.inputEnabled} {...input} />
            <InputGroup.Addon>{postfix}</InputGroup.Addon>
          </InputGroup>
          {this.state.inputEnabled && meta.error && <HelpBlock>{meta.error}</HelpBlock>}
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
  inputEnabledFunction: PropTypes.func.isRequired,
  initialUncheckedValue: PropTypes.string,
  meta: PropTypes.object,
  vertical: PropTypes.bool
};

export default TextInputWithCheckbox;
