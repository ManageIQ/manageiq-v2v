import React from 'react';
import PropTypes from 'prop-types';
import { noop, bindMethods } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';

import SourceClusterSelect from '../SourceClusterSelect/SourceClusterSelect';
import NetworksStepForm from './components/NetworksStepForm';

class MappingWizardNetworksStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: undefined, // dropdown selected cluster
      selectedClusterMapping: null // cluster mapping from step-2 associated with selected source cluster
    };

    bindMethods(this, ['selectSourceCluster', 'resetState']);
  }

  componentDidMount() {}

  selectSourceCluster(sourceClusterId) {
    // when dropdown selection occurs for source cluster, we go retrieve the
    // newworks for that cluster
    const {
      fetchNetworksUrl,
      fetchSourceNetworksAction,
      fetchTargetNetworksAction,
      clusterMappings
    } = this.props;

    const selectedClusterMapping = clusterMappings.find(clusterMapping =>
      clusterMapping.nodes.some(
        sourceCluster => sourceCluster.id === sourceClusterId
      )
    );

    const { nodes: sourceClusters, ...targetCluster } = selectedClusterMapping;

    this.setState(() => ({
      selectedCluster: sourceClusters.find(
        sourceCluster => sourceCluster.id === sourceClusterId
      ),
      selectedClusterMapping
    }));

    fetchSourceNetworksAction(fetchNetworksUrl, sourceClusterId);
    fetchTargetNetworksAction(fetchNetworksUrl, targetCluster.id);
  }

  resetState() {
    this.setState(() => ({
      selectedCluster: undefined,
      selectedClusterMapping: null
    }));
  }

  render() {
    const {
      clusterMappings,
      isFetchingSourceNetworks,
      isRejectedSourceNetworks, // eslint-disable-line no-unused-vars
      isFetchingTargetNetworks,
      isRejectedTargetNetworks, // eslint-disable-line no-unused-vars
      sourceNetworks,
      targetNetworks,
      form
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    return (
      <div>
        <SourceClusterSelect
          sourceClusters={clusterMappings.reduce(
            (sourceClusters, clusterMapping) =>
              sourceClusters.concat(clusterMapping.nodes),
            []
          )}
          selectSourceCluster={this.selectSourceCluster}
          selectedCluster={selectedCluster}
          form={form}
        />
        {selectedCluster && (
          <Field
            name="networksMappings"
            component={NetworksStepForm}
            sourceNetworks={sourceNetworks}
            targetNetworks={targetNetworks}
            selectedClusterMapping={selectedClusterMapping}
            isFetchingSourceNetworks={isFetchingSourceNetworks}
            isFetchingTargetNetworks={isFetchingTargetNetworks}
            resetState={this.resetState}
          />
        )}
      </div>
    );
  }
}

MappingWizardNetworksStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchNetworksUrl: PropTypes.string,
  fetchSourceNetworksAction: PropTypes.func,
  fetchTargetNetworksAction: PropTypes.func,
  sourceNetworks: PropTypes.arrayOf(PropTypes.object),
  targetNetworks: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceNetworks: PropTypes.bool,
  isRejectedSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  isRejectedTargetNetworks: PropTypes.bool,
  form: PropTypes.string
};
MappingWizardNetworksStep.defaultProps = {
  clusterMappings: [],
  fetchNetworksUrl: '',
  fetchSourceNetworksAction: noop,
  fetchTargetNetworksAction: noop,
  sourceNetworks: [],
  targetNetworks: [],
  isFetchingSourceNetworks: false,
  isRejectedSourceNetworks: false,
  isFetchingTargetNetworks: false,
  isRejectedTargetNetworks: false,
  form: ''
};

export default reduxForm({
  form: 'mappingWizardNetworksStep',
  initialValues: { networksMappings: [] },
  destroyOnUnmount: false
})(MappingWizardNetworksStep);
