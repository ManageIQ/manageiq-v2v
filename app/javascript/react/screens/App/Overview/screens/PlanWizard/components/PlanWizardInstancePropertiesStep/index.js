import { connect } from 'react-redux';

import PlanWizardInstancePropertiesStep from './PlanWizardInstancePropertiesStep';
import * as PlanWizardInstancePropertiesStepActions from './PlanWizardInstancePropertiesStepActions';
import reducer from './PlanWizardInstancePropertiesStepReducer';
import { getVMStepSelectedVms } from '../PlanWizardAdvancedOptionsStep/helpers';

export const reducers = { planWizardInstancePropertiesStep: reducer };

const mapStateToProps = (
  {
    overview: { transformationMappings },
    planWizardInstancePropertiesStep,
    planWizardVMStep,
    form: {
      planWizardGeneralStep: {
        values: { vm_choice_radio, infrastructure_mapping }
      },
      planWizardVMStep: {
        values: { selectedVms }
      },
      planWizardInstancePropertiesStep: instancePropertiesStepForm
    }
  },
  ownProps
) => {
  const allVms =
    vm_choice_radio === 'vms_via_csv'
      ? [...planWizardVMStep.valid_vms, ...planWizardVMStep.invalid_vms, ...planWizardVMStep.conflict_vms]
      : planWizardVMStep.valid_vms;
  const selectedMapping =
    transformationMappings &&
    infrastructure_mapping &&
    transformationMappings.find(mapping => mapping.id === infrastructure_mapping);
  return {
    ...planWizardInstancePropertiesStep,
    ...ownProps.data,
    instancePropertiesStepForm,
    vmStepSelectedVms: getVMStepSelectedVms(allVms, selectedVms).map(vm => ({
      ...vm,
      osp_security_group: {},
      osp_flavor: {}
    })),
    selectedMapping
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps.data,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  PlanWizardInstancePropertiesStepActions,
  mergeProps
)(PlanWizardInstancePropertiesStep);
