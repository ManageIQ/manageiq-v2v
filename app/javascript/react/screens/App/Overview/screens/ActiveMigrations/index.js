import { connect } from 'react-redux';

import ActiveMigrations from './ActiveMigrations';
import reducer from './ActiveMigrationsReducer';
import * as MigrationsActions from './ActiveMigrationsActions';

export const reducers = { activeMigrations: reducer };

const mapStateToProps = ({ activeMigrations }, ownProps) => ({
  ...activeMigrations,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, MigrationsActions, mergeProps)(
  ActiveMigrations
);
