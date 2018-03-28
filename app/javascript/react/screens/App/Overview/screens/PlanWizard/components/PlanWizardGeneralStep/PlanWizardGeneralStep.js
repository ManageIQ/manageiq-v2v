import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import PropTypes from 'prop-types';
import { FormField } from '../../../../../common/forms/FormField';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';

const PlanWizardGeneralStep = ({ transformationMappings }) => (
  <Form className="form-horizontal">
    <Field
      name="infrastructure_mapping"
      label={__('Infrastructure Mapping')}
      required
      data_live_search="true"
      component={BootstrapSelect}
      validate={[required({ msg: __('Required') })]}
      options={transformationMappings}
      option_key="id"
      option_value="name"
      form_name="planWizardGeneralStep"
    />
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
    <Field
      name="vm_choice_radio"
      label={__('Select VMs')}
      component={FormField}
      type="radio"
      options={[
        {
          name: __('Import a CSV file with a list of VMs to be migrated'),
          id: 'vms_via_csv'
        },
        {
          name: __(
            'Choose from a list of VMs discovered in the selected infrastructure mapping'
          ),
          id: 'vms_via_discovery'
        }
      ]}
    />
  </Form>
);

PlanWizardGeneralStep.propTypes = {
  transformationMappings: PropTypes.array
};

export default reduxForm({
  form: 'planWizardGeneralStep',
  destroyOnUnmount: false
})(PlanWizardGeneralStep);
