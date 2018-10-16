import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import ModalWizard from '../../../common/ModalWizard';
import componentRegistry from '../../../../../../components/componentRegistry';

class MappingWizardBody extends React.Component {
  constructor(props) {
    super(props);

    this.mappingWizardGeneralStepContainer = componentRegistry.markup('MappingWizardGeneralStepContainer');
    this.mappingWizardClustersStepContainer = componentRegistry.markup('MappingWizardClustersStepContainer');
    this.mappingWizardDatastoresStepContainer = componentRegistry.markup('MappingWizardDatastoresStepContainer');
    this.mappingWizardNetworksStepContainer = componentRegistry.markup('MappingWizardNetworksStepContainer');
    this.mappingWizardResultsStepContainer = componentRegistry.markup('MappingWizardResultsStepContainer');
  }
  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
  componentWillUnmount() {
    const { hideAlertAction } = this.props;
    hideAlertAction();
  }
  render() {
    return (
      <ModalWizard.Body
        {...this.props}
        loadingTitle={__('Loading Infrastructure Mappings...')}
        loadingMessage={__('This may take a minute.')}
        stepButtonsDisabled
        steps={[
          {
            title: __('General'),
            render: () => this.mappingWizardGeneralStepContainer,
            disableGoto: !this.props.mappingWizardGeneralStep.values
          },
          {
            title: __('Map Compute'),
            render: () => this.mappingWizardClustersStepContainer,
            disableGoto: !this.props.mappingWizardClustersStep.values
          },
          {
            title: __('Map Storage'),
            render: () => this.mappingWizardDatastoresStepContainer,
            disableGoto: !this.props.mappingWizardDatastoresStep.values
          },
          {
            title: __('Map Networks'),
            render: () => this.mappingWizardNetworksStepContainer,
            disableGoto: !this.props.mappingWizardNetworksStep.values
          },
          {
            title: __('Results'),
            render: () => this.mappingWizardResultsStepContainer,
            disableGoto: true
          }
        ]}
      />
    );
  }
}

MappingWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string,
  goToStep: PropTypes.func,
  disableNextStep: PropTypes.bool,
  transformationsBody: PropTypes.object,
  mappingWizardGeneralStep: PropTypes.object,
  mappingWizardClustersStep: PropTypes.object,
  mappingWizardDatastoresStep: PropTypes.object,
  mappingWizardNetworksStep: PropTypes.object,
  hideAlertAction: PropTypes.func
};

MappingWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1',
  goToStep: noop,
  disableNextStep: true,
  transformationsBody: {},
  mappingWizardGeneralStep: {},
  mappingWizardClustersStep: {},
  mappingWizardDatastoresStep: {},
  mappingWizardNetworksStep: {},
  hideAlertAction: noop
};

export default MappingWizardBody;
