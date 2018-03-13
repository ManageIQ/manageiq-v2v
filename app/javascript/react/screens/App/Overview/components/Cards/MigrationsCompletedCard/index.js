import { connect } from 'react-redux';

import MigrationsCompletedCard from './MigrationsCompletedCard';
import reducer from './MigrationsCompletedReducer';
import * as MigrationsCompletedActions from './MigrationsCompletedActions';
import { migrationsCompletedOverviewFilter } from './MigrationsCompletedSelectors';

export const reducers = { migrationsCompleted: reducer };

const mapStateToProps = ({ migrationsCompleted, overview }, ownProps) => {
  const selectedOverview = migrationsCompletedOverviewFilter(overview);
  return {
    ...migrationsCompleted,
    ...selectedOverview,
    ...ownProps.data
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MigrationsCompletedActions, mergeProps)(
  MigrationsCompletedCard
);
