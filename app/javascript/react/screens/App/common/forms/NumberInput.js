import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap-touchspin';

class NumberInput extends React.Component {
  componentDidMount() {
    const {
      id,
      input: { onChange }
    } = this.props;
    const input = $(`#${id}`);
    input.TouchSpin({
      buttondown_class: 'btn btn-default',
      buttonup_class: 'btn btn-default'
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
    return <input id={id} value={value} onChange={event => onChange(event.target.value)} />;
  }
}

NumberInput.propTypes = {
  id: PropTypes.string.isRequired,
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func
  })
};

export default NumberInput;
