import React from 'react';
import PropTypes from 'prop-types';
import { Button, noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import ClustersStepForm from './components/ClustersStepForm/ClustersStepForm';
import { FETCH_TARGET_COMPUTE_URLS } from '../../../../../../../../redux/common/targetResources/targetResourcesConstants';

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
      targetProvider
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetComputeUrls[targetProvider]);
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
      rhvConversionHosts,
      ospConversionHosts
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
        rhvConversionHosts={rhvConversionHosts}
        ospConversionHosts={ospConversionHosts}
      />
    );
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetComputeUrls: PropTypes.object,
  fetchTargetClustersAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool,
  isRejectedSourceClusters: PropTypes.bool,
  isRejectedTargetClusters: PropTypes.bool,
  targetProvider: PropTypes.string,
  rhvConversionHosts: PropTypes.array,
  ospConversionHosts: PropTypes.array
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersAction: noop,
  fetchTargetClustersAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true,
  isRejectedSourceClusters: false,
  isRejectedTargetClusters: false,
  targetProvider: '',
  rhvConversionHosts: [],
  ospConversionHosts: [],
  fetchSourceClustersUrl:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name' +
    '&filter[]=ext_management_system.emstype=vmwarews',
  fetchTargetComputeUrls: FETCH_TARGET_COMPUTE_URLS
};

export default reduxForm({
  form: 'mappingWizardClustersStep',
  destroyOnUnmount: false
})(MappingWizardClustersStep);
