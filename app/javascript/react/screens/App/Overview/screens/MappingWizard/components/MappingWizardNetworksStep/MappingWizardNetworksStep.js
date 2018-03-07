import React from 'react';
import PropTypes from 'prop-types';
import { noop, bindMethods } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import SourceClusterSelect from '../SourceClusterSelect/SourceClusterSelect';
import NetworksStepForm from './components/NetworksStepForm';

class MappingWizardNetworksStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: undefined, // dropdown selected cluster
      selectedClusterMapping: null // cluster mapping from step-2 associated with selected source cluster
    };

    bindMethods(this, ['selectSourceCluster']);
  }

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
    const {
      showAlertAction,
      isRejectedSourceNetworks,
      isRejectedTargetNetworks
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;
    if (
      (isRejectedSourceNetworks !== nextProps.isRejectedSourceNetworks &&
        nextProps.isRejectedSourceNetworks) ||
      (isRejectedTargetNetworks !== nextProps.isRejectedTargetNetworks &&
        nextProps.isRejectedTargetNetworks)
    ) {
      showAlertAction(
        `Error retrieving cluster: ${selectedCluster.name} (${
          selectedClusterMapping.name
        })`
      );
    }
  }

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

  render() {
    const {
      clusterMappings,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      sourceNetworks,
      targetNetworks,
      form
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    return (
      <div>
        <SourceClusterSelect
          clusterMappings={clusterMappings}
          selectSourceCluster={this.selectSourceCluster}
          selectedCluster={selectedCluster}
          selectedClusterMapping={selectedClusterMapping}
          form={form}
        />
        <Field
          name="networksMappings"
          component={NetworksStepForm}
          sourceNetworks={sourceNetworks}
          targetNetworks={targetNetworks}
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
  sourceNetworks: PropTypes.arrayOf(PropTypes.object),
  targetNetworks: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceNetworks: PropTypes.bool,
  isRejectedSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  isRejectedTargetNetworks: PropTypes.bool,
  form: PropTypes.string,
  pristine: PropTypes.bool,
  showAlertAction: PropTypes.func
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
  form: '',
  pristine: true,
  showAlertAction: noop
};

export default reduxForm({
  form: 'mappingWizardNetworksStep',
  initialValues: { networksMappings: [] },
  destroyOnUnmount: false
})(MappingWizardNetworksStep);
