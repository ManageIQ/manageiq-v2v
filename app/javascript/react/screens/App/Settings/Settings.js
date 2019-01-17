import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb, Tabs } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import GeneralSettings from './GeneralSettings';
import ConversionHostsSettings from './ConversionHostsSettings';

const Settings = props => {
  const {
    match,
    redirectTo,
    fetchServersAction,
    fetchSettingsAction,
    patchSettingsAction,
    isFetchingServers,
    isFetchingSettings,
    isSavingSettings,
    servers,
    savedSettings,
    settingsForm
  } = props;

  const toolbarContent = (
    <Toolbar>
      <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
      <Breadcrumb.Item href="#/plans">{__('Migration')}</Breadcrumb.Item>
      <Breadcrumb.Item active>{__('Migration Settings')}</Breadcrumb.Item>
    </Toolbar>
  );

  const generalSettings = (
    <GeneralSettings
      fetchServersAction={fetchServersAction}
      fetchSettingsAction={fetchSettingsAction}
      patchSettingsAction={patchSettingsAction}
      isFetchingServers={isFetchingServers}
      isFetchingSettings={isFetchingSettings}
      isSavingSettings={isSavingSettings}
      servers={servers}
      savedSettings={savedSettings}
      settingsForm={settingsForm}
      initialValues={savedSettings}
      enableReinitialize
      destroyOnUnmount={false}
    />
  );

  const tabs = (
    <div style={{ marginTop: 10 }}>
      <Tabs id="settings-tabs" activeKey={match.path} onSelect={key => redirectTo(key)}>
        <Tabs.Tab eventKey="/settings" title={__('Concurrent Migrations')}>
          {generalSettings}
        </Tabs.Tab>
        <Tabs.Tab eventKey="/settings/conversion_hosts" title={__('Conversion Hosts')}>
          <ConversionHostsSettings />
        </Tabs.Tab>
      </Tabs>
    </div>
  );

  // TODO remove this when we are ready to release ConversionHostsSettings
  const hideConversionHostSettings = true;

  return (
    <React.Fragment>
      {toolbarContent}
      {hideConversionHostSettings ? (
        <React.Fragment>
          <h2>{__('Concurrent Migrations')}</h2>
          {generalSettings}
        </React.Fragment>
      ) : (
        tabs
      )}
    </React.Fragment>
  );
};

Settings.propTypes = {
  match: PropTypes.object,
  redirectTo: PropTypes.func,
  fetchServersAction: PropTypes.func,
  fetchSettingsAction: PropTypes.func,
  patchSettingsAction: PropTypes.func,
  isFetchingServers: PropTypes.bool,
  isFetchingSettings: PropTypes.bool,
  isSavingSettings: PropTypes.bool,
  servers: PropTypes.array,
  savedSettings: PropTypes.object,
  settingsForm: PropTypes.object
};

export default Settings;
