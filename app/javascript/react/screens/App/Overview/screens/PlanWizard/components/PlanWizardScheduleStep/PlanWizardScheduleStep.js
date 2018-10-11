import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Icon } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';

const PlanWizardScheduleStep = ({ targetProvider, migration_plan_choice_radio }) => (
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
      help={
        targetProvider === 'openstack' && migration_plan_choice_radio === 'migration_plan_now' ? (
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <span style={{ fontSize: '24px' }}><Icon type="pf" name="warning-triangle-o" /></span>
            <span style={{ paddingLeft: 10 }}>
              {__('VMs must be powered on in order to migrate.')}
              <br />
              {__('Ensure that all VMs in the Migration Plan are powered on before selecting Create.')}
            </span>
          </div>
        ) : null
      }
    />
  </Form>
);

PlanWizardScheduleStep.propTypes = {
  targetProvider: PropTypes.string,
  migration_plan_choice_radio: PropTypes.string
};

export default reduxForm({
  form: 'planWizardScheduleStep',
  destroyOnUnmount: false
})(PlanWizardScheduleStep);
