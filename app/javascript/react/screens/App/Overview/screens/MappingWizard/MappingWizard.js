import React from 'react';
import PropTypes from 'prop-types';
import {
  bindMethods,
  noop,
  Button,
  Icon,
  Modal,
  Wizard
} from 'patternfly-react';
import { createTransformationMappings } from './helpers';
import MappingWizardBody from './MappingWizardBody';

// TODO these could even be moved to properties on the wizard steps array,
// if we move the MappingWizardBody stuff into here.
const reduxFormKeys = ['mappingWizardGeneralStep', 'mappingWizardClustersStep'];

const MappingWizard = ({
  hideMappingWizard,
  hideMappingWizardAction,
  mappingWizardExitedAction,
  formContainer
}) => (
  <ModalWizard
    numSteps={5}
    showWizard={!hideMappingWizard}
    onHide={hideMappingWizardAction}
    onExited={mappingWizardExitedAction}
    title={__('Infrastructure Mapping Wizard')}
    shouldDisableNextStep={activeStepIndex =>
      formHasErrors(formContainer, reduxFormKeys[activeStepIndex])
    }
  >
    <MappingWizardBody loaded />
  </ModalWizard>
);
MappingWizard.propTypes = {
  hideMappingWizard: PropTypes.bool,
  hideMappingWizardAction: PropTypes.func,
  mappingWizardExitedAction: PropTypes.func,
  mappingWizardGeneralStep: PropTypes.object,
  mappingWizardClustersStep: PropTypes.object,
  mappingWizardDatastoresStep: PropTypes.object,
  mappingWizardNetworksStep: PropTypes.object,
  setTransformationsBodyAction: PropTypes.func,
  formContainer: PropTypes.object
};
MappingWizard.defaultProps = {
  hideMappingWizard: true,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop,
  mappingWizardGeneralStep: {},
  mappingWizardClustersStep: {},
  mappingWizardDatastoresStep: {},
  mappingWizardNetworksStep: {},
  setTransformationsBodyAction: noop,
  formContainer: {}
};
export default MappingWizard;
