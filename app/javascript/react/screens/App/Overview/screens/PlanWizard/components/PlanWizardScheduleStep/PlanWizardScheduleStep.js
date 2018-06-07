import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';

const PlanWizardScheduleStep = () => (
  <Form className="form-horizontal">
    <Field
      name="migration_plan_choice_radio"
      label={__('Run migration plan')}
      component={FormField}
      type="radio"
      labelWidth="3"
      options={[
        {
          name: __('Save migration plan to run later'),
          id: 'migration_plan_later'
        },
        {
          name: __('Start migration immediately'),
          id: 'migration_plan_now'
        }
      ]}
    />
  </Form>
);

export default reduxForm({
  form: 'planWizardScheduleStep',
  destroyOnUnmount: false
})(PlanWizardScheduleStep);
