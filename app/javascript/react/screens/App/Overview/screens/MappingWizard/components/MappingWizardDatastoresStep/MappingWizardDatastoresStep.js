import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import { noop } from 'patternfly-react';
import DatastoresStepForm from './components/DatastoresStepForm/DatastoresStepForm';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { getClusterOptions } from '../helpers';

class MappingWizardDatastoresStep extends React.Component {
  state = {
    selectedCluster: undefined,
    selectedClusterMapping: null
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
    const { showAlertAction, isRejectedSourceDatastores, isRejectedTargetDatastores } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;
    if (isRejectedSourceDatastores !== nextProps.isRejectedSourceDatastores && nextProps.isRejectedSourceDatastores) {
      const msg = sprintf(
        __('Error retrieving cluster datastores: %s, ID: %s'),
        selectedCluster.name,
        selectedCluster.id
      );
      showAlertAction(msg);
    } else if (
      isRejectedTargetDatastores !== nextProps.isRejectedTargetDatastores &&
      nextProps.isRejectedTargetDatastores &&
      !isRejectedSourceDatastores
    ) {
      const msg = sprintf(
        __('Error retrieving cluster datastores: %s, ID: %s'),
        selectedClusterMapping.name,
        selectedClusterMapping.id
      );
      showAlertAction(msg);
    }
  }

  selectSourceCluster = sourceClusterId => {
    // when dropdown selection occurs for source cluster, we go retrieve the datastores for that
    // cluster
    const {
      fetchStoragesUrls,
      fetchSourceDatastoresAction,
      fetchTargetDatastoresAction,
      clusterMappings,
      targetProvider
    } = this.props;

    const selectedClusterMapping = clusterMappings.find(clusterMapping =>
      clusterMapping.nodes.some(sourceCluster => sourceCluster.id === sourceClusterId)
    );

    const { nodes: sourceClusters, ...targetCluster } = selectedClusterMapping;

    this.setState(() => ({
      selectedCluster: sourceClusters.find(sourceCluster => sourceCluster.id === sourceClusterId),
      selectedClusterMapping
    }));

    fetchSourceDatastoresAction(fetchStoragesUrls.source, sourceClusterId);
    fetchTargetDatastoresAction(fetchStoragesUrls[targetProvider], targetCluster.id, targetProvider);
  };

  render() {
    const {
      clusterMappings,
      isFetchingSourceDatastores,
      isFetchingTargetDatastores,
      // source/target datastores change depending on selection
      sourceDatastores,
      targetDatastores,
      form,
      showAlertAction
    } = this.props;

    const { selectedCluster, selectedClusterMapping } = this.state;

    const clusterOptions = getClusterOptions(clusterMappings);

    // first we render the dropdown selection for each source cluster in clusterMappings,
    // then we call `selectSourceCluster` and go get that cluster's datastores on selection
    return (
      <div>
        <Field
          name="cluster_select"
          label={__('Select a source cluster whose datastores you want to map')}
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
        />
      </div>
    );
  }
}

MappingWizardDatastoresStep.propTypes = {
  clusterMappings: PropTypes.array,
  fetchStoragesUrls: PropTypes.object,
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
  targetProvider: PropTypes.string
};
MappingWizardDatastoresStep.defaultProps = {
  clusterMappings: [],
  fetchStoragesUrls: {},
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
  targetProvider: ''
};

export default reduxForm({
  form: 'mappingWizardDatastoresStep',
  initialValues: { datastoresMappings: [] },
  destroyOnUnmount: false
})(MappingWizardDatastoresStep);
