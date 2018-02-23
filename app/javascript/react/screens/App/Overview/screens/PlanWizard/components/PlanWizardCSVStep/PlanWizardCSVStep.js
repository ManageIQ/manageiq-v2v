import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import CSVDropzoneField from './CSVDropzoneField';

const PlanWizardCSVStep = () => (
  <div>
    <h2>{__('VMs to be Migrated')}</h2>
    <Field
      name="csvRows"
      component={CSVDropzoneField}
      required
      validate={[required({ msg: __('Required') })]}
    />
  </div>
);

export default reduxForm({
  form: 'planWizardCSVStep',
  initialValues: { csvRows: [] },
  destroyOnUnmount: false
})(PlanWizardCSVStep);
