import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import CSVDropzoneField from './CSVDropzoneField';

// TODO: Warning on re-import (https://github.com/priley86/miq_v2v_ui_plugin/issues/34)

const PlanWizardCSVStep = () => (
  <div>
    <h2>VMs to be Migrated</h2>
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