import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import NetworksStepForm from './components/NetworksStepForm/NetworksStepForm';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { getClusterOptions } from '../helpers';

class MappingWizardNetworksStep extends React.Component {
  state = {
    selectedCluster: undefined, // dropdown selected cluster
    selectedClusterMapping: null // cluster mapping from step-2 associated with selected source cluster
  };

  componentWillMount() {
    const { clusterMappings, pristine } = this.props;

    const sourceClusters = clusterMappings.reduce(
      (clusters, clusterMapping) => clusters.concat(clusterMapping.nodes),
      []
    );

    if (sourceClusters.length === 1 || !pristine) {
      this.selectSourceCluster(sourceClusters[0].id);
    }
  }

  componentDidMount() {}

  componentWillReceiveProps(nextProps) {
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

  selectSourceCluster = sourceClusterId => {
    // when dropdown selection occurs for source cluster, we go retrieve the
    // newworks for that cluster
    const { fetchNetworksUrl, fetchSourceNetworksAction, fetchTargetNetworksAction, clusterMappings } = this.props;

    const selectedClusterMapping = clusterMappings.find(clusterMapping =>
      clusterMapping.nodes.some(sourceCluster => sourceCluster.id === sourceClusterId)
    );

    const { nodes: sourceClusters, ...targetCluster } = selectedClusterMapping;

    this.setState(() => ({
      selectedCluster: sourceClusters.find(sourceCluster => sourceCluster.id === sourceClusterId),
      selectedClusterMapping
    }));

    fetchSourceNetworksAction(fetchNetworksUrl, sourceClusterId);
    fetchTargetNetworksAction(fetchNetworksUrl, targetCluster.id);
  };

  render() {
    const {
      clusterMappings,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      groupedSourceNetworks,
      groupedTargetNetworks,
      form
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    const clusterOptions = getClusterOptions(clusterMappings);

    return (
      <div>
        <Field
          name="cluster_select"
          label={__('Map source networks to target networks for cluster')}
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
        />
      </div>
    );
  }
}

MappingWizardNetworksStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchNetworksUrl: PropTypes.string,
  fetchSourceNetworksAction: PropTypes.func,
  fetchTargetNetworksAction: PropTypes.func,
  isFetchingSourceNetworks: PropTypes.bool,
  isRejectedSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  isRejectedTargetNetworks: PropTypes.bool,
  form: PropTypes.string,
  pristine: PropTypes.bool,
  showAlertAction: PropTypes.func,
  groupedSourceNetworks: PropTypes.object,
  groupedTargetNetworks: PropTypes.object
};
MappingWizardNetworksStep.defaultProps = {
  clusterMappings: [],
  fetchNetworksUrl: '',
  fetchSourceNetworksAction: noop,
  fetchTargetNetworksAction: noop,
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false,
  form: '',
  pristine: true,
  showAlertAction: noop
};

export default reduxForm({
  form: 'mappingWizardNetworksStep',
  initialValues: { networksMappings: [] },
  destroyOnUnmount: false
})(MappingWizardNetworksStep);
