import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'seamless-immutable';
import { Field, reduxForm } from 'redux-form';
import { length } from 'redux-form-validators';
import { Button } from 'patternfly-react';
import PlanWizardVMStepTable from './components/PlanWizardVMStepTable';
import CSVDropzoneField from './components/CSVDropzoneField';
import { getVmIds } from './helpers';
import { overwriteCsvConfirmModalProps } from '../../PlanWizardConstants';

export class PlanWizardVMStep extends React.Component {
  componentDidMount() {
    const {
      vm_choice_radio,
      editingPlan,
      shouldPrefillForEditing,
      queryPreselectedVmsAction,
      pristine,
      fetchTargetValidationDataAction,
      targetProviderType
    } = this.props;
    if (pristine && vm_choice_radio === 'vms_via_discovery') {
      this.validateVms([], null, { combineRequests: !!shouldPrefillForEditing });
      if (shouldPrefillForEditing) {
        const vmIds = getVmIds(editingPlan);
        queryPreselectedVmsAction(vmIds).then(({ value: { data: { results } } }) => {
          const vmNames = results.map(result => ({ name: result.name }));
          this.validateVms(vmNames, editingPlan.id, { combineRequests: true });
        });
      }
    }
    fetchTargetValidationDataAction(targetProviderType);
  }
  componentDidUpdate(prevProps) {
    const { vm_choice_radio } = this.props;
    if (vm_choice_radio !== prevProps.vm_choice_radio && vm_choice_radio === 'vms_via_discovery') {
      this.validateVms();
    }
  }
  onCSVParseSuccess = parsedRows => {
    const {
      infrastructure_mapping_id,
      validateVmsUrl,
      validateVmsAction,
      editingPlan,
      shouldPrefillForEditing
    } = this.props;
    // skip the header row
    parsedRows.shift();
    validateVmsAction(validateVmsUrl, infrastructure_mapping_id, parsedRows, shouldPrefillForEditing && editingPlan.id);
  };
  onCSVParseFailure = errMsg => {
    const { csvParseErrorAction } = this.props;
    csvParseErrorAction(errMsg);
  };
  validateVms = (vms = [], planId = null, meta = {}) => {
    const { infrastructure_mapping_id, validateVmsUrl, validateVmsAction } = this.props;
    validateVmsAction(validateVmsUrl, infrastructure_mapping_id, vms, planId, meta);
  };
  showOverwriteCsvConfirmModal = () => {
    const { csvImportAction, showConfirmModalAction, hideConfirmModalAction } = this.props;
    showConfirmModalAction({
      ...overwriteCsvConfirmModalProps,
      onConfirm: () => {
        hideConfirmModalAction();
        csvImportAction();
      }
    });
  };
  render() {
    const {
      vm_choice_radio,
      isValidatingVms,
      isRejectedValidatingVms,
      isCSVParseError,
      errorParsingCSV,
      valid_vms,
      invalid_vms,
      conflict_vms,
      validationServiceCalled,
      csvImportAction,
      shouldPrefillForEditing,
      editingPlan,
      isQueryingVms,
      formSelectedVms,
      pristine
    } = this.props;
    const discoveryMode = vm_choice_radio === 'vms_via_discovery';
    const preselectedVmIds = shouldPrefillForEditing ? getVmIds(editingPlan) : [];

    if (isRejectedValidatingVms && !isCSVParseError) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('Error Validating VMs')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Sorry, there was an error validating VMs. Please try again.')}
          </p>
        </div>
      );
    } else if (isRejectedValidatingVms && isCSVParseError) {
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-error-circle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('The selected file does not have the expected format.')}</h3>
          <h3 className="blank-slate-pf-main-action">{errorParsingCSV}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('See product documentation for the correct format of the .csv file')}
          </p>
          <div className="form-group">
            <Button bsStyle="primary" onClick={csvImportAction}>
              {__('Import')}
            </Button>
          </div>
        </div>
      );
    } else if ((isValidatingVms || !validationServiceCalled) && discoveryMode) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Discovering VMs')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Discovering VMs associated with the Infrastructure Mapping selected.')}
          </p>
        </div>
      );
    } else if (isValidatingVms && !discoveryMode) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Validating CSV Import')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Validating CSV VMs are associated with the Infrastructure Mapping selected.')}
          </p>
        </div>
      );
    } else if (!discoveryMode && valid_vms.length === 0 && invalid_vms.length === 0 && conflict_vms.length === 0) {
      return <CSVDropzoneField onCSVParseSuccess={this.onCSVParseSuccess} onCSVParseFailure={this.onCSVParseFailure} />;
    } else if (!isValidatingVms && validationServiceCalled && !(shouldPrefillForEditing && isQueryingVms)) {
      // set make rows editable so they can be selected
      const validVms = Immutable.asMutable(valid_vms, { deep: true });
      const inValidsVms = Immutable.asMutable(invalid_vms, { deep: true }).concat(
        validVms.filter(vm => vm.valid === false)
      );
      const conflictVms = Immutable.asMutable(conflict_vms, { deep: true });
      const combined = [...inValidsVms, ...conflictVms, ...validVms];
      if (combined.length) {
        let initialSelectedRows = formSelectedVms || [];
        if (pristine) {
          initialSelectedRows = discoveryMode
            ? preselectedVmIds
            : validVms.filter(vm => vm.valid === true).map(vm => vm.id);
        }
        const rowsWithSelections = combined.map(vm => ({
          ...vm,
          selected: initialSelectedRows.some(id => vm.id === id)
        }));
        return (
          <React.Fragment>
            <Field
              name="selectedVms"
              component={PlanWizardVMStepTable}
              rows={rowsWithSelections}
              initialSelectedRows={initialSelectedRows}
              onCsvImportAction={this.showOverwriteCsvConfirmModal}
              discoveryMode={discoveryMode}
              validate={[
                length({
                  min: 1,
                  msg: __('At least one VM needs to be selected to create the Migration Plan.')
                })
              ]}
            />
          </React.Fragment>
        );
      }
      // no vms found - show a warning
      return (
        <div className="wizard-pf-complete blank-slate-pf">
          <div className="wizard-pf-success-icon">
            <span className="pficon pficon-warning-triangle-o" />
          </div>
          <h3 className="blank-slate-pf-main-action">{__('No VMs were found.')}</h3>
          <p className="blank-slate-pf-secondary-action">
            {__('Sorry, no VMs were associated with this Infrastructure Mapping. Please try again.')}
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
  validateVmsUrl: PropTypes.string,
  validateVmsAction: PropTypes.func.isRequired,
  csvImportAction: PropTypes.func.isRequired,
  showConfirmModalAction: PropTypes.func.isRequired,
  hideConfirmModalAction: PropTypes.func.isRequired,
  csvParseErrorAction: PropTypes.func.isRequired,
  isValidatingVms: PropTypes.bool,
  isRejectedValidatingVms: PropTypes.bool,
  isCSVParseError: PropTypes.bool,
  errorParsingCSV: PropTypes.string,
  validationServiceCalled: PropTypes.bool,
  errorValidatingVms: PropTypes.string, // eslint-disable-line react/no-unused-prop-types
  valid_vms: PropTypes.array,
  invalid_vms: PropTypes.array,
  conflict_vms: PropTypes.array,
  editingPlan: PropTypes.object,
  shouldPrefillForEditing: PropTypes.bool,
  queryPreselectedVmsAction: PropTypes.func,
  isQueryingVms: PropTypes.bool,
  formSelectedVms: PropTypes.array,
  pristine: PropTypes.bool,
  targetProviderType: PropTypes.string,
  fetchTargetValidationDataAction: PropTypes.func.isRequired
};

PlanWizardVMStep.defaultProps = {
  vm_choice_radio: null,
  validateVmsUrl: '/api/transformation_mappings',
  isValidatingVms: false,
  isRejectedValidatingVms: false,
  isCSVParseError: false,
  errorParsingCSV: '',
  validationServiceCalled: false,
  errorValidatingVms: null,
  valid_vms: [],
  invalid_vms: [],
  conflict_vms: [],
  targetProviderType: null
};

export default reduxForm({
  form: 'planWizardVMStep',
  initialValues: { selectedVms: [] },
  destroyOnUnmount: false
})(PlanWizardVMStep);
