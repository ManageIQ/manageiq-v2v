import { connect } from 'react-redux';

import Mappings from './Mappings';
import * as MappingsActions from './MappingsActions';
import * as RouterActions from '../../../../redux/actions/routerActions';
import reducer from './MappingsReducer';

export const reducers = { mappings: reducer, form: {} };

const mapStateToProps = ({ mappings }, ownProps) => ({
  ...mappings,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...ownProps.data,
  ...dispatchProps
});

export default connect(
  mapStateToProps,
  { ...MappingsActions, ...RouterActions },
  mergeProps
)(Mappings);
