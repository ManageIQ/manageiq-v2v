import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Spinner } from 'patternfly-react';

import componentRegistry from '../../../../components/componentRegistry';
import InfrastructureMappingsList from './components/InfrastructureMappingsList/InfrastructureMappingsList';
import { FETCH_TRANSFORMATION_PLANS_URL, FETCH_ARCHIVED_TRANSFORMATION_PLANS_URL } from '../Overview/OverviewConstants';
import { FETCH_TRANSFORMATION_MAPPINGS_URL, FETCH_CLOUD_TENANTS_URL } from './MappingsConstants';
import { FETCH_V2V_PROVIDERS_URL } from '../../../../redux/common/providers/providersConstants';
import MigrationBreadcrumbBar from '../common/MigrationBreadcrumbBar';
import NoProvidersEmptyState from '../common/NoProvidersEmptyState';

class Mappings extends Component {
  constructor(props) {
    super(props);
    this.willUnmount = false;
  }

  mappingWizard = componentRegistry.markup('MappingWizardContainer', this.props.store);

  componentDidMount = () => {
    const {
      fetchArchivedTransformationPlansUrl,
      fetchCloudNetworksAction,
      fetchCloudNetworksUrl,
      fetchCloudTenantsAction,
      fetchCloudTenantsUrl,
      fetchCloudVolumeTypesAction,
      fetchCloudVolumeTypesUrl,
      fetchClustersAction,
      fetchClustersUrl,
      fetchDatastoresAction,
      fetchDatastoresUrl,
      fetchNetworksAction,
      fetchNetworksUrl,
      fetchProductFeaturesAction,
      fetchProductFeaturesActionUrl,
      fetchProvidersAction,
      fetchProvidersUrl,
      fetchTransformationMappingsAction,
      fetchTransformationMappingsUrl,
      fetchTransformationPlansAction,
      fetchTransformationPlansUrl,
      openMappingWizardOnMount,
      showMappingWizardAction
    } = this.props;

    if (openMappingWizardOnMount) {
      showMappingWizardAction();
    }

    fetchCloudNetworksAction(fetchCloudNetworksUrl);
    fetchCloudTenantsAction(fetchCloudTenantsUrl, {
      addSearch: { attributes: 'ext_management_system.name,cloud_networks,cloud_volume_types' }
    });
    fetchCloudVolumeTypesAction(fetchCloudVolumeTypesUrl);
    fetchClustersAction(fetchClustersUrl);
    fetchDatastoresAction(fetchDatastoresUrl);
    fetchNetworksAction(fetchNetworksUrl);
    fetchProvidersAction(fetchProvidersUrl);
    fetchTransformationMappingsAction(fetchTransformationMappingsUrl);
    fetchProductFeaturesAction(fetchProductFeaturesActionUrl);

    Promise.all([
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      }),
      fetchTransformationPlansAction({
        url: fetchArchivedTransformationPlansUrl,
        archived: true
      })
    ]).then(() => {
      if (!this.pollingInterval && !this.willUnmount) {
        this.startPolling();
      }
    });
  };

  componentDidUpdate = prevProps => {
    if (
      prevProps.yesToDeleteInfrastructureMapping !== this.props.yesToDeleteInfrastructureMapping &&
      this.props.yesToDeleteInfrastructureMapping
    ) {
      this.props
        .deleteInfrastructureMappingAction(this.props.mappingToDelete)
        .then(() => this.props.fetchTransformationMappingsAction(this.props.fetchTransformationMappingsUrl));
    }

    if (prevProps.mappinWizardVisible !== this.props.mappingWizardVisible) {
      if (this.props.mappingWizardVisible) {
        this.stopPolling();
      } else if (!this.props.mappingWizardVisible && !this.pollingInterval && !this.willUnmount) {
        this.props.fetchTransformationPlansAction({
          url: this.props.fetchTransformationPlansUrl,
          archived: false
        });
        this.startPolling();
      }
    }
  };

  componentWillUnmount() {
    this.willUnmount = true;
    this.stopPolling();
  }

  startPolling = () => {
    const { fetchTransformationPlansAction, fetchTransformationPlansUrl } = this.props;
    this.pollingInterval = setInterval(() => {
      fetchTransformationPlansAction({
        url: fetchTransformationPlansUrl,
        archived: false
      });
    }, 15000);
  };

  stopPolling = () => {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  };

  inProgressRequestsTransformationMappings = () => {
    const { activeTransformationPlans } = this.props;
    const mappings = [];

    if (activeTransformationPlans) {
      activeTransformationPlans.map(plan => mappings.push(plan.options.config_info.transformation_mapping_id));
    }

    return mappings;
  };

  render() {
    const {
      archivedTransformationPlans,
      cloudNetworks,
      cloudTenants,
      cloudVolumeTypes,
      clusters,
      datastores,
      deleteInfrastructureMappingAction,
      finishedWithErrorTransformationPlans,
      hasSufficientProviders,
      hideDeleteConfirmationModalAction,
      isFetchingCloudNetworks,
      isFetchingCloudTenants,
      isFetchingCloudVolumeTypes,
      isFetchingClusters,
      isFetchingDatastores,
      isFetchingNetworks,
      isFetchingProviders,
      isFetchingTransformationMappings,
      isRejectedCloudNetworks,
      isRejectedCloudTenants,
      isRejectedCloudVolumeTypes,
      isRejectedClusters,
      isRejectedDatastores,
      isRejectedNetworks,
      isRejectedTransformationMappings,
      mappingToDelete,
      mappingWizardVisible,
      networks,
      notStartedTransformationPlans,
      productFeatures,
      transformationMappings,
      transformationPlans,
      setMappingToDeleteAction,
      showDeleteConfirmationModal,
      showDeleteConfirmationModalAction,
      showMappingWizardAction,
      showMappingWizardEditModeAction,
      yesToDeleteInfrastructureMappingAction
    } = this.props;

    return (
      <div className="main-scroll-container">
        <MigrationBreadcrumbBar activeHref="#/mappings" productFeatures={productFeatures} />
        <Spinner
          loading={
            isFetchingCloudNetworks ||
            isFetchingCloudTenants ||
            isFetchingCloudVolumeTypes ||
            isFetchingClusters ||
            isFetchingDatastores ||
            isFetchingNetworks ||
            isFetchingProviders ||
            isFetchingTransformationMappings
          }
          style={{ marginTop: 100 }}
        >
          {hasSufficientProviders ? (
            <InfrastructureMappingsList
              clusters={clusters}
              datastores={datastores}
              networks={networks}
              cloudTenants={cloudTenants}
              cloudNetworks={cloudNetworks}
              cloudVolumeTypes={cloudVolumeTypes}
              transformationMappings={transformationMappings}
              error={
                isRejectedClusters ||
                isRejectedDatastores ||
                isRejectedNetworks ||
                isRejectedCloudNetworks ||
                isRejectedCloudTenants ||
                isRejectedCloudVolumeTypes ||
                isRejectedTransformationMappings
              }
              createInfraMappingClick={showMappingWizardAction}
              inProgressRequestsTransformationMappings={this.inProgressRequestsTransformationMappings()}
              showDeleteConfirmationModalAction={showDeleteConfirmationModalAction}
              setMappingToDeleteAction={setMappingToDeleteAction}
              showDeleteConfirmationModal={showDeleteConfirmationModal}
              hideDeleteConfirmationModalAction={hideDeleteConfirmationModalAction}
              mappingToDelete={mappingToDelete}
              yesToDeleteInfrastructureMappingAction={yesToDeleteInfrastructureMappingAction}
              notStartedTransformationPlans={notStartedTransformationPlans}
              finishedWithErrorTransformationPlans={finishedWithErrorTransformationPlans}
              deleteInfrastructureMappingAction={deleteInfrastructureMappingAction}
              migrationPlansExist={transformationPlans.length > 0 || archivedTransformationPlans.length > 0}
              showMappingWizardEditModeAction={showMappingWizardEditModeAction}
            />
          ) : (
            <NoProvidersEmptyState className="white-bg" />
          )}
        </Spinner>
        {mappingWizardVisible && this.mappingWizard}
      </div>
    );
  }
}

