import { connect } from 'react-redux';
import RetryConversionHostConfirmationModal from './RetryConversionHostConfirmationModal';

import {
  hideConversionHostRetryModalAction,
  conversionHostRetryModalExitedAction,
  postConversionHostsAction
} from '../../../../SettingsActions';

const mapStateToProps = (
  {
    form: { retryConversionHost },
    settings: { conversionHostRetryModalVisible, conversionHostTaskToRetry, isPostingConversionHosts }
  },
  ownProps
) => ({
  retryForm: retryConversionHost,
  show: conversionHostRetryModalVisible,
  conversionHostTaskToRetry,
  isPostingConversionHosts,
  ...ownProps
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  {
    hideConversionHostRetryModalAction,
    conversionHostRetryModalExitedAction,
    postConversionHostsAction
  },
  mergeProps
)(RetryConversionHostConfirmationModal);
