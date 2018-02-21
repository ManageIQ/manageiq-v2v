import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { noop, Button, bindMethods } from 'patternfly-react';

import SourceClusterSelect from './components/SourceClusterSelect/SourceClusterSelect';
import DatastoresStepForm from './components/DatastoresStepForm';

class MappingWizardDatastoresStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCluster: undefined, // dropdown selected cluster
      selectedClusterMapping: null,
      selectedTargetDatastore: null, // eslint-disable-line react/no-unused-state
      selectedSourceDatastore: [], // eslint-disable-line react/no-unused-state
      datastoreMappings: [], // eslint-disable-line react/no-unused-state
      selectedDatastoreMapping: null // eslint-disable-line react/no-unused-state
    };

    bindMethods(this, ['selectSourceCluster']);
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

    const selectedClusterMapping = clusterMappings.find(clusterMapping => {
      return clusterMapping.nodes.some(sourceCluster => {
        return sourceCluster.id === sourceClusterId;
      });
    });

    const { nodes: sourceClusters, ...targetCluster } = selectedClusterMapping;

    this.setState(() => {
      return {
        selectedCluster: sourceClusters.find(sourceCluster => {
          return sourceCluster.id === sourceClusterId;
        }),
        selectedClusterMapping
      };
    });

    fetchSourceDatastoresAction(fetchDatastoresUrl, sourceClusterId);
    fetchTargetDatastoresAction(fetchDatastoresUrl, targetCluster.id);
  }

  render() {
    const {
      // todo: inject the mapped clusters from MappingWizardClustersStep as props here
      clusterMappings, // eslint-disable-line no-unused-vars
      isFetchingSourceDatastores, // eslint-disable-line no-unused-vars
      isRejectedSourceDatastores, // eslint-disable-line no-unused-vars
      isFetchingTargetDatastores, // eslint-disable-line no-unused-vars
      isRejectedTargetDatastores, // eslint-disable-line no-unused-vars
      // source/target datastores change depending on selection
      sourceDatastores, // eslint-disable-line no-unused-vars
      targetDatastores, // eslint-disable-line no-unused-vars
      removeSourceDatastores,
      removeTargetDatastore,
      addSourceDatastores,
      addTargetDatastore
    } = this.props;

    const {
      selectedCluster, // eslint-disable-line no-unused-vars
      selectedClusterMapping,
      selectedTargetDatastore, // eslint-disable-line no-unused-vars
      selectedSourceDatastore, // eslint-disable-line no-unused-vars
      datastoreMappings, // eslint-disable-line no-unused-vars
      selectedDatastoreMapping // eslint-disable-line no-unused-vars
    } = this.state;

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceCluster` and go get that cluster's datastores on selection

    // todo: change this Button to the source cluster populated Dropdown
    return (
      <div>
        <SourceClusterSelect
          sourceClusters={clusterMappings.reduce(
            (sourceClusters, clusterMapping) => {
              return sourceClusters.concat(clusterMapping.nodes);
            },
            []
          )}
          selectSourceCluster={this.selectSourceCluster}
          selectedCluster={selectedCluster}
        />
        {!isFetchingSourceDatastores &&
          !isFetchingTargetDatastores &&
          selectedCluster && (
            <Field
              name="datastoresMappings"
              component={DatastoresStepForm}
              sourceDatastores={sourceDatastores}
              targetDatastores={targetDatastores}
              selectedCluster={selectedCluster}
              selectedClusterMapping={selectedClusterMapping}
              removeSourceDatastores={removeSourceDatastores}
              removeTargetDatastore={removeTargetDatastore}
              addSourceDatastores={addSourceDatastores}
              addTargetDatastore={addTargetDatastore}
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
  // removeTargetDatastore: PropTypes.func,
  // removeSourceDatastore: PropTypes.func,
  // addTargetDatastore: PropTypes.func,
  // addSourceDatastore: PropTypes.func
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
  // removeTargetDatastore: noop,
  // removeSourceDatastore: noop,
  // addTargetDatastore: noop,
  // addSourceDatastore: noop
};

export default reduxForm({
  form: 'mappingWizardDatastoresStep',
  initialValues: { datastoresMappings: [] },
  destroyOnUnmount: false
})(MappingWizardDatastoresStep);
