import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import PlanWizardVMStepTable from './components/PlanWizardVMStepTable';
import CSVDropzoneField from './components/CSVDropzoneField';

class PlanWizardVMStep extends React.Component {
  componentDidMount() {
    const { vm_choice_radio } = this.props;
    if (vm_choice_radio === 'vms_via_discovery') {
      this.validateVms();
    }
  }
  componentDidUpdate(prevProps) {
    const { vm_choice_radio } = this.props;
    if (
      vm_choice_radio !== prevProps.vm_choice_radio &&
      vm_choice_radio === 'vms_via_discovery'
    ) {
      this.validateVms();
    }
  }
  onCSVParseSuccess = parsedRows => {
    const {
      infrastructure_mapping_id,
      validateVmsUrl,
      validateVmsAction
    } = this.props;
    validateVmsAction(validateVmsUrl, infrastructure_mapping_id, parsedRows);
  };
  validateVms = () => {
    const {
      infrastructure_mapping_id,
      validateVmsUrl,
      validateVmsAction
    } = this.props;
    validateVmsAction(validateVmsUrl, infrastructure_mapping_id, []);
  };
  render() {
    const {
      vm_choice_radio,
      isValidatingVms,
      isRejectedValidatingVms,
      valid_vms,
      invalid_vms,
      conflict_vms,
      validationServiceCalled,
      csvImportAction
    } = this.props;
    const discoveryMode = vm_choice_radio === 'vms_via_discovery';

    if (isRejectedValidatingVms) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {__('Error Validating VMs')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Sorry, there was an error validating VMs. Please try again.')}
          </p>
        </div>
      );
    } else if ((isValidatingVms || !validationServiceCalled) && discoveryMode) {
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
    } else if (isValidatingVms && !discoveryMode) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">
            {__('Validating CSV Import')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__(
              'Validating CSV VMs are associated with the Infrastructure Mapping selected.'
            )}
          </p>
        </div>
      );
    } else if (
      !discoveryMode &&
      (valid_vms.length === 0 &&
        invalid_vms.length === 0 &&
        conflict_vms.length === 0)
    ) {
      return (
        <div>
          <h2>{__('VMs to be Migrated')}</h2>
          <CSVDropzoneField
            columnNames={['name', 'host', 'provider']}
            onCSVParseSuccess={this.onCSVParseSuccess}
          />
        </div>
      );
    } else if (!isValidatingVms && validationServiceCalled) {
      // set make rows editable so they can be selected
      const validVms = Immutable.asMutable(valid_vms, { deep: true });
      const inValidsVms = Immutable.asMutable(invalid_vms, { deep: true });
      const conflictVms = Immutable.asMutable(conflict_vms, { deep: true });
      const combined = [...inValidsVms, ...conflictVms, ...validVms];

      if (combined.length) {
        return (
          <Field
            name="selectedVms"
            component={PlanWizardVMStepTable}
            rows={combined}
            onCsvImportAction={csvImportAction}
            discoveryMode={discoveryMode}
            validate={[
              length({
                min: 1,
                msg: __(
                  'At least one VM needs to be selected to create the Migration Plan.'
                )
              })
            ]}
          />
        );
      }
      // no vms found - show a warning
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-warning-triangle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">
            {__('No VMs were found.')}
          </h3>
          <p className="blank-slate-pf-secondary-action">
            {__(
              'Sorry, no VMs were associated with this Infrastructure Mapping. Please try again.'
            )}
          </p>
        </div>
      );
    }
    return null;
  }
}

PlanWizardVMStep.propTypes = {
  vm_choice_radio: PropTypes.oneOf(['vms_via_csv', 'vms_via_discovery']),
  infrastructure_mapping_id: PropTypes.string.isRequired,
  validateVmsUrl: PropTypes.string.isRequired,
  validateVmsAction: PropTypes.func.isRequired,
  csvImportAction: PropTypes.func.isRequired,
  isValidatingVms: PropTypes.bool,
  isRejectedValidatingVms: PropTypes.bool,
  validationServiceCalled: PropTypes.bool,
  errorValidatingVms: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  valid_vms: PropTypes.array,
  invalid_vms: PropTypes.array,
  conflict_vms: PropTypes.array
};

PlanWizardVMStep.defaultProps = {
  vm_choice_radio: null,
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: []
};

export default reduxForm({
  form: 'planWizardVMStep',
  initialValues: { selectedVms: [] },
  destroyOnUnmount: false
})(PlanWizardVMStep);
