import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';

import { FormField } from '../../../../../../common/forms/FormField';
import { BootstrapSelect } from '../../../../../../common/forms/BootstrapSelect';
import { V2V_TARGET_PROVIDERS } from '../../../../../../../../../common/constants';

import { stepIDs } from '../ConversionHostWizardConstants';

export const ConversionHostWizardLocationStep = ({ locationStepForm }) => {
  const selectedProviderType = locationStepForm.values && locationStepForm.values.providerType;
  return (
    <Form className="form-horizontal">
      <Field
        name="providerType"
        label={__('Provider Type')}
        required
        component={BootstrapSelect}
        options={V2V_TARGET_PROVIDERS}
        option_key="id"
        option_value="name"
        labelWidth={2}
        controlWidth={9}
        inline_label
      />
      Selected: {selectedProviderType || 'none'}
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
