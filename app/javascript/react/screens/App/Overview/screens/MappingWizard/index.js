import { connect } from 'react-redux';
import MappingWizard from './MappingWizard';
import * as MappingWizardActions from './MappingWizardActions';
import { mappingWizardFormFilter } from './MappingWizardSelectors';

import reducer from './MappingWizardReducer';

export const reducers = { mappingWizard: reducer };

const mapStateToProps = (
  { mappings: { hideMappingWizard }, mappingWizard, form, mappingWizardGeneralStep: { editingMapping } },
  ownProps
) => {
  const selectedForms = mappingWizardFormFilter(form);
  return {
    ...mappingWizard,
    ...selectedForms,
    ...ownProps.data,
    hideMappingWizard,
    editingMapping
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardActions,
  mergeProps
)(MappingWizard);
