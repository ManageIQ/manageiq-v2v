import React from 'react';
import PropTypes from 'prop-types';
import ModalWizard from '../../components/ModalWizard';
import componentRegistry from '../../../../../../components/componentRegistry';
import MappingWizardGeneralStep from '../MappingWizard/components/MappingWizardGeneralStep';

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

const MappingWizardBody = props => {
  const mappingWizardClustersStepContainer = componentRegistry.markup(
    'MappingWizardClustersStepContainer'
  );
  // This may not be required for Redux form
  // const mappingWizardGeneralStepContainer = componentRegistry.markup(
  //   'MappingWizardGeneralStepContainer'
  // );
  const renderMappingWizardGeneralStep = () => <MappingWizardGeneralStep />;
  return (
    <ModalWizard.Body
      {...props}
      loadingTitle={__('Loading Infrastructure Mappings...')}
      loadingMessage={__('This may take a minute.')}
      steps={[
        {
          title: __('General'),
          render: () => renderMappingWizardGeneralStep(), // mappingWizardGeneralStepContainer
          onClick: () => console.log('on step 1 click')
        },
        {
          title: __('Clusters'),
          render: () => mappingWizardClustersStepContainer,
          onClick: () => console.log('on step 2 click')
        },
        {
          title: __('Datastores'),
          render: () => todo('Datastore Mappings Form'),
          onClick: () => console.log('on step 3 click')
        },
        {
          title: __('Networks'),
          render: () => todo('Network Mappings Form'),
          onClick: () => console.log('on step 4 click')
        },
        {
          title: __('Results'),
          render: () => todo('Display Progress and Results'),
          onClick: () => console.log('on step 5 click')
        }
      ]}
    />
  );
};

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
