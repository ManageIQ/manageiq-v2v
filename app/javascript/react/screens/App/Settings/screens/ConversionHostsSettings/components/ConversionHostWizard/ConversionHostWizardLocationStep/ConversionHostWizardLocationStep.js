import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';

import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import { V2V_TARGET_PROVIDERS, RHV, OPENSTACK } from '../../../../../../../../../common/constants';

import { stepIDs, PROVIDER_TYPES } from '../ConversionHostWizardConstants';

export const ConversionHostWizardLocationStep = ({ locationStepForm }) => {
  const selectedProviderType = locationStepForm.values && locationStepForm.values.providerType;
  const selectedProvider = locationStepForm.values && locationStepForm.values.provider;

  const providers = []; // TODO /api/providers filtered by PROVIDER_TYPES?
  const rhvClusters = []; // TODO
  const ospProjects = []; // TODO

  const selectFieldBaseProps = {
    component: BootstrapSelect,
    labelWidth: 2,
    controlWidth: 9,
    inline_label: true,
    required: true
  };

  return (
    <Form className="form-horizontal">
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
          options={providers}
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
    </Form>
  );
};

ConversionHostWizardLocationStep.propTypes = {
  locationStepForm: PropTypes.object
};

ConversionHostWizardLocationStep.defaultProps = {
  locationStepForm: {}
};

export default reduxForm({
  form: stepIDs.locationStep,
  destroyOnUnmount: false
})(ConversionHostWizardLocationStep);
