import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Spinner } from 'patternfly-react';

import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import {
  V2V_TARGET_PROVIDERS,
  RHV,
  OPENSTACK,
  FETCH_TARGET_COMPUTE_URLS
} from '../../../../../../../../../common/constants';

import { stepIDs, PROVIDER_TYPES } from '../ConversionHostWizardConstants';

class ConversionHostWizardLocationStep extends React.Component {
  componentDidMount() {
    const { fetchProvidersAction, fetchProvidersUrl } = this.props;
    fetchProvidersAction(fetchProvidersUrl);
  }

  componentDidUpdate(prevProps) {
    const { fetchTargetComputeResourcesAction, fetchTargetComputeUrls } = this.props;
    const prevDerivedProps = this.getDerivedProps(prevProps);
    const newDerivedProps = this.getDerivedProps();
    if (prevDerivedProps.selectedProviderType !== newDerivedProps.selectedProviderType) {
      fetchTargetComputeResourcesAction(fetchTargetComputeUrls[newDerivedProps.selectedProviderType]);
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
    const { isFetchingProviders, providers, isFetchingTargetComputeResources, targetComputeResources } = this.props;
    const { selectedProviderType, selectedProviderId } = this.getDerivedProps();

    const providersFilteredBySelectedType = providers.filter(
      provider => provider.type === PROVIDER_TYPES[selectedProviderType]
    );

    const targetComputeFilteredBySelectedProvider = targetComputeResources.filter(
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
        <Spinner loading={isFetchingProviders}>
          <Field
            {...selectFieldBaseProps}
            name="providerType"
            label={__('Provider Type')}
            options={V2V_TARGET_PROVIDERS}
          />
          {selectedProviderType && (
            <Spinner loading={isFetchingTargetComputeResources}>
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
        </Spinner>
      </Form>
    );
  }
}

ConversionHostWizardLocationStep.propTypes = {
  locationStepForm: PropTypes.object,
  fetchProvidersAction: PropTypes.func,
  fetchProvidersUrl: PropTypes.string,
  isFetchingProviders: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.object),
  fetchTargetComputeResourcesAction: PropTypes.func,
  fetchTargetComputeUrls: PropTypes.object,
  isFetchingTargetComputeResources: PropTypes.bool,
  targetComputeResources: PropTypes.arrayOf(PropTypes.object)
};

ConversionHostWizardLocationStep.defaultProps = {
  locationStepForm: {},
  fetchProvidersUrl: '/api/providers?expand=resources',
  fetchTargetComputeUrls: FETCH_TARGET_COMPUTE_URLS
};

export default reduxForm({
  form: stepIDs.locationStep,
  destroyOnUnmount: false
})(ConversionHostWizardLocationStep);
