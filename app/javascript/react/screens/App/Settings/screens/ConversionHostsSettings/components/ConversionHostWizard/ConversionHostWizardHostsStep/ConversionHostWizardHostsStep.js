import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form } from 'patternfly-react';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';
import TypeAheadSelectField from '../../../../../../common/forms/TypeAheadSelectField';
import { stepIDs } from '../ConversionHostWizardConstants';

const ConversionHostWizardHostsStep = ({ selectedProviderType, selectedCluster }) => {
  let hostOptions = [];
  if (selectedProviderType === RHV) hostOptions = selectedCluster.hosts;
  if (selectedProviderType === OPENSTACK) hostOptions = selectedCluster.vms;
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
          highlightOnlyResult
          selectHintOnEnter
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
