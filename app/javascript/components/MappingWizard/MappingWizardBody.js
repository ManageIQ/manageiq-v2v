import React from 'react';
import PropTypes from 'prop-types';
import ModalWizard from '../ModalWizard';

// TODO remove these, they are space fillers
const t = str => (
  <div align="center">
    <h1>TODO: {str}!</h1>
  </div>
);
const todo = str => (
  <div>
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
  </div>
);

const MappingWizardBody = props => (
  <ModalWizard.Body
    {...props}
    loadingTitle="planWizard.loadingTitle"
    loadingMessage="planWizard.loadingMessage"
    steps={[
      {
        title: 'mappingWizard.general',
        render: () => todo('Name and Description Fields'),
        onClick: () => console.log('on step 1 click')
      },
      {
        title: 'mappingWizard.clusters',
        render: () => todo('Cluster Mappings Form'),
        onClick: () => console.log('on step 2 click')
      },
      {
        title: 'mappingWizard.datastores',
        render: () => todo('Datastore Mappings Form'),
        onClick: () => console.log('on step 3 click')
      },
      {
        title: 'mappingWizard.networks',
        render: () => todo('Network Mappings Form'),
        onClick: () => console.log('on step 4 click')
      },
      {
        title: 'mappingWizard.results',
        render: () => todo('Display Progress and Results'),
        onClick: () => console.log('on step 5 click')
      }
    ]}
  />
);

MappingWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string
};

MappingWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1'
};

export default MappingWizardBody;
