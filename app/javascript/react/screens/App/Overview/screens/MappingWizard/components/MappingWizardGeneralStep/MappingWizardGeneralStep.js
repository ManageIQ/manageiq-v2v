import React from 'react';
import { Field } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';

const MappingWizardGeneralStep = props => (
  <Form className="form-horizontal">
    <Field
      name="name"
      label={__('Name')}
      required
      component={FormField}
      validate={[required({ msg: __('Required') })]}
      type="text"
    />
    <Field
      name="description"
      label={__('Description')}
      component={FormField}
      type="textarea"
    />
  </Form>
);

export default MappingWizardGeneralStep;
