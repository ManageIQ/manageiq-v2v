import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import ClustersStepForm from './components/ClustersStepForm';

class MappingWizardClustersStep extends React.Component {
  componentDidMount() {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetClustersUrl,
      fetchTargetClustersAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetClustersUrl);
  }

  render() {
    const {
      isFetchingSourceClusters,
      sourceClusters,
      isFetchingTargetClusters,
      targetClusters,
      removeSourceClusters,
      removeTargetCluster,
      addTargetCluster,
      addSourceClusters
    } = this.props;

    if (!isFetchingSourceClusters && !isFetchingTargetClusters) {
      return (
        <Field
          name="clusterMappings"
          component={ClustersStepForm}
          sourceClusters={sourceClusters}
          targetClusters={targetClusters}
          removeSourceClusters={removeSourceClusters}
          removeTargetCluster={removeTargetCluster}
          addTargetCluster={addTargetCluster}
          addSourceClusters={addSourceClusters}
          validate={[length({ min: 1 })]}
        />
      );
    }
    return null;
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetClustersUrl: PropTypes.string,
  fetchTargetClustersAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool,
  removeTargetCluster: PropTypes.func,
  removeSourceClusters: PropTypes.func,
  addTargetCluster: PropTypes.func,
  addSourceClusters: PropTypes.func
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersUrl: '',
  fetchSourceClustersAction: noop,
  fetchTargetClustersUrl: '',
  fetchTargetClustersAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true,
  removeTargetCluster: noop,
  removeSourceClusters: noop,
  addTargetCluster: noop,
  addSourceClusters: noop
};

export default reduxForm({
  form: 'mappingWizardClustersStep',
  initialValues: { clusterMappings: [] },
  destroyOnUnmount: false
})(MappingWizardClustersStep);
