import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from 'patternfly-react';
import GeneralSettings from './screens/GeneralSettings';
import ConversionHostsSettings from './screens/ConversionHostsSettings';
import MigrationBreadcrumbBar from '../common/MigrationBreadcrumbBar';

class Settings extends React.Component {
  componentDidMount() {
    const { fetchProductFeaturesAction, fetchProductFeaturesActionUrl } = this.props;

    fetchProductFeaturesAction(fetchProductFeaturesActionUrl);
  }

  render() {
    const { match, redirectTo, productFeatures } = this.props;

    return (
      <div className="main-scroll-container">
        <MigrationBreadcrumbBar activeHref="#/settings" productFeatures={productFeatures} />
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
      </div>
    );
  }
}

Settings.propTypes = {
  match: PropTypes.object,
  redirectTo: PropTypes.func,
  fetchProductFeaturesAction: PropTypes.func,
  fetchProductFeaturesActionUrl: PropTypes.string,
  productFeatures: PropTypes.array
};

Settings.defaultProps = {
  fetchProductFeaturesActionUrl: '/api'
};

export default Settings;
