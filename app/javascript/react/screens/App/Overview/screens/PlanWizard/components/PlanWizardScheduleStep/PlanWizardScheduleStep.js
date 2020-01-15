import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Spinner, Form, Icon } from 'patternfly-react';
import { FormField } from '../../../../../common/forms/FormField';

export class PlanWizardScheduleStep extends React.Component {
  componentDidMount() {
    const {
      warmMigrationCompatibility: { isEveryVmCompatible, areConversionHostsConfigured },
      showAlertAction
    } = this.props;
    if (!isEveryVmCompatible) {
      showAlertAction({
        alertId: 'warmMigrationBadVms',
        alertText: (
          <span>
            <strong>{__('Warm migration not supported.')}</strong>{' '}
            {__('One or more selected VMs have disks with snapshots that cannot be pre-copied. See product documentation for more information.') /* prettier-ignore */}
          </span>
        ),
        alertType: 'info'
      });
    }
    if (!areConversionHostsConfigured) {
      showAlertAction({
        alertId: 'warmMigrationBadConversionHosts',
        alertText: (
          <span>
            <strong>{__('Warm migration not supported.')}</strong>{' '}
            {__('One or more selected VMs are mapped to a target cluster without a VDDK configured conversion host. See product documentation for more information.') /* prettier-ignore */}
          </span>
        ),
        alertType: 'info'
      });
    }
    // TODO if target isn't RHV, disallow warm migration and pop another alert
  }

  componentWillUnmount() {
    const { hideAlertAction } = this.props;
    hideAlertAction('warmMigrationBadVms');
    hideAlertAction('warmMigrationBadConversionHosts');
  }

  render() {
    const {
      targetProvider,
      migration_plan_type_radio,
      migration_plan_choice_radio,
      warmMigrationCompatibility: { isFetchingTargetValidationData, shouldEnableWarmMigration }
    } = this.props;
    return (
      <Spinner size="lg" loading={isFetchingTargetValidationData}>
        <Form className="form-vertical">
          <Field
            name="migration_plan_type_radio"
            component={FormField}
            type="radio"
            label={__('Migration Type')}
            inline_label={false}
            controlWidth={12}
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
  }
}

PlanWizardScheduleStep.propTypes = {
  targetProvider: PropTypes.string,
  migration_plan_type_radio: PropTypes.string,
  migration_plan_choice_radio: PropTypes.string,
  warmMigrationCompatibility: PropTypes.shape({
    isFetchingTargetValidationData: PropTypes.bool,
    isEveryVmCompatible: PropTypes.bool,
    areConversionHostsConfigured: PropTypes.bool,
    shouldEnableWarmMigration: PropTypes.bool
  }),
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func
};

export default reduxForm({
  form: 'planWizardScheduleStep',
  destroyOnUnmount: false
})(PlanWizardScheduleStep);
