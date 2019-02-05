import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap-touchspin';

class NumberInput extends React.Component {
  componentDidMount() {
    const {
      id,
      input: { onChange },
      min
    } = this.props;
    const input = $(`#${id}`);
    input.TouchSpin({
      buttondown_class: 'btn btn-default',
      buttonup_class: 'btn btn-default',
      min
    });
    // bootstrap-touchspin's change event doesn't trigger the rendered input's onChange.
    input.on('change', event => {
      onChange(event.target.value);
    });
  }

  componentWillUnmount() {
    $(`#${this.props.id}`).off('change');
  }

  render() {
    const {
      id,
      input: { value, onChange }
    } = this.props;
    return (
      <input id={id} className="bootstrap-touchspin" value={value} onChange={event => onChange(event.target.value)} />
    );
  }
}

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
  }),
  min: PropTypes.number
};

NumberInput.defaultProps = {
  min: 0
};

NumberInput.normalizeStringToInt = str => (str && parseInt(str.replace(/\D/g, ''), 10)) || 0;

export default NumberInput;
