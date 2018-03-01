import { connect } from 'react-redux';

import MigrationsCompletedCard from './MigrationsCompletedCard';
import reducer from './MigrationsCompletedReducer';
import * as MigrationsCompletedActions from './MigrationsCompletedActions';

export const reducers = { migrationsCompleted: reducer };

const mapStateToProps = ({ migrationsCompleted }, ownProps) => ({
  ...migrationsCompleted,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MigrationsCompletedActions, mergeProps)(
  MigrationsCompletedCard
);
