import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods, noop } from 'patternfly-react';
import { createTransformationMappings } from './helpers';
import ModalWizard from '../../components/ModalWizard';
import MappingWizardGeneralStep from '../MappingWizard/components/MappingWizardGeneralStep';
import componentRegistry from '../../../../../../components/componentRegistry';

class MappingWizard extends React.Component {
  constructor(props) {
    super(props);
    const register = (context, component) => {
      const name = `${component[0].toLowerCase()}${component.substring(1)}`;
      context[name] = componentRegistry.markup(component);
    };
    register(this, 'MappingWizardClustersStepContainer');
    register(this, 'MappingWizardDatastoresStepContainer');
    register(this, 'MappingWizardNetworksStepContainer');
    register(this, 'MappingWizardResultsStepContainer');
    bindMethods(this, ['createMappings']);
  }

  createMappings() {
    const {
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep,
      setTransformationsBodyAction
    } = this.props;
    const transformationsBody = createTransformationMappings(
      mappingWizardGeneralStep,
      mappingWizardClustersStep,
      mappingWizardDatastoresStep,
      mappingWizardNetworksStep
    );
    setTransformationsBodyAction(transformationsBody);
  }

  render() {
    const {
      hideMappingWizard,
      hideMappingWizardAction,
      mappingWizardExitedAction
    } = this.props;

    const wizardSteps = [
      {
        title: __('General'),
        render: () => <MappingWizardGeneralStep />,
        reduxFormKey: 'mappingWizardGeneralStep'
      },
      {
        title: __('Clusters'),
        render: () => this.mappingWizardClustersStepContainer,
        reduxFormKey: 'mappingWizardClustersStep'
      },
      {
        title: __('Datastores'),
        render: () => this.mappingWizardDatastoresStepContainer,
        reduxFormKey: 'mappingWizardDatastoresStep'
      },
      {
        title: __('Networks'),
        render: () => this.mappingWizardNetworksStepContainer,
        reduxFormKey: 'mappingWizardNetworksStep',
        onNext: this.createMappings
      },
      {
        title: __('Results'),
        render: () => this.mappingWizardResultsStepContainer,
        reduxFormKey: 'mappingWizardResultsStep'
      }
    ];

    return (
      <ModalWizard
        numSteps={5}
        showWizard={!hideMappingWizard}
        onHide={hideMappingWizardAction}
        onExited={mappingWizardExitedAction}
        title={__('Infrastructure Mapping Wizard')}
        shouldDisableNextStep={activeStepIndex => {
          const form = this.props[wizardSteps[activeStepIndex].reduxFormKey];
          return form && !!form.syncErrors;
        }}
        steps={wizardSteps}
        loadingTitle={__('Loading Infrastructure Mappings...')}
        loadingMessage={__('This may take a minute.')}
        loaded // TODO either remove these 3 props or set loaded to actual loading state
      />
    );
  }
}

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
