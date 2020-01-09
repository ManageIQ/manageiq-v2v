import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { length } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import TypeAheadSelectField from '../../../../../../common/forms/TypeAheadSelectField';
import { stepIDs } from '../ConversionHostWizardConstants';
import { FINISHED } from '../../../ConversionHostsSettingsConstants';

const ConversionHostWizardHostsStep = ({
  selectedProviderType,
  selectedCluster,
  conversionHosts,
  conversionHostTasksByResource
}) => {
  let hostOptions = [];
  let emptyLabel = '';
  if (selectedProviderType === RHV) {
    hostOptions = selectedCluster.vms;
    emptyLabel = __('No VMs available for the selected cluster.');
  }
  if (selectedProviderType === OPENSTACK) {
    hostOptions = selectedCluster.vms;
    emptyLabel = __('No VMs available for the selected project.');
  }
  const filteredHostOptions = hostOptions.filter(host => {
    // Don't allow selection of hosts already configured as conversion hosts
    if (conversionHosts.some(ch => ch.resource.type === host.type && ch.resource.id === host.id)) return false;
    // Don't allow selection of hosts in progress of being configured as conversion hosts
    const tasks = conversionHostTasksByResource;
    const matchingEnableTasks =
      tasks && tasks[host.type] && tasks[host.type][host.id] && tasks[host.type][host.id].enable;
    const enableInProgress = matchingEnableTasks && matchingEnableTasks.some(task => task.state !== FINISHED);
    return !enableInProgress;
  });
  return (
    <Form className="form-vertical">
      <Form.FormGroup controlId="host-selection">
        <Form.ControlLabel>{__('VMs to configure as conversion hosts')}</Form.ControlLabel>
        <Field
          component={TypeAheadSelectField}
          name="hosts"
          controlId="host-selection"
          multiple
          clearButton
          options={filteredHostOptions}
          labelKey="name"
          placeholder={__('Select one or more VMs...')}
          emptyLabel={hostOptions.length === 0 ? emptyLabel : __('No matches found.')}
          highlightOnlyResult
          selectHintOnEnter
          validate={[length({ min: 1 })]}
        />
      </Form.FormGroup>
    </Form>
  );
};

ConversionHostWizardHostsStep.propTypes = {
  selectedProviderType: PropTypes.string,
  selectedCluster: PropTypes.object,
  conversionHosts: PropTypes.arrayOf(PropTypes.object),
  conversionHostTasksByResource: PropTypes.objectOf(
    PropTypes.objectOf(PropTypes.objectOf(PropTypes.arrayOf(PropTypes.object)))
  )
};

export default reduxForm({
  form: stepIDs.hostsStep,
  destroyOnUnmount: false,
  initialValues: { hosts: [] }
})(ConversionHostWizardHostsStep);
