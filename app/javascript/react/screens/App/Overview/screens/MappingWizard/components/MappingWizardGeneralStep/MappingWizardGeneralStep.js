import React from 'react';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';
import { validation } from '../../../../../../../../common/constants'; // Oh my

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
  </Form>
);

export default MappingWizardGeneralStep;
