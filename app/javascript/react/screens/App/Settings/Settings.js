import React from 'react';
import { Breadcrumb } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import GeneralSettings from './GeneralSettings';

const Settings = props => {
  const {
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

  return (
    <React.Fragment>
      {toolbarContent}
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
    </React.Fragment>
  );
};

export default Settings;