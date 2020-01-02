import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Spinner, Form, Icon } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';

export const PlanWizardScheduleStep = ({
  targetProvider,
  migration_plan_type_radio,
  migration_plan_choice_radio,
  warmMigrationCompatibility: {
    isFetchingTargetValidationData,
    isEveryVmCompatible,
    areConversionHostsConfigured,
    shouldEnableWarmMigration
  }
}) => (
  <Spinner size="lg" loading={isFetchingTargetValidationData}>
    <Form className="form-vertical">
      <Field
        name="migration_plan_type_radio"
        component={FormField}
        type="radio"
        label={__('Migration Type')}
        inline_label={false}
        controlWidth={12}
        info={
          // vvvvvvvv
          // TODO make this message a toast, and introduce a second one for the case where VDDK conversion hosts are missing (see Vince's email for that messaging).
          console.log({ isEveryVmCompatible, areConversionHostsConfigured, shouldEnableWarmMigration }) ||
          shouldEnableWarmMigration
            ? null
            : __("Warm migration is not possible because one or more selected VMs has disks that can't be pre-copied.")
        }
        infoIconName="warning-triangle-o"
        options={[
          {
            id: 'migration_type_cold',
            name: __('Cold Migration - Source VMs are shut down while all of the VM data is migrated.')
          },
          {
            id: 'migration_type_warm',
            name: __('Warm Migration - VM data is iteratively pre-copied. A final, cutover migration is scheduled and run later.'), // prettier-ignore
            disabled: !shouldEnableWarmMigration
          }
        ]}
      />
      {migration_plan_type_radio === 'migration_type_cold' && (
        <Field
          name="migration_plan_choice_radio"
          component={FormField}
          type="radio"
          label={__('Schedule')}
          inline_label={false}
          style={{ paddingTop: '100px' }}
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
              <div className="plan-wizard-vm-power-warning">
                <Icon type="pf" name="warning-triangle-o" />
                <p>
                  {__('VMs must be powered on in order to migrate.')}
                  <br />
                  {__('Ensure that all VMs in the Migration Plan are powered on before selecting Create.')}
                </p>
              </div>
            ) : null
          }
        />
      )}
      {migration_plan_type_radio === 'migration_type_warm' && (
        <Form.HelpBlock style={{ paddingLeft: '22px', paddingTop: '100px' }}>
          {__('Pre-copying of the VM data will begin immediately after plan creation. You can schedule and run final cutover migration later.') /* prettier-ignore */}
        </Form.HelpBlock>
      )}
    </Form>
  </Spinner>
);

PlanWizardScheduleStep.propTypes = {
  targetProvider: PropTypes.string,
  migration_plan_type_radio: PropTypes.string,
  migration_plan_choice_radio: PropTypes.string,
  warmMigrationCompatibility: PropTypes.shape({
    isFetchingTargetValidationData: PropTypes.bool,
    isEveryVmCompatible: PropTypes.bool,
    areConversionHostsConfigured: PropTypes.bool,
    shouldEnableWarmMigration: PropTypes.bool
  })
};

export default reduxForm({
  form: 'planWizardScheduleStep',
  destroyOnUnmount: false
})(PlanWizardScheduleStep);
