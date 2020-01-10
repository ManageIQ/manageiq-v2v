import React from 'react';
import PropTypes from 'prop-types';
import { Spinner, Icon } from 'patternfly-react';
import ConversionHostsEmptyState from './components/ConversionHostsEmptyState';
import ConversionHostsList from './components/ConversionHostsList';
import ConversionHostWizard from './components/ConversionHostWizard';
import { FETCH_V2V_PROVIDERS_URL } from '../../../../../../redux/common/providers/providersConstants';
import NoProvidersEmptyState from '../../../common/NoProvidersEmptyState';
import { FETCH_CONVERSION_HOSTS_URL } from '../../SettingsConstants';

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
      hasTargetProvider,
      combinedListItems,
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
      fetchConversionHostsUrl,
      conversionHostRetryModalMounted,
      isPostingConversionHosts,
      setConversionHostTaskToRetryAction,
      showConversionHostRetryModalAction,
      postConversionHostsUrl,
      saveTextFileAction
    } = this.props;

    const { hasMadeInitialFetch } = this.state;

    return (
      <Spinner loading={isFetchingProviders || !hasMadeInitialFetch} style={{ marginTop: 15 }}>
        {!hasTargetProvider ? (
          <NoProvidersEmptyState
            className="full-page-empty"
            description={
              __('There are no providers available from which to configure a conversion host. You must configure a target provider before configuring conversion hosts.') // prettier-ignore
            }
          />
        ) : (
          <React.Fragment>
            <div className="heading-with-link-container">
              <div className="pull-left">
                <h3>{__('Configured Conversion Hosts')}</h3>
              </div>
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
            {combinedListItems.length === 0 ? (
              <ConversionHostsEmptyState showConversionHostWizardAction={showConversionHostWizardAction} />
            ) : (
              <ConversionHostsList
                combinedListItems={combinedListItems}
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
                conversionHostRetryModalMounted={conversionHostRetryModalMounted}
                isPostingConversionHosts={isPostingConversionHosts}
                setConversionHostTaskToRetryAction={setConversionHostTaskToRetryAction}
                showConversionHostRetryModalAction={showConversionHostRetryModalAction}
                postConversionHostsUrl={postConversionHostsUrl}
                saveTextFileAction={saveTextFileAction}
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
  hasTargetProvider: PropTypes.bool,
  fetchConversionHostsUrl: PropTypes.string,
  fetchConversionHostsAction: PropTypes.func,
  fetchConversionHostTasksAction: PropTypes.func,
  fetchConversionHostTasksUrl: PropTypes.string,
  combinedListItems: PropTypes.arrayOf(PropTypes.object),
  showConversionHostWizardAction: PropTypes.func,
  conversionHostWizardMounted: PropTypes.bool,
  setHostToDeleteAction: PropTypes.func,
  showConversionHostDeleteModalAction: PropTypes.func,
  conversionHostDeleteModalVisible: PropTypes.bool,
  conversionHostToDelete: PropTypes.object,
  isDeletingConversionHost: PropTypes.bool,
  hideConversionHostDeleteModalAction: PropTypes.func,
  conversionHostRetryModalMounted: PropTypes.bool,
  isPostingConversionHosts: PropTypes.bool,
  setConversionHostTaskToRetryAction: PropTypes.func,
  showConversionHostRetryModalAction: PropTypes.func,
  postConversionHostsUrl: PropTypes.string,
  saveTextFileAction: PropTypes.func
};

ConversionHostsSettings.defaultProps = {
  deleteConversionHostActionUrl: '/api/conversion_hosts',
  fetchProvidersUrl: FETCH_V2V_PROVIDERS_URL,
  fetchConversionHostsUrl: FETCH_CONVERSION_HOSTS_URL,
  fetchConversionHostTasksUrl:
    '/api/tasks?expand=resources&attributes=id,name,state,status,message,started_on,updated_on,pct_complete,context_data&filter[]=name="%25Configuring a conversion_host%25"&sort_by=updated_on&sort_order=descending',
  postConversionHostsUrl: '/api/conversion_hosts'
};

export default ConversionHostsSettings;
