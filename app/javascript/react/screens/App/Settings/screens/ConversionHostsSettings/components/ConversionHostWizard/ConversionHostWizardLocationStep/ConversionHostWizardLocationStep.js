import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, Spinner } from 'patternfly-react';

import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import { V2V_TARGET_PROVIDERS, RHV, OPENSTACK } from '../../../../../../../../../common/constants';

import { stepIDs, PROVIDER_TYPES } from '../ConversionHostWizardConstants';

class ConversionHostWizardLocationStep extends React.Component {
  componentDidMount() {
    const { fetchProvidersAction, fetchProvidersUrl } = this.props;
    fetchProvidersAction(fetchProvidersUrl);
  }

  componentDidUpdate(prevProps) {
    const prevDerivedProps = this.getDerivedProps(prevProps);
    const newDerivedProps = this.getDerivedProps();
    if (prevDerivedProps.selectedProviderType !== newDerivedProps.selectedProviderType) {
      // TODO fetch clusters or projects
    }
  }

  getDerivedProps = (props = this.props) => {
    const { locationStepForm } = props;
    return {
      selectedProviderType: locationStepForm.values && locationStepForm.values.providerType,
      selectedProvider: locationStepForm.values && locationStepForm.values.provider
    };
  };

  render() {
    const { isFetchingProviders, providers } = this.props;
    const { selectedProviderType, selectedProvider } = this.getDerivedProps();

    const providersFilteredByType = providers.filter(
      provider => provider.type === PROVIDER_TYPES[selectedProviderType]
    );

    const rhvClusters = []; // TODO
    const ospProjects = []; // TODO  --- CloudTenant === project?

    const selectFieldBaseProps = {
      component: BootstrapSelect,
      labelWidth: 2,
      controlWidth: 9,
      inline_label: true,
      required: true
    };

    return (
      <Form className="form-horizontal">
        <Spinner loading={isFetchingProviders}>
          <Field
            {...selectFieldBaseProps}
            name="providerType"
            label={__('Provider Type')}
            options={V2V_TARGET_PROVIDERS}
            option_key="id"
            option_value="name"
          />
          {selectedProviderType && (
            <Field
              {...selectFieldBaseProps}
              name="provider"
              label={__('Provider')}
              options={providersFilteredByType}
              option_key="id"
              option_value="name"
            />
          )}
          {selectedProviderType === RHV && (
            <Field
              {...selectFieldBaseProps}
              name="cluster"
              label={__('Cluster')}
              options={rhvClusters}
              option_key="id"
              option_value="name"
              disabled={!selectedProvider}
            />
          )}
          {selectedProviderType === OPENSTACK && (
            <Field
              {...selectFieldBaseProps}
              name="project"
              label={__('Project')}
              options={ospProjects}
              option_key="id"
              option_value="name"
              disabled={!selectedProvider}
            />
          )}
        </Spinner>
      </Form>
    );
  }
}

ConversionHostWizardLocationStep.propTypes = {
  locationStepForm: PropTypes.object,
  fetchProvidersUrl: PropTypes.string
};

ConversionHostWizardLocationStep.defaultProps = {
  locationStepForm: {},
  fetchProvidersUrl: '/api/providers?expand=resources'
};

export default reduxForm({
  form: stepIDs.locationStep,
  destroyOnUnmount: false
})(ConversionHostWizardLocationStep);
