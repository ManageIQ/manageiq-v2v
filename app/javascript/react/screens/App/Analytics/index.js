import { connect } from 'react-redux';
import Analytics from './Analytics';

export const reducers = {}; // TODO add analytics reducer

const mapStateToProps = () => ({}); // TODO pull analytics state from store

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  {}, // TODO add analytics actions
  mergeProps
)(Analytics);
