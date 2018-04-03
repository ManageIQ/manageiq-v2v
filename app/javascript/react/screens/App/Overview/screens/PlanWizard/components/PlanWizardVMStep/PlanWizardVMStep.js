import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import CSVDropzoneField from './CSVDropzoneField';

const PlanWizardVMStep = props => {
  const discoveryMode = props.vm_choice_radio === 'vms_via_discovery';
  return (
    <div>
      <h2>{__('VMs to be Migrated')}</h2>
      {discoveryMode ? (
        <h3>TODO: Discovery Mode stuff</h3>
      ) : (
        <Field
          name="csvRows"
          component={CSVDropzoneField}
          columnNames={['name', 'provider', 'reference']}
          validate={[
            length({ min: 1, msg: __('At least one VM needs to be selected') })
          ]}
        />
      )}
    </div>
  );
};

PlanWizardVMStep.propTypes = {
  vm_choice_radio: PropTypes.oneOf(['vms_via_csv', 'vms_via_discovery'])
};

PlanWizardVMStep.defaultProps = {
  vm_choice_radio: null
};

export default reduxForm({
  form: 'planWizardVMStep',
  initialValues: { csvRows: [] },
  destroyOnUnmount: false
})(PlanWizardVMStep);
