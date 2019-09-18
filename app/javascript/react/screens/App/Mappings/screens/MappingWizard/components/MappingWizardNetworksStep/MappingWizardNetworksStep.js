import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import NetworksStepForm from './components/NetworksStepForm/NetworksStepForm';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { getClusterOptions, updateMappings } from '../helpers';
import { FETCH_NETWORK_URLS, HAS_CLOUD_NETWORKS } from './MappingWizardNetworksStepConstants';
import { createNetworksMappings } from './components/NetworksStepForm/helpers';

class MappingWizardNetworksStep extends React.Component {
  state = {
    selectedCluster: undefined, // dropdown selected cluster
    selectedClusterMapping: null, // cluster mapping from step-2 associated with selected source cluster
    preLoadingMappings: false
  };

  constructor(props) {
    super(props);

    const { clusterMappings, pristine } = this.props;

    const sourceClusters = clusterMappings.reduce(
      (clusters, clusterMapping) => clusters.concat(clusterMapping.nodes),
      []
    );

    const synchronousSetState = newState => {
      this.state = { ...this.state, ...newState };
    };

    if (sourceClusters.length === 1 || !pristine) {
      this.selectSourceCluster(sourceClusters[0].id, synchronousSetState);
    }
  }

  componentDidMount() {
    const {
      editingMapping,
      targetProvider,
      initialize,
      initialized,
      clusterMappings,
      change,
      mappingWizardNetworksStepForm
    } = this.props;

    if (editingMapping && !initialized) {
      this.setState({ preLoadingMappings: true }); // eslint-disable-line react/no-did-mount-set-state
      createNetworksMappings(editingMapping, targetProvider, clusterMappings).then(networksMappings => {
        initialize({ networksMappings: updateMappings(networksMappings, clusterMappings) });
        this.setState({ preLoadingMappings: false });
      });
      return;
    }

    if (mappingWizardNetworksStepForm && mappingWizardNetworksStepForm.values) {
      change(
        'networksMappings',
        updateMappings(mappingWizardNetworksStepForm.values.networksMappings, clusterMappings)
      );
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { showAlertAction, isRejectedSourceNetworks, isRejectedTargetNetworks } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    if (isRejectedSourceNetworks !== nextProps.isRejectedSourceNetworks && nextProps.isRejectedSourceNetworks) {
      const msg = sprintf(
        __('Error retrieving cluster networks: %s, ID: %s'),
        selectedCluster.name,
        selectedCluster.id
      );
      showAlertAction(msg);
    } else if (
      isRejectedTargetNetworks !== nextProps.isRejectedTargetNetworks &&
      nextProps.isRejectedTargetNetworks &&
      !isRejectedSourceNetworks
    ) {
      const msg = sprintf(
        __('Error retrieving cluster networks: %s, ID: %s'),
        selectedClusterMapping.name,
        selectedClusterMapping.id
      );
      showAlertAction(msg);
    }
  }

  selectSourceCluster = (sourceClusterId, synchronousSetState) => {
    // when dropdown selection occurs for source cluster, we go retrieve the
    // newworks for that cluster
    const {
      fetchNetworksUrls,
      fetchSourceNetworksAction,
      fetchTargetNetworksAction,
      fetchPublicCloudNetworksAction,
      clusterMappings,
      targetProvider
    } = this.props;

    const selectedClusterMapping = clusterMappings.find(clusterMapping =>
      clusterMapping.nodes.some(sourceCluster => sourceCluster.id === sourceClusterId)
    );

    const { nodes: sourceClusters, ...targetCluster } = selectedClusterMapping;

    const newState = {
      selectedCluster: sourceClusters.find(sourceCluster => sourceCluster.id === sourceClusterId),
      selectedClusterMapping
    };

    if (synchronousSetState) {
      synchronousSetState(newState);
    } else {
      this.setState(newState);
    }

    fetchSourceNetworksAction(fetchNetworksUrls.source, sourceClusterId);
    fetchTargetNetworksAction(fetchNetworksUrls[targetProvider], targetCluster.id, targetProvider);

    if (HAS_CLOUD_NETWORKS[targetProvider]) {
      fetchPublicCloudNetworksAction(fetchNetworksUrls.public, targetCluster);
    }
  };

  render() {
    const {
      clusterMappings,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      groupedSourceNetworks,
      groupedTargetNetworks,
      form,
      targetProvider
    } = this.props;

    const { selectedCluster, selectedClusterMapping, preLoadingMappings } = this.state;

    const clusterOptions = getClusterOptions(clusterMappings);

    return (
      <div>
        <Field
          name="cluster_select"
          label={__('Select a source cluster whose networks you want to map')}
          data_live_search="true"
          component={BootstrapSelect}
          options={clusterOptions}
          option_key="id"
          option_value="name"
          onSelect={this.selectSourceCluster}
          pre_selected_value={clusterOptions.length === 1 ? clusterOptions[0].id : ''}
          choose_text={`<${__('Select a source cluster')}>`}
          render_within_form="true"
          form_name={form}
          inline_label
          labelWidth={6}
          controlWidth={4}
        />
        <Field
          name="networksMappings"
          component={NetworksStepForm}
          groupedSourceNetworks={groupedSourceNetworks}
          groupedTargetNetworks={groupedTargetNetworks}
          selectedCluster={selectedCluster}
          selectedClusterMapping={selectedClusterMapping}
          isFetchingSourceNetworks={isFetchingSourceNetworks}
          isFetchingTargetNetworks={isFetchingTargetNetworks}
          validate={length({ min: 1 })}
          targetProvider={targetProvider}
          preLoadingMappings={preLoadingMappings}
        />
      </div>
    );
  }
}

MappingWizardNetworksStep.propTypes = {
  clusterMappings: PropTypes.array,
  editingMapping: PropTypes.object,
  fetchNetworksUrls: PropTypes.object,
  fetchPublicCloudNetworksAction: PropTypes.func,
  fetchSourceNetworksAction: PropTypes.func,
  fetchTargetNetworksAction: PropTypes.func,
  initialize: PropTypes.func,
  initialized: PropTypes.bool,
  isFetchingSourceNetworks: PropTypes.bool,
  isRejectedSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  isRejectedTargetNetworks: PropTypes.bool,
  form: PropTypes.string,
  pristine: PropTypes.bool,
  showAlertAction: PropTypes.func,
  groupedSourceNetworks: PropTypes.object,
  groupedTargetNetworks: PropTypes.object,
  targetProvider: PropTypes.string,
  change: PropTypes.func,
  mappingWizardNetworksStepForm: PropTypes.object
};
MappingWizardNetworksStep.defaultProps = {
  clusterMappings: [],
  fetchNetworksUrls: FETCH_NETWORK_URLS,
  fetchSourceNetworksAction: noop,
  fetchTargetNetworksAction: noop,
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false,
  form: '',
  pristine: true,
  showAlertAction: noop,
  targetProvider: ''
};

export default reduxForm({
  form: 'mappingWizardNetworksStep',
  destroyOnUnmount: false
})(MappingWizardNetworksStep);
