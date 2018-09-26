import { connect } from 'react-redux';
import MappingWizard from './MappingWizard';
import * as MappingWizardActions from './MappingWizardActions';
import { mappingWizardOverviewFilter, mappingWizardFormFilter } from './MappingWizardSelectors';

import reducer from './MappingWizardReducer';

export const reducers = { mappingWizard: reducer };

const mapStateToProps = ({ overview, mappingWizard, form, mappingWizardGeneralStep: { editingMapping } }, ownProps) => {
  const selectedOverview = mappingWizardOverviewFilter(overview);
  const selectedForms = mappingWizardFormFilter(form);
  return {
    ...mappingWizard,
    ...selectedOverview,
    ...selectedForms,
    ...ownProps.data,
    editingMapping
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  MappingWizardActions,
  mergeProps
)(MappingWizard);
