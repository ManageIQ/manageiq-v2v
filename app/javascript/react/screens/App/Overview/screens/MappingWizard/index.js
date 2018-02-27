import { connect } from 'react-redux';
import MappingWizard from './MappingWizard';
import * as MappingWizardActions from './MappingWizardActions';
import {
  mappingWizardOverviewFilter,
  mappingWizardFormFilter
} from './MappingWizardSelectors';

const mapStateToProps = ({ overview, form }, ownProps) => {
  const selectedOverview = mappingWizardOverviewFilter(overview);
  const selectedForms = mappingWizardFormFilter(form);
  return {
    ...selectedOverview,
    ...selectedForms,
    ...ownProps.data
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MappingWizardActions, mergeProps)(
  MappingWizard
);
