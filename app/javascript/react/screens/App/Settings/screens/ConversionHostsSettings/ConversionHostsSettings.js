import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'patternfly-react';
import ConversionHostsEmptyState from './components/ConversionHostsEmptyState';
import ConversionHostsList from './components/ConversionHostsList';
import ConversionHostWizard from './components/ConversionHostWizard';

class ConversionHostsSettings extends React.Component {
  componentDidMount() {
    const { fetchConversionHostsAction, fetchConversionHostsUrl } = this.props;
    fetchConversionHostsAction(fetchConversionHostsUrl);
  }

  render() {
    const {
      isFetchingConversionHosts,
      conversionHosts,
      showConversionHostWizardAction,
      conversionHostWizardMounted
    } = this.props;

    return (
      <Spinner loading={isFetchingConversionHosts} style={{ marginTop: 15 }}>
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
      </Spinner>
    );
  }
}

ConversionHostsSettings.propTypes = {
  fetchConversionHostsUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  isFetchingConversionHosts: PropTypes.bool,
  conversionHosts: PropTypes.arrayOf(PropTypes.object),
  showConversionHostWizardAction: PropTypes.func,
  conversionHostWizardMounted: PropTypes.bool
};

ConversionHostsSettings.defaultProps = {
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource&expand=resources'
};

export default ConversionHostsSettings;
