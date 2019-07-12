import { connect } from 'react-redux';
import Settings from './Settings';
import reducer from './SettingsReducer';
import * as RouterActions from '../../../../redux/actions/routerActions';
import * as ProductFeaturesActions from '../../../../redux/common/productFeatures/productFeaturesActions';

export const reducers = { settings: reducer };

const mapStateToProps = ({ productFeatures: { productFeatures } }) => ({ productFeatures });

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  Object.assign(RouterActions, ProductFeaturesActions),
  mergeProps
)(Settings);
