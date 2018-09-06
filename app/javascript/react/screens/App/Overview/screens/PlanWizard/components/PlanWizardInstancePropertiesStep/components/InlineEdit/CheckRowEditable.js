import React from 'react';
import PropTypes from 'prop-types';

class CheckRowEditable extends React.Component {
  componentWillMount() {
    const { input } = this.props;
    input.onChange(true);
  }

  componentWillUnmount() {
    const { input } = this.props;
    input.onChange(false);
  }

  render = () => null;
}

CheckRowEditable.propTypes = {
  input: PropTypes.object
};

export default CheckRowEditable;
