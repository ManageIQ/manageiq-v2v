import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';
import GeneralSettings from './screens/GeneralSettings';
import ConversionHostsSettings from './screens/ConversionHostsSettings';
import MigrationBreadcrumbBar from '../common/MigrationBreadcrumbBar';

const Settings = props => {
  const { match, redirectTo } = props;

  return (
    <React.Fragment>
      <MigrationBreadcrumbBar activeHref="#/settings" />
      <div style={{ marginTop: 10 }}>
        <Tabs id="settings-tabs" activeKey={match.path} onSelect={key => redirectTo(key)} unmountOnExit>
          <Tab eventKey="/settings" title={__('Migration Throttling')}>
            <GeneralSettings />
          </Tab>
          <Tab eventKey="/settings/conversion_hosts" title={__('Conversion Hosts')}>
            <ConversionHostsSettings />
          </Tab>
        </Tabs>
      </div>
    </React.Fragment>
  );
};

Settings.propTypes = {
  match: PropTypes.object,
  redirectTo: PropTypes.func
};

export default Settings;
