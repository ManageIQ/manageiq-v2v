import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'patternfly-react';
import ShowWizardEmptyState from '../../../common/ShowWizardEmptyState/ShowWizardEmptyState';
import ConversionHostsEmptyState from './components/ConversionHostsEmptyState';
import ConversionHostsList from './components/ConversionHostsList';
import ConversionHostWizard from './components/ConversionHostWizard';
import { FETCH_V2V_PROVIDERS_URL } from '../../../../../../redux/common/providers/providersConstants';

class ConversionHostsSettings extends React.Component {
  pollingInterval = null;
  state = { hasMadeInitialFetch: false };

  componentDidMount() {
    const { fetchProvidersAction, fetchProvidersUrl } = this.props;
    fetchProvidersAction(fetchProvidersUrl);
    this.startPolling();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  componentDidUpdate(prevProps) {
    // When a modal closes, reset the polling interval to see results immediately
    if (this.pollingInterval && this.hasSomeModalOpen(prevProps) && !this.hasSomeModalOpen()) {
      this.startPolling();
    }
  }

  hasSomeModalOpen = (props = this.props) =>
    props.conversionHostWizardMounted || props.conversionHostDeleteModalVisible;

  startPolling = () => {
    this.stopPolling(); // Allow startPolling to be called more than once to reset the interval
    this.fetchConversionHostsAndTasks().then(() => {
      this.setState({ hasMadeInitialFetch: true });
      this.pollingInterval = setInterval(this.fetchConversionHostsAndTasks, 15000);
    });
  };

  stopPolling = () => {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  };

  fetchConversionHostsAndTasks = () => {
    const {
      fetchConversionHostsAction,
      fetchConversionHostsUrl,
      fetchConversionHostTasksAction,
      fetchConversionHostTasksUrl
    } = this.props;
    if (this.hasSomeModalOpen()) return Promise.resolve();
    return Promise.all([
      fetchConversionHostsAction(fetchConversionHostsUrl),
      fetchConversionHostTasksAction(fetchConversionHostTasksUrl)
    ]);
  };

  render() {
    const {
      isFetchingProviders,
      hasSufficientProviders,
      conversionHosts,
      conversionHostTasks,
      setHostToDeleteAction,
      showConversionHostDeleteModalAction,
      conversionHostDeleteModalVisible,
      conversionHostToDelete,
      isDeletingConversionHost,
      showConversionHostWizardAction,
      conversionHostWizardMounted,
      hideConversionHostDeleteModalAction,
      deleteConversionHostAction,
      deleteConversionHostActionUrl,
      fetchConversionHostsAction,
      fetchConversionHostsUrl
    } = this.props;

    const { hasMadeInitialFetch } = this.state;

    console.log('CONVERSION HOST TASKS?', conversionHostTasks); // TODO remove me

    return (
      <Spinner loading={isFetchingProviders || !hasMadeInitialFetch} style={{ marginTop: 15 }}>
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
              <ConversionHostsList
                conversionHosts={conversionHosts}
                deleteConversionHostAction={deleteConversionHostAction}
                deleteConversionHostActionUrl={deleteConversionHostActionUrl}
                fetchConversionHostsAction={fetchConversionHostsAction}
                fetchConversionHostsUrl={fetchConversionHostsUrl}
                setHostToDeleteAction={setHostToDeleteAction}
                showConversionHostDeleteModalAction={showConversionHostDeleteModalAction}
                conversionHostDeleteModalVisible={conversionHostDeleteModalVisible}
                conversionHostToDelete={conversionHostToDelete}
                isDeletingConversionHost={isDeletingConversionHost}
                hideConversionHostDeleteModalAction={hideConversionHostDeleteModalAction}
              />
            )}
            {conversionHostWizardMounted && <ConversionHostWizard />}
          </React.Fragment>
        )}
      </Spinner>
    );
  }
}

ConversionHostsSettings.propTypes = {
  deleteConversionHostAction: PropTypes.func,
  deleteConversionHostActionUrl: PropTypes.string,
  fetchProvidersUrl: PropTypes.string,
  fetchProvidersAction: PropTypes.func,
  isFetchingProviders: PropTypes.bool,
  hasSufficientProviders: PropTypes.bool,
  fetchConversionHostsUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  isFetchingConversionHosts: PropTypes.bool,
  conversionHosts: PropTypes.arrayOf(PropTypes.object),
  fetchConversionHostTasksAction: PropTypes.func,
  fetchConversionHostTasksUrl: PropTypes.string,
  isFetchingConversionHostTasks: PropTypes.bool,
  conversionHostTasks: PropTypes.arrayOf(PropTypes.object),
  showConversionHostWizardAction: PropTypes.func,
  conversionHostWizardMounted: PropTypes.bool,
  setHostToDeleteAction: PropTypes.func,
  showConversionHostDeleteModalAction: PropTypes.func,
  conversionHostDeleteModalVisible: PropTypes.bool,
  conversionHostToDelete: PropTypes.object,
  isDeletingConversionHost: PropTypes.bool,
  hideConversionHostDeleteModalAction: PropTypes.func
};

ConversionHostsSettings.defaultProps = {
  deleteConversionHostActionUrl: '/api/conversion_hosts',
  fetchProvidersUrl: FETCH_V2V_PROVIDERS_URL,
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource&expand=resources',
  fetchConversionHostTasksUrl:
    '/api/tasks?expand=resources&attributes=id,name&filter[]=name="%25Configuring a conversion_host%25"'
};

// TODO handle above ^, metadata processing with regex, array of pre-associated hosts/tasks into list view? do that in redux or render?

export default ConversionHostsSettings;
