import React from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';
class ConversionHostsSettings extends React.Component {
  componentDidMount() {
    const { fetchConversionHostsAction, fetchConversionHostsUrl } = this.props;
    fetchConversionHostsAction(fetchConversionHostsUrl);
  }

  render() {
    const { isFetchingConversionHosts, conversionHosts } = this.props;

    const emptyState = <h2>TODO: empty state here</h2>;

    const listView = <h2>TODO: list view here</h2>;

    return (
      <Spinner loading={isFetchingConversionHosts} style={{ marginTop: 15 }}>
        {conversionHosts.length < 0 ? emptyState : listView}
      </Spinner>
    );
  }
}

ConversionHostsSettings.propTypes = {
  fetchConversionHostsUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  conversionHosts: PropTypes.arrayOf(PropTypes.object)
};

ConversionHostsSettings.defaultProps = {
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource&expand=resources'
};

export default ConversionHostsSettings;
