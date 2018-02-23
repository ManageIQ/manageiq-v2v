import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { noop, bindMethods } from 'patternfly-react';
import SourceClusterSelect from '../SourceClusterSelect/SourceClusterSelect';
import DatastoresStepForm from './components/DatastoresStepForm';

class MappingWizardDatastoresStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: undefined,
      selectedClusterMapping: null
    };

    bindMethods(this, ['selectSourceCluster', 'resetState']);
  }

  componentWillMount() {
    const { clusterMappings } = this.props;

    const sourceClusters = clusterMappings.reduce(
      (clusters, clusterMapping) => clusters.concat(clusterMapping.nodes),
      []
    );

    if (sourceClusters.length === 1) {
      this.selectSourceCluster(sourceClusters[0].id);
    }
  }

  componentDidMount() {}

  selectSourceCluster(sourceClusterId) {
    // when dropdown selection occurs for source cluster, we go retrieve the datastores for that
    // cluster
    const {
      fetchDatastoresUrl,
      fetchSourceDatastoresAction,
      fetchTargetDatastoresAction,
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

    fetchSourceDatastoresAction(fetchDatastoresUrl, sourceClusterId);
    fetchTargetDatastoresAction(fetchDatastoresUrl, targetCluster.id);
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
      isFetchingSourceDatastores,
      isRejectedSourceDatastores, // eslint-disable-line no-unused-vars
      isFetchingTargetDatastores,
      isRejectedTargetDatastores, // eslint-disable-line no-unused-vars
      // source/target datastores change depending on selection
      sourceDatastores,
      targetDatastores
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceCluster` and go get that cluster's datastores on selection
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
        />
        {selectedCluster && (
          <Field
            name="datastoresMappings"
            component={DatastoresStepForm}
            sourceDatastores={sourceDatastores}
            targetDatastores={targetDatastores}
            selectedClusterMapping={selectedClusterMapping}
            resetState={this.resetState}
            isFetchingSourceDatastores={isFetchingSourceDatastores}
            isFetchingTargetDatastores={isFetchingTargetDatastores}
          />
        )}
      </div>
    );
  }
}

MappingWizardDatastoresStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchDatastoresUrl: PropTypes.string,
  fetchSourceDatastoresAction: PropTypes.func,
  fetchTargetDatastoresAction: PropTypes.func,
  sourceDatastores: PropTypes.arrayOf(PropTypes.object),
  targetDatastores: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceDatastores: PropTypes.bool,
  isRejectedSourceDatastores: PropTypes.bool,
  isFetchingTargetDatastores: PropTypes.bool,
  isRejectedTargetDatastores: PropTypes.bool
};
MappingWizardDatastoresStep.defaultProps = {
  clusterMappings: [],
  fetchDatastoresUrl: '',
  fetchSourceDatastoresAction: noop,
  fetchTargetDatastoresAction: noop,
  sourceDatastores: [],
  targetDatastores: [],
  isFetchingSourceDatastores: false,
  isRejectedSourceDatastores: false,
  isFetchingTargetDatastores: false,
  isRejectedTargetDatastores: false
};

export default reduxForm({
  form: 'mappingWizardDatastoresStep',
  initialValues: { datastoresMappings: [] },
  destroyOnUnmount: false
})(MappingWizardDatastoresStep);
