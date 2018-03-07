import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
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
      isRejectedSourceDatastores,
      isRejectedTargetDatastores
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;
    if (
      (isRejectedSourceDatastores !== nextProps.isRejectedSourceDatastores &&
        nextProps.isRejectedSourceDatastores) ||
      (isRejectedTargetDatastores !== nextProps.isRejectedTargetDatastores &&
        nextProps.isRejectedTargetDatastores)
    ) {
      showAlertAction(
        `Error retrieving cluster: ${selectedCluster.name} (${
          selectedClusterMapping.name
        })`
      );
    }
  }

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

  render() {
    const {
      clusterMappings,
      isFetchingSourceDatastores,
      isFetchingTargetDatastores,
      // source/target datastores change depending on selection
      sourceDatastores,
      targetDatastores,
      form,
      showAlertAction,
      hideAlertAction
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceCluster` and go get that cluster's datastores on selection
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
          name="datastoresMappings"
          component={DatastoresStepForm}
          sourceDatastores={sourceDatastores}
          targetDatastores={targetDatastores}
          selectedCluster={selectedCluster}
          selectedClusterMapping={selectedClusterMapping}
          isFetchingSourceDatastores={isFetchingSourceDatastores}
          isFetchingTargetDatastores={isFetchingTargetDatastores}
          validate={length({ min: 1 })}
          showAlertAction={showAlertAction}
          hideAlertAction={hideAlertAction}
        />
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
  isRejectedTargetDatastores: PropTypes.bool,
  form: PropTypes.string,
  pristine: PropTypes.bool,
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func
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
  isRejectedTargetDatastores: false,
  form: '',
  pristine: true,
  showAlertAction: noop,
  hideAlertAction: noop
};

export default reduxForm({
  form: 'mappingWizardDatastoresStep',
  initialValues: { datastoresMappings: [] },
  destroyOnUnmount: false
})(MappingWizardDatastoresStep);
