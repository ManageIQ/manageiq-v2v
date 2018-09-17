import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';

class Settings extends React.Component {
  componentDidMount() {
    const { fetchSettingsAction } = this.props;
    fetchSettingsAction('TODO: url here'); // TODO
  }
  render() {
    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
        <Breadcrumb.Item href="#/">{__('Migration')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{__('Migration Settings')}</Breadcrumb.Item>
      </Toolbar>
    );

    const settingsContent = (
      <div>
        <h2>{__('Resource Utilization Limits for Migrations')}</h2>

      </div>
    );

    return (
      <React.Fragment>
        {toolbarContent}
        {settingsContent}
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  fetchSettingsAction: PropTypes.func
};

export default Settings;