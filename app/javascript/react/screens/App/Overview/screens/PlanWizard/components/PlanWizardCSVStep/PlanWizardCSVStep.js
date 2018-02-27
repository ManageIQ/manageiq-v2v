import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import CSVDropzoneField from './CSVDropzoneField';

const PlanWizardCSVStep = () => (
  <div>
    <h2>{__('VMs to be Migrated')}</h2>
    <Field
      name="csvRows"
      component={CSVDropzoneField}
      columnNames={['id', 'name', 'path', 'ip', 'TODO']} // TODO
      validate={[
        length({ min: 1, msg: __('At least one VM needs to be selected') })
      ]}
    />
  </div>
);

export default reduxForm({
  form: 'planWizardCSVStep',
  initialValues: { csvRows: [] },
  destroyOnUnmount: false
})(PlanWizardCSVStep);
