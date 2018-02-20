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

class MappingWizardBody extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return (
      JSON.stringify(this.props) !== JSON.stringify(nextProps) ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }
  render() {
    const mappingWizardClustersStepContainer = componentRegistry.markup(
      'MappingWizardClustersStepContainer'
    );
    const mappingWizardDatastoresStepContainer = componentRegistry.markup(
      'MappingWizardDatastoresStepContainer'
    );
    const mappingWizardNetworksStepContainer = componentRegistry.markup(
      'MappingWizardNetworksStepContainer'
    );
    return (
      <ModalWizard.Body
        {...this.props}
        loadingTitle={__('Loading Infrastructure Mappings...')}
        loadingMessage={__('This may take a minute.')}
        steps={[
          {
            title: __('General'),
            render: () => <MappingWizardGeneralStep />,
            onClick: () => console.log('on step 1 click')
          },
          {
            title: __('Clusters'),
            render: () => mappingWizardClustersStepContainer,
            onClick: () => console.log('on step 2 click')
          },
          {
            title: __('Datastores'),
            render: () => mappingWizardDatastoresStepContainer,
            onClick: () => console.log('on step 3 click')
          },
          {
            title: __('Networks'),
            render: () => mappingWizardNetworksStepContainer,
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
  }
}

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
