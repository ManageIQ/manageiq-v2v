import { connect } from 'react-redux';
import ConversionHostWizard from './ConversionHostWizard';
import { conversionHostWizardFormFilter } from './ConversionHostWizardSelectors';

import * as SettingsActions from '../../../../SettingsActions';

const mapStateToProps = ({ form, settings: { conversionHostWizardVisible, isPostingConversionHosts } }, ownProps) => ({
  ...ownProps.data,
  forms: conversionHostWizardFormFilter(form),
  conversionHostWizardVisible,
  isPostingConversionHosts
});

const mergeProps = (stateProps, dispatchProps, ownProps) => Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(
  mapStateToProps,
  SettingsActions,
  mergeProps
)(ConversionHostWizard);
