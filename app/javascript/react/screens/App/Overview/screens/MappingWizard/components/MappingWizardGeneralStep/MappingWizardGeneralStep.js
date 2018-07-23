import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';

import { FormField } from '../../../../../common/forms/FormField';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { validation } from '../../../../../../../../common/constants';
import { V2V_TARGET_PROVIDERS } from '../../MappingWizardConstants';
import { asyncValidate, onChange } from '../helpers';

const MappingWizardGeneralStep = props => (
  <Form className="form-horizontal">
    <Field
      name="name"
      label={__('Name')}
      required
      component={FormField}
      type="text"
      help={validation.name.help}
      maxLength={validation.name.maxLength}
      maxLengthWarning={validation.name.maxLengthWarning}
      validate={[
        required({
          msg: validation.name.requiredMessage
        })
      ]}
    />
    <Field
      name="description"
      label={__('Description')}
      component={FormField}
      type="textarea"
      help={validation.description.help}
      maxLength={validation.description.maxLength}
      maxLengthWarning={validation.description.maxLengthWarning}
    />
    <Field
      name="targetProvider"
      label={__('Target Provider')}
      component={BootstrapSelect}
      options={V2V_TARGET_PROVIDERS}
      option_key="id"
      option_value="name"
      pre_selected_value={V2V_TARGET_PROVIDERS[0].id}
      labelWidth={2}
      controlWidth={9}
      inline_label
    />
  </Form>
);

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
export default reduxForm({
  form: 'mappingWizardGeneralStep', // a unique identifier for this form
  destroyOnUnmount: false, // preserve form data
  asyncValidate,
  asyncBlurFields: ['name'],
  onChange
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(MappingWizardGeneralStep);
