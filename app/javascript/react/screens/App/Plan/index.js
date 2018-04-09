import { connect } from 'react-redux';
import Plan from './Plan';
import * as PlanActions from './PlanActions';

import reducer from './PlanReducer';

export const reducers = { plan: reducer, form: {} };

const mapStateToProps = ({ plan }, ownProps) => ({
  ...plan,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, PlanActions, mergeProps)(Plan);
