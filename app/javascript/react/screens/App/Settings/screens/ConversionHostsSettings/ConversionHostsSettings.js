import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import ConversionHostsEmptyState from './components/ConversionHostsEmptyState';
import ConversionHostsList from './components/ConversionHostsList';
import ConversionHostWizard from './components/ConversionHostWizard';

class ConversionHostsSettings extends React.Component {
  componentDidMount() {
    const { fetchProvidersAction, fetchProvidersUrl, fetchConversionHostsAction, fetchConversionHostsUrl } = this.props;
    fetchProvidersAction(fetchProvidersUrl);
    fetchConversionHostsAction(fetchConversionHostsUrl);
  }

  render() {
    const {
      isFetchingProviders,
      hasSufficientProviders,
      isFetchingConversionHosts,
      conversionHosts,
      showConversionHostWizardAction,
      conversionHostWizardMounted
    } = this.props;

    return (
      <Spinner loading={isFetchingConversionHosts || isFetchingProviders} style={{ marginTop: 15 }}>
        {!hasSufficientProviders ? (
          <ShowWizardEmptyState
            description={
              __('There are no providers available from which to configure a conversion host. You must configure a target provider before configuring conversion hosts.') // prettier-ignore
            }
            buttonText={__('Configure Providers')}
            buttonHref="/ems_infra/show_list"
            className="full-page-empty"
          />
        ) : (
          <React.Fragment>
            <div className="heading-with-link-container">
              <div className="pull-right">
                <a
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    showConversionHostWizardAction();
                  }}
                >
                  <Icon type="pf" name="add-circle-o" />
                  &nbsp;
                  {__('Configure Conversion Host')}
                </a>
              </div>
            </div>
            {conversionHosts.length === 0 ? (
              <ConversionHostsEmptyState showConversionHostWizardAction={showConversionHostWizardAction} />
            ) : (
              <ConversionHostsList conversionHosts={conversionHosts} />
            )}
            {conversionHostWizardMounted && <ConversionHostWizard />}
          </React.Fragment>
        )}
      </Spinner>
    );
  }
}

ConversionHostsSettings.propTypes = {
  fetchProvidersUrl: PropTypes.string,
  fetchProvidersAction: PropTypes.func,
  isFetchingProviders: PropTypes.bool,
  hasSufficientProviders: PropTypes.bool,
  fetchConversionHostsUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  isFetchingConversionHosts: PropTypes.bool,
  conversionHosts: PropTypes.arrayOf(PropTypes.object),
  showConversionHostWizardAction: PropTypes.func,
  conversionHostWizardMounted: PropTypes.bool
};

ConversionHostsSettings.defaultProps = {
  fetchProvidersUrl: '/api/providers?expand=resources',
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource&expand=resources'
};

export default ConversionHostsSettings;
