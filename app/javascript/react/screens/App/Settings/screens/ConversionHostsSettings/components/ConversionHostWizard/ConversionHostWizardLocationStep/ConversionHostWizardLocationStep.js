import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Spinner } from 'patternfly-react';

import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import { V2V_TARGET_PROVIDERS, RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import { FETCH_TARGET_COMPUTE_URLS } from '../../../../../../../../../redux/common/targetResources/targetResourcesConstants';

import { stepIDs } from '../ConversionHostWizardConstants';

export class ConversionHostWizardLocationStep extends React.Component {
  componentDidUpdate(prevProps) {
    const { fetchTargetClustersAction, fetchTargetComputeUrls, selectedProviderType } = this.props;
    if (prevProps.selectedProviderType !== selectedProviderType) {
      fetchTargetClustersAction(fetchTargetComputeUrls[selectedProviderType]);
    }
  }

  render() {
    const {
      providers,
      isFetchingTargetClusters,
      targetClusters,
      selectedProviderType,
      selectedProviderId,
      resetFormAction
    } = this.props;

    const availableProviderOptions = V2V_TARGET_PROVIDERS.filter(option =>
      providers.some(provider => provider.type === option.type)
    );
    const selectedProviderOption = availableProviderOptions.find(option => option.id === selectedProviderType);
    const providersFilteredBySelectedType =
      selectedProviderOption && providers.filter(provider => provider.type === selectedProviderOption.type);

    const targetClustersFilteredBySelectedProvider = targetClusters.filter(
      cluster => cluster.ems_id === selectedProviderId
    );

    const selectFieldBaseProps = {
      component: BootstrapSelect,
      labelWidth: 2,
      controlWidth: 9,
      inline_label: true,
      option_key: 'id',
      option_value: 'name',
      required: true,
      validate: [required()]
    };

    let clusterLabel = '';
    if (selectedProviderType === RHV) clusterLabel = __('Cluster');
    if (selectedProviderType === OPENSTACK) clusterLabel = __('Project');

    return (
      <Form className="form-horizontal">
        <Field
          {...selectFieldBaseProps}
          name="providerType"
          label={__('Provider Type')}
          options={availableProviderOptions}
        />
        {selectedProviderType && (
          <Spinner loading={isFetchingTargetClusters}>
            <Field
              {...selectFieldBaseProps}
              name="provider"
              label={__('Provider')}
              options={providersFilteredBySelectedType}
            />
            <Field
              {...selectFieldBaseProps}
              name="cluster"
              label={clusterLabel}
              options={targetClustersFilteredBySelectedProvider}
              disabled={!selectedProviderId}
              onChange={() => resetFormAction(stepIDs.hostsStep)}
            />
          </Spinner>
        )}
      </Form>
    );
  }
}

ConversionHostWizardLocationStep.propTypes = {
  selectedProviderType: PropTypes.string,
  selectedProviderId: PropTypes.string,
  providers: PropTypes.arrayOf(PropTypes.object),
  fetchTargetClustersAction: PropTypes.func,
  fetchTargetComputeUrls: PropTypes.object,
  isFetchingTargetClusters: PropTypes.bool,
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  resetFormAction: PropTypes.func
};

ConversionHostWizardLocationStep.defaultProps = {
  fetchTargetComputeUrls: FETCH_TARGET_COMPUTE_URLS
};

export default reduxForm({
  form: stepIDs.locationStep,
  destroyOnUnmount: false
})(ConversionHostWizardLocationStep);
