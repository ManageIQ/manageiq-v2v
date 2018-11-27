import React from 'react';
import PropTypes from 'prop-types';
import { Button, noop } from 'patternfly-react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';

import ClustersStepForm from './components/ClustersStepForm/ClustersStepForm';

import { OPENSTACK_CONVERSION_HOST_TYPE } from './MappingWizardClustersStepConstants';

class MappingWizardClustersStep extends React.Component {
  componentDidMount() {
    this.fetchClusters();
  }

  componentDidUpdate(prevProps) {
    const { targetProvider, conversionHosts, showAlertAction } = this.props;
    if (targetProvider === 'openstack' && !prevProps.conversionHosts && conversionHosts) {
      const openstackConversionHosts = conversionHosts.filter(
        host => host.resource.type === OPENSTACK_CONVERSION_HOST_TYPE
      );
      if (openstackConversionHosts.length === 0) {
        showAlertAction(
          __('At least one host must be enabled as a conversion host. You can continue to create an infrastructure mapping, but you must configure a conversion host before migration execution.'), // prettier-ignore
          'warning'
        );
      }
    }
  }

  componentWillUnmount() {
    this.props.hideAlertAction();
    this.props.clearConversionHostsAction();
  }

  fetchClusters = () => {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetComputeUrls,
      fetchTargetClustersAction,
      fetchConversionHostsUrl,
      fetchConversionHostsAction,
      targetProvider,
      queryHostsUrl,
      queryHostsAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetComputeUrls[targetProvider]).then(result => {
      if (
        targetProvider !== 'openstack' &&
        result.value &&
        result.value.data &&
        result.value.data.resources.length > 0
      ) {
        const hostIDsByClusterID = result.value.data.resources.reduce(
          (newObject, cluster) => ({
            ...newObject,
            [cluster.id]: cluster.hosts.map(host => host.id)
          }),
          {}
        );
        queryHostsAction(queryHostsUrl, hostIDsByClusterID);
      }
    });

    if (targetProvider === 'openstack') {
      fetchConversionHostsAction(fetchConversionHostsUrl);
    }
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
  fetchConversionHostsAction: PropTypes.func,
  fetchConversionHostsUrl: PropTypes.string,
  clearConversionHostsAction: PropTypes.func,
  queryHostsUrl: PropTypes.string,
  queryHostsAction: PropTypes.func,
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool,
  isRejectedSourceClusters: PropTypes.bool,
  isRejectedTargetClusters: PropTypes.bool,
  targetProvider: PropTypes.string,
  isFetchingHostsQuery: PropTypes.bool,
  isRejectedHostsQuery: PropTypes.bool,
  hostsByClusterID: PropTypes.object,
  conversionHosts: PropTypes.array
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersAction: noop,
  fetchTargetClustersAction: noop,
  queryHostsUrl: '/api/hosts?attributes=tags',
  queryHostsAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true,
  isRejectedSourceClusters: false,
  isRejectedTargetClusters: false,
  targetProvider: '',
  isFetchingHostsQuery: false,
  isRejectedHostsQuery: false,
  hostsByClusterID: {},
  conversionHosts: null,
  fetchSourceClustersUrl:
    '/api/clusters?expand=resources' +
    '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name' +
    '&filter[]=ext_management_system.emstype=vmwarews',
  fetchTargetComputeUrls: {
    rhevm:
      '/api/clusters?expand=resources' +
      '&attributes=ext_management_system.emstype,v_parent_datacenter,ext_management_system.name,hosts' +
      '&filter[]=ext_management_system.emstype=rhevm',
    openstack: '/api/cloud_tenants?expand=resources&attributes=ext_management_system.name,ext_management_system.id'
  },
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource&expand=resources'
};

export default reduxForm({
  form: 'mappingWizardClustersStep',
  destroyOnUnmount: false
})(MappingWizardClustersStep);
