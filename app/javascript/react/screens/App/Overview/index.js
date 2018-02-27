import { connect } from 'react-redux';
import Overview from './Overview';
import * as OverviewActions from './OverviewActions';

import reducer from './OverviewReducer';

export const reducers = { overview: reducer, form: {} };

const mapStateToProps = ({ overview }, ownProps) => ({
  ...overview,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, OverviewActions, mergeProps)(Overview);
