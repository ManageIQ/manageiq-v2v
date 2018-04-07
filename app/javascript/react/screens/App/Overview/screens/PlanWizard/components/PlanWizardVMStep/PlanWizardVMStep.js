import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import PlanWizardVMStepTable from './components/PlanWizardVMStepTable';
import CSVDropzoneField from './components/CSVDropzoneField';

class PlanWizardVMStep extends React.Component {
  componentDidMount() {
    const {
      vm_choice_radio,
      infrastructure_mapping_id,
      validateVmsUrl,
      validateVmsAction
    } = this.props;
    if (vm_choice_radio === 'vms_via_discovery') {
      validateVmsAction(validateVmsUrl, infrastructure_mapping_id, []);
    }
  }
  render() {
    const { vm_choice_radio, isValidatingVms } = this.props;
    const discoveryMode = vm_choice_radio === 'vms_via_discovery';

    if (isValidatingVms && discoveryMode) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            {__('Discovering VMs')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__(
              'Discovering VMs associated with the Infrastructure Mapping selected.'
            )}
          </p>
        </div>
      );
    } else if (!isValidatingVms && discoveryMode) {
      const { valid_vms, invalid_vms, conflict_vms } = this.props;

      // set make rows editable so they can be selected
      const validVms = Immutable.asMutable(valid_vms, { deep: true });
      const inValidsVms = Immutable.asMutable(invalid_vms, { deep: true });
      const conflictVms = Immutable.asMutable(conflict_vms, { deep: true });

      const combined = [...inValidsVms, ...conflictVms, ...validVms];

      if (combined.length) {
        return <PlanWizardVMStepTable rows={combined} />;
      }
      // todo: sorry you have no VMs message...
    }

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
              length({
                min: 1,
                msg: __('At least one VM needs to be selected')
              })
            ]}
          />
        )}
      </div>
    );
  }
}

PlanWizardVMStep.propTypes = {
  vm_choice_radio: PropTypes.oneOf(['vms_via_csv', 'vms_via_discovery']),
  infrastructure_mapping_id: PropTypes.string.isRequired,
  validateVmsUrl: PropTypes.string.isRequired,
  validateVmsAction: PropTypes.func.isRequired,
  isValidatingVms: PropTypes.bool,
  isRejectedValidatingVms: PropTypes.bool,
  errorValidatingVms: PropTypes.string,
  valid_vms: PropTypes.array,
  invalid_vms: PropTypes.array,
  conflict_vms: PropTypes.array
};

PlanWizardVMStep.defaultProps = {
  vm_choice_radio: null,
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: []
};

export default reduxForm({
  form: 'planWizardVMStep',
  initialValues: { csvRows: [] },
  destroyOnUnmount: false
})(PlanWizardVMStep);
