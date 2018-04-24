import { connect } from 'react-redux';
import Plan from './Plan';
import * as PlanActions from './PlanActions';
import * as NotificationActions from '../common/NotificationList/NotificationListActions';

import reducer from './PlanReducer';

export const reducers = { plan: reducer, form: {} };

const mapStateToProps = ({ plan }, { data }) => {
  const {
    match: {
      params: { id: planId }
    }
  } = data;
  return {
    ...plan,
    ...data,
    planId
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(PlanActions, NotificationActions),
  mergeProps
)(Plan);
