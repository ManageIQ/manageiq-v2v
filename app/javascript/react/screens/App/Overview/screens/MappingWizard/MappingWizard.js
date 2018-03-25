import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { lifecycle } from 'recompose';
import { noop, WizardPattern, Icon, Alert } from 'patternfly-react';
import {
  createTransformationMappings,
  getMappedSourceClusters,
  getSourceClustersWithMappings
} from './helpers';
import componentRegistry from '../../../../../../components/componentRegistry';
import MappingWizardGeneralStep from './components/MappingWizardGeneralStep';
import ConfirmModal from '../../../common/ConfirmModal';

const MappingWizard = ({
  hideMappingWizard,
  warningModalVisible,
  sourceClustersWithoutMappings,
  alertText,
  alertType,
  hideMappingWizardAction,
  mappingWizardExitedAction,
  showAlertAction,
  hideAlertAction,
  showWarningModalAction,
  hideWarningModalAction,
  setTransformationsBodyAction,
  forms,
  transformationsBody
}) => {
  const {
    mappingWizardGeneralStep,
    mappingWizardClustersStep,
    mappingWizardDatastoresStep,
    mappingWizardNetworksStep
  } = forms;

  let nextButton; // Ref for clicking programmatically in ConfirmDialog.

  const formHasErrors = reduxFormName =>
    forms[reduxFormName] && !!forms[reduxFormName].syncErrors;

  const mappingWizardClustersStepContainer = componentRegistry.markup(
    'MappingWizardClustersStepContainer'
  );
  const mappingWizardDatastoresStepContainer = componentRegistry.markup(
    'MappingWizardDatastoresStepContainer'
  );
  const mappingWizardNetworksStepContainer = componentRegistry.markup(
    'MappingWizardNetworksStepContainer'
  );
  const mappingWizardResultsStepContainer = componentRegistry.markup(
    'MappingWizardResultsStepContainer'
  );

  const getSourceClustersWithoutMappings = mappings =>
    mappings &&
    mappingWizardClustersStep &&
    mappingWizardClustersStep.values &&
    getMappedSourceClusters(
      mappingWizardClustersStep.values.clusterMappings
    ).filter(
      sourceCluster =>
        !getSourceClustersWithMappings(mappings.values).includes(
          sourceCluster.id
        )
    );

  const sourceClustersWithoutDatastoresMappings = getSourceClustersWithoutMappings(
    mappingWizardDatastoresStep
  );

  const sourceClustersWithoutNetworksMappings = getSourceClustersWithoutMappings(
    mappingWizardNetworksStep
  );

  const datastoresWarning =
    sourceClustersWithoutDatastoresMappings &&
    sourceClustersWithoutDatastoresMappings.length > 0;

  const warningTitle = datastoresWarning
    ? __('Unmapped Datastores')
    : __('Unmappped Networks');
  const warningMessage = datastoresWarning
    ? __('The following source clusters have no mapped datastores:')
    : __('The following source clusters have no mapped networks:');
  const warningConfirmText = transformationsBody
    ? __('Close')
    : sourceClustersWithoutDatastoresMappings.length > 0
      ? __('Continue')
      : __('Create');

  const onLeaveGeneralStep = () => {
    if (mappingWizardGeneralStep.asyncErrors) {
      showAlertAction(
        sprintf(
          __('Infrastructure mapping %s already exists'),
          mappingWizardGeneralStep.values.name
        )
      );
      return false; // Refuse to leave the step if the mapping name is taken.
    }
    hideAlertAction();
    return true;
  };

  const onLeaveDatastoresStep = () => {
    if (warningModalVisible) {
      return false; // Refuse to leave the step if you have existing warnings.
      // TODO FIXME: this is inconsistent with onLeaveNetworksStep-- but that's how it worked before. check about continue button here?
    }
    if (sourceClustersWithoutDatastoresMappings.length > 0) {
      showWarningModalAction(sourceClustersWithoutDatastoresMappings);
      return false; // Refuse to leave the step if you have new warnings.
    }
    return true;
  };

  const onLeaveNetworksStep = () => {
    if (!warningModalVisible) {
      if (sourceClustersWithoutNetworksMappings.length > 0) {
        showWarningModalAction(sourceClustersWithoutNetworksMappings);
        return false; // Refuse to leave the step if you have new warnings.
      }
      // Otherwise, assume we are clicking the Continue button in the warning.
    }
    // Good to go, create the mappings in the API.
    setTransformationsBodyAction(
      createTransformationMappings(
        mappingWizardGeneralStep,
        mappingWizardClustersStep,
        mappingWizardDatastoresStep,
        mappingWizardNetworksStep
      )
    );
    return true;
  };

  const onConfirmWarning = () => {
    if (transformationsBody) {
      hideWarningModalAction();
    } else {
      nextButton.click();
    }
  };

  const onHideWizard = onFinalStep => {
    hideAlertAction();
    hideMappingWizardAction(onFinalStep);
  };

  const alertClasses = cx('modal-wizard-alert--alert', {
    'is-visible': alertText
  });

  return (
    <WizardPattern.Stateful
      show={!hideMappingWizard}
      title={__('Infrastructure Mapping Wizard')}
      steps={[
        {
          title: __('General'),
          render: () => <MappingWizardGeneralStep />,
          isInvalid: formHasErrors('mappingWizardGeneralStep'),
          onNext: onLeaveGeneralStep
        },
        {
          title: __('Clusters'),
          render: () => mappingWizardClustersStepContainer,
          isInvalid: formHasErrors('mappingWizardClustersStep')
        },
        {
          title: __('Datastores'),
          render: () => mappingWizardDatastoresStepContainer,
          isInvalid: formHasErrors('mappingWizardDatastoresStep'),
          onNext: onLeaveDatastoresStep
        },
        {
          title: __('Networks'),
          render: () => mappingWizardNetworksStepContainer,
          isInvalid: formHasErrors('mappingWizardNetworksStep'),
          onNext: onLeaveNetworksStep
        },
        {
          title: __('Results'),
          render: () => mappingWizardResultsStepContainer,
          isInvalid: formHasErrors('mappingWizardResultsStep'),
          preventExit: true // API requests are sent in this step with data from previous steps, so no going back.
          // Note, the above property does not prevent exiting the wizard, only the step (entering another step).
        }
      ]}
      onHide={onHideWizard}
      onExited={mappingWizardExitedAction} // This entire-wizard exit has nothing to do with steps[].preventExit.
      onNext={hideWarningModalAction} // Gets called in addition to the individual steps[].onNext functions.
      nextButtonRef={ref => (nextButton = ref)}
      bodyHeader={
        alertType && (
          <div className="modal-wizard-alert">
            <Alert
              className={alertClasses}
              type={alertType}
              onDismiss={hideAlertAction}
            >
              {alertText}
            </Alert>
          </div>
        )
      }
      stepButtonsDisabled
    >
      <ConfirmModal
        show={warningModalVisible}
        title={warningTitle}
        icon={
          <Icon
            type="pf"
            name="warning-triangle-o"
            className="confirm-warning-icon"
          />
        }
        className="inner-modal-dialog"
        backdropClassName="inner-modal-backdrop"
        body={
          <React.Fragment>
            <h3>{warningMessage}</h3>
            <ul>
              {sourceClustersWithoutMappings &&
                sourceClustersWithoutMappings.map(sourceCluster => (
                  <li key={sourceCluster.id}>{sourceCluster.name}</li>
                ))}
            </ul>
          </React.Fragment>
        }
        cancelButtonLabel={__('Cancel')}
        confirmButtonLabel={warningConfirmText}
        onCancel={hideWarningModalAction}
        onConfirm={onConfirmWarning}
      />
    </WizardPattern.Stateful>
  );
};

