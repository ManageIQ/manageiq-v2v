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

const MappingWizard = ({
  hideMappingWizard,
  hideMappingWizardAction,
  mappingWizardExitedAction
}) => (
  <ModalWizard
    numSteps={5}
    showWizard={!hideMappingWizard}
    onHide={hideMappingWizardAction}
    onExited={mappingWizardExitedAction}
    title={__('Infrastructure Mapping Wizard')}
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
  setTransformationsBodyAction: PropTypes.func
};
MappingWizard.defaultProps = {
  hideMappingWizard: true,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop,
  mappingWizardGeneralStep: {},
  mappingWizardClustersStep: {},
  mappingWizardDatastoresStep: {},
  mappingWizardNetworksStep: {},
  setTransformationsBodyAction: noop
};
export default MappingWizard;