Mappings.propTypes = {
  activeTransformationPlans: PropTypes.array,
  archivedTransformationPlans: PropTypes.array,
  cloudNetworks: PropTypes.array,
  cloudTenants: PropTypes.array,
  cloudVolumeTypes: PropTypes.array,
  clusters: PropTypes.array,
  datastores: PropTypes.array,
  deleteInfrastructureMappingAction: PropTypes.func,
  networks: PropTypes.array,
  transformationMappings: PropTypes.array,
  fetchArchivedTransformationPlansUrl: PropTypes.string,
  fetchCloudNetworksAction: PropTypes.func,
  fetchCloudNetworksUrl: PropTypes.string,
  fetchCloudTenantsAction: PropTypes.func,
  fetchCloudTenantsUrl: PropTypes.string,
  fetchCloudVolumeTypesAction: PropTypes.func,
  fetchCloudVolumeTypesUrl: PropTypes.string,
  fetchClustersAction: PropTypes.func,
  fetchClustersUrl: PropTypes.string,
  fetchDatastoresAction: PropTypes.func,
  fetchDatastoresUrl: PropTypes.string,
  fetchNetworksAction: PropTypes.func,
  fetchNetworksUrl: PropTypes.string,
  fetchProductFeaturesAction: PropTypes.func,
  fetchProductFeaturesActionUrl: PropTypes.string,
  fetchProvidersAction: PropTypes.func,
  fetchProvidersUrl: PropTypes.string,
  fetchTransformationMappingsAction: PropTypes.func,
  fetchTransformationMappingsUrl: PropTypes.string,
  fetchTransformationPlansAction: PropTypes.func,
  fetchTransformationPlansUrl: PropTypes.string,
  finishedWithErrorTransformationPlans: PropTypes.array,
  hasSufficientProviders: PropTypes.bool,
  hideDeleteConfirmationModalAction: PropTypes.func,
  isFetchingCloudNetworks: PropTypes.bool,
  isFetchingCloudTenants: PropTypes.bool,
  isFetchingCloudVolumeTypes: PropTypes.bool,
  isFetchingClusters: PropTypes.bool,
  isFetchingDatastores: PropTypes.bool,
  isFetchingNetworks: PropTypes.bool,
  isFetchingProviders: PropTypes.bool,
  isFetchingTransformationMappings: PropTypes.bool,
  isRejectedCloudNetworks: PropTypes.bool,
  isRejectedCloudTenants: PropTypes.bool,
  isRejectedCloudVolumeTypes: PropTypes.bool,
  isRejectedClusters: PropTypes.bool,
  isRejectedDatastores: PropTypes.bool,
  isRejectedNetworks: PropTypes.bool,
  isRejectedTransformationMappings: PropTypes.bool,
  mappingToDelete: PropTypes.object,
  mappingWizardVisible: PropTypes.bool,
  notStartedTransformationPlans: PropTypes.array,
  openMappingWizardOnMount: PropTypes.bool,
  productFeatures: PropTypes.array,
  setMappingToDeleteAction: PropTypes.func,
  showDeleteConfirmationModal: PropTypes.bool,
  showDeleteConfirmationModalAction: PropTypes.func,
  showMappingWizardAction: PropTypes.func,
  showMappingWizardEditModeAction: PropTypes.func,
  store: PropTypes.object,
  transformationPlans: PropTypes.array,
  yesToDeleteInfrastructureMapping: PropTypes.bool,
  yesToDeleteInfrastructureMappingAction: PropTypes.func
};

Mappings.defaultProps = {
  fetchCloudNetworksUrl: '/api/cloud_networks?expand=resources',
  fetchCloudTenantsUrl: FETCH_CLOUD_TENANTS_URL,
  fetchCloudVolumeTypesUrl: '/api/cloud_volume_types?expand=resources',
  fetchClustersUrl:
    '/api/clusters/' +
    '?attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,lans,storages' +
    '&expand=resources',
  fetchDatastoresUrl: '/api/data_stores?expand=resources',
  fetchNetworksUrl: '/api/lans/?expand=resources',
  fetchProductFeaturesActionUrl: '/api',
  fetchTransformationMappingsUrl: FETCH_TRANSFORMATION_MAPPINGS_URL,
  fetchArchivedTransformationPlansUrl: FETCH_ARCHIVED_TRANSFORMATION_PLANS_URL,
  fetchTransformationPlansUrl: FETCH_TRANSFORMATION_PLANS_URL,
  fetchProvidersUrl: FETCH_V2V_PROVIDERS_URL
};

export default Mappings;
