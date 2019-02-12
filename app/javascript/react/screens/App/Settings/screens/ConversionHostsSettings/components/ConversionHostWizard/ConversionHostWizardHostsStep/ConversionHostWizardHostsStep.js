import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { length } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import TypeAheadSelectField from '../../../../../../common/forms/TypeAheadSelectField';
import { stepIDs } from '../ConversionHostWizardConstants';

const ConversionHostWizardHostsStep = ({ selectedProviderType, selectedCluster }) => {
  let hostOptions = [];
  let emptyLabel = '';
  if (selectedProviderType === RHV) {
    hostOptions = selectedCluster.hosts;
    emptyLabel = __('No hosts available for the selected cluster.');
  }
  if (selectedProviderType === OPENSTACK) {
    hostOptions = selectedCluster.vms;
    emptyLabel = __('No hosts available for the selected project.');
  }
  return (
    <Form className="form-vertical">
      <Form.FormGroup controlId="host-selection">
        <Form.ControlLabel>{__('Hosts to configure as conversion hosts')}</Form.ControlLabel>
        <Field
          component={TypeAheadSelectField}
          name="hosts"
          controlId="host-selection"
          multiple
          clearButton
          options={hostOptions}
          labelKey="name"
          placeholder={__('Select one or more hosts...')}
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
  selectedCluster: PropTypes.object
};

export default reduxForm({
  form: stepIDs.hostsStep,
  destroyOnUnmount: false,
  initialValues: { hosts: [] }
})(ConversionHostWizardHostsStep);
