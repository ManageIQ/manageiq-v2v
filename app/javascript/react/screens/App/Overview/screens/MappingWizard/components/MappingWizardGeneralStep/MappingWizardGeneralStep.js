import React from 'react';
import { Field } from 'redux-form';
import { required, length } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';
import {
  MAX_LENGTH_NAMES,
  MAX_LENGTH_DESCRIPTIONS,
  nameHelp,
  descriptionHelp,
  nameRequired,
  nameTooLong,
  descriptionTooLong
} from '../../../../../../../../common/constants'; // Oh my

const MappingWizardGeneralStep = props => (
  <Form className="form-horizontal">
    <Field
      name="name"
      label={__('Name')}
      required
      component={FormField}
      type="text"
      help={__(nameHelp)}
      validate={[
        required({
          msg: __(nameRequired)
        }),
        length({
          max: MAX_LENGTH_NAMES,
          msg: { tooLong: __(nameTooLong) }
        })
      ]}
    />
    <Field
      name="description"
      label={__('Description')}
      component={FormField}
      type="textarea"
      help={__(descriptionHelp)}
      validate={[
        length({
          max: MAX_LENGTH_DESCRIPTIONS,
          msg: { tooLong: __(descriptionTooLong) }
        })
      ]}
    />
  </Form>
);

export default MappingWizardGeneralStep;
