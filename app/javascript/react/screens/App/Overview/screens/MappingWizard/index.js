import { connect } from 'react-redux';
import MappingWizard from './MappingWizard';
import * as MappingWizardActions from './MappingWizardActions';
import { mappingWizardFilter } from './MappingWizardSelectors';

const mapStateToProps = ({ overview }, ownProps) => {
  const selected = mappingWizardFilter(overview);
  return {
    ...selected,
    ...ownProps.data
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MappingWizardActions, mergeProps)(
  MappingWizard
);
