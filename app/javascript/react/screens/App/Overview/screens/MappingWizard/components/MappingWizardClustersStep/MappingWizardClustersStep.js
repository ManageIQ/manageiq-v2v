import React from 'react';
import PropTypes from 'prop-types';
import { Button, noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import ClustersStepForm from './components/ClustersStepForm/ClustersStepForm';

class MappingWizardClustersStep extends React.Component {
  componentDidMount() {
    this.fetchClusters();
  }

  fetchClusters = () => {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetComputeUrls,
      fetchTargetClustersAction,
      targetProvider,
      queryHostsUrl,
      queryHostsAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetComputeUrls[targetProvider]).then(result => {
      const hostIDsByClusterID = result.value.data.resources.reduce(
        (newObject, cluster) => ({
          ...newObject,
          [cluster.id]: cluster.hosts.map(host => host.id)
        }),
        {}
      );
      queryHostsAction(queryHostsUrl, hostIDsByClusterID);
    });
  };

  render() {
    const {
      isFetchingSourceClusters,
      sourceClusters,
      isFetchingTargetClusters,
      targetClusters,
      isRejectedSourceClusters,
      isRejectedTargetClusters,
      targetProvider,
      isFetchingHostsQuery,
      isRejectedHostsQuery,
      hostsByClusterID
    } = this.props;

    if (isRejectedSourceClusters || isRejectedTargetClusters) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('Error Retrieving Clusters')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__("We're sorry, something went wrong. Please try again.")}
          </p>
          <Button bsStyle="primary" onClick={this.fetchClusters}>
            {__('Retry')}
          </Button>
        </div>
      );
    }
    return (
      <Field
        name="clusterMappings"
        component={ClustersStepForm}
        sourceClusters={sourceClusters}
        targetClusters={targetClusters}
        validate={[length({ min: 1 })]}
        isFetchingSourceClusters={isFetchingSourceClusters}
        isFetchingTargetClusters={isFetchingTargetClusters}
        targetProvider={targetProvider}
        isFetchingHostsQuery={isFetchingHostsQuery}
        isRejectedHostsQuery={isRejectedHostsQuery}
        hostsByClusterID={hostsByClusterID}
      />
    );
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetComputeUrls: PropTypes.object,
  fetchTargetClustersAction: PropTypes.func,
  queryHostsUrl: PropTypes.string,
  queryHostsAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool,
  isRejectedSourceClusters: PropTypes.bool,
  isRejectedTargetClusters: PropTypes.bool,
  targetProvider: PropTypes.string,
  isFetchingHostsQuery: PropTypes.bool,
  isRejectedHostsQuery: PropTypes.bool,
  hostsByClusterID: PropTypes.object
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersUrl: '',
  fetchSourceClustersAction: noop,
  fetchTargetComputeUrls: {},
  fetchTargetClustersAction: noop,
  queryHostsUrl: '',
  queryHostsAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true,
  isRejectedSourceClusters: false,
  isRejectedTargetClusters: false,
  targetProvider: '',
  isFetchingHostsQuery: false,
  isRejectedHostsQuery: false,
  hostsByClusterID: {}
};

export default reduxForm({
  form: 'mappingWizardClustersStep',
  initialValues: { clusterMappings: [] },
  destroyOnUnmount: false
})(MappingWizardClustersStep);
