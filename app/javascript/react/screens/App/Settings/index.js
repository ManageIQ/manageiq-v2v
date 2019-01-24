import { connect } from 'react-redux';
import Settings from './Settings';
import reducer from './SettingsReducer';
import * as RouterActions from '../../../../redux/actions/routerActions';

export const reducers = { settings: reducer };

const mapStateToProps = () => ({});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  RouterActions,
  mergeProps
)(Settings);