MappingWizard.propTypes = {
  hideMappingWizard: PropTypes.bool,
  warningModalVisible: PropTypes.bool,
  sourceClustersWithoutMappings: PropTypes.array,
  alertText: PropTypes.string,
  alertType: PropTypes.string,
  hideMappingWizardAction: PropTypes.func,
  mappingWizardExitedAction: PropTypes.func,
  setTransformationsBodyAction: PropTypes.func,
  showWarningModalAction: PropTypes.func,
  hideWarningModalAction: PropTypes.func,
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func,
  forms: PropTypes.shape({
    mappingWizardGeneralStep: PropTypes.object,
    mappingWizardClustersStep: PropTypes.object,
    mappingWizardDatastoresStep: PropTypes.object,
    mappingWizardNetworksStep: PropTypes.object
  }),
  transformationsBody: PropTypes.object
};

MappingWizard.defaultProps = {
  hideMappingWizard: true,
  warningModalVisible: false,
  sourceClustersWithoutMappings: [],
  alertText: null,
  alertType: null,
  hideMappingWizardAction: noop,
  mappingWizardExitedAction: noop,
  setTransformationsBodyAction: noop,
  showWarningModalAction: noop,
  hideWarningModalAction: noop,
  showAlertAction: noop,
  hideAlertAction: noop,
  forms: {
    mappingWizardGeneralStep: {},
    mappingWizardClustersStep: {},
    mappingWizardDatastoresStep: {},
    mappingWizardNetworksStep: {}
  },
  transformationsBody: {}
};

// TODO: Is shouldComponentUpdate the only way to prevent an infinite loop here?
export default lifecycle({
  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }
})(MappingWizard);
