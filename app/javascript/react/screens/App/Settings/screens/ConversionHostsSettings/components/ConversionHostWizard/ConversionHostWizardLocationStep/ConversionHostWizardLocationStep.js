import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Spinner } from 'patternfly-react';

import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import { V2V_TARGET_PROVIDERS, RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import { FETCH_TARGET_COMPUTE_URLS } from '../../../../../../../../../redux/common/targetResources/targetResourcesConstants';

import { stepIDs } from '../ConversionHostWizardConstants';

class ConversionHostWizardLocationStep extends React.Component {
  componentDidUpdate(prevProps) {
    const { fetchTargetClustersAction, fetchTargetComputeUrls } = this.props;
    const prevDerivedProps = this.getDerivedProps(prevProps);
    const newDerivedProps = this.getDerivedProps();
    if (prevDerivedProps.selectedProviderType !== newDerivedProps.selectedProviderType) {
      fetchTargetClustersAction(fetchTargetComputeUrls[newDerivedProps.selectedProviderType]);
    }
  }

  getDerivedProps = (props = this.props) => {
    const { locationStepForm } = props;
    return {
      selectedProviderType: locationStepForm.values && locationStepForm.values.providerType,
      selectedProviderId: locationStepForm.values && locationStepForm.values.provider
    };
  };

  render() {
    const { providers, isFetchingTargetClusters, targetClusters } = this.props;
    const { selectedProviderType, selectedProviderId } = this.getDerivedProps();

    const availableProviderOptions = V2V_TARGET_PROVIDERS.filter(option =>
      providers.some(provider => provider.type === option.type)
    );
    const selectedProviderOption = availableProviderOptions.find(option => option.id === selectedProviderType);
    const providersFilteredBySelectedType =
      selectedProviderOption && providers.filter(provider => provider.type === selectedProviderOption.type);

    const targetComputeFilteredBySelectedProvider = targetClusters.filter(
      computeResource => computeResource.ems_id === selectedProviderId
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
            {selectedProviderType === RHV && (
              <Field
                {...selectFieldBaseProps}
                name="cluster"
                label={__('Cluster')}
                options={targetComputeFilteredBySelectedProvider}
                disabled={!selectedProviderId}
              />
            )}
            {selectedProviderType === OPENSTACK && (
              <Field
                {...selectFieldBaseProps}
                name="project"
                label={__('Project')}
                options={targetComputeFilteredBySelectedProvider}
                disabled={!selectedProviderId}
              />
            )}
          </Spinner>
        )}
      </Form>
    );
  }
}

ConversionHostWizardLocationStep.propTypes = {
  locationStepForm: PropTypes.object,
  providers: PropTypes.arrayOf(PropTypes.object),
  fetchTargetClustersAction: PropTypes.func,
  fetchTargetComputeUrls: PropTypes.object,
  isFetchingTargetClusters: PropTypes.bool,
  targetClusters: PropTypes.arrayOf(PropTypes.object)
};

ConversionHostWizardLocationStep.defaultProps = {
  locationStepForm: {},
  fetchTargetComputeUrls: FETCH_TARGET_COMPUTE_URLS
};

export default reduxForm({
  form: stepIDs.locationStep,
  destroyOnUnmount: false
})(ConversionHostWizardLocationStep);
