import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../components/ModalWizard';
import MappingWizardBody from './MappingWizardBody';

const MappingWizard = ({
  hideMappingWizard,
  hideMappingWizardAction,
  mappingWizardExitedAction
}) => (
  <ModalWizard.StateProvider numSteps={5}>
    <ModalWizard
      showWizard={!hideMappingWizard}
      onHide={hideMappingWizardAction}
      onExited={mappingWizardExitedAction}
      title={__('Infrastructure Mapping Wizard')}
    >
      <MappingWizardBody loaded />
    </ModalWizard>
  </ModalWizard.StateProvider>
);
MappingWizard.propTypes = {
  hideMappingWizard: PropTypes.bool,
  hideMappingWizardAction: PropTypes.func,
  mappingWizardExitedAction: PropTypes.func
};
MappingWizard.defaultProps = {
  hideMappingWizard: true,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop
};
export default MappingWizard;
