import { connect } from 'react-redux';
import async from '../../../common/reactLoadable';

import * as MappingWizardActions from './MappingWizardActions';
import {
  mappingWizardOverviewFilter,
  mappingWizardFormFilter
} from './MappingWizardSelectors';

import reducer from './MappingWizardReducer';

const MappingWizard = async({
  loader: () =>
    import('./MappingWizard' /* webpackChunkName: 'mapping-wizard' */),
  modules: ['./MappingWizard'],
  webpack: () => [require.resolveWeak('./MappingWizard')]
});

export const reducers = { mappingWizard: reducer };

const mapStateToProps = ({ overview, mappingWizard, form }, ownProps) => {
  const selectedOverview = mappingWizardOverviewFilter(overview);
  const selectedForms = mappingWizardFormFilter(form);
  return {
    ...mappingWizard,
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
