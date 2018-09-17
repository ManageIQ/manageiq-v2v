import React from 'react';
import PropTypes from 'prop-types';

class Settings extends React.Component {
  componentDidMount() {
    const { fetchSettingsAction } = this.props;
    fetchSettingsAction('TODO: url here'); // TODO
  }
  render() {
    return <h1>Hello, World!</h1>;
  }
}

Settings.propTypes = {
  fetchSettingsAction: PropTypes.func
};

export default Settings;