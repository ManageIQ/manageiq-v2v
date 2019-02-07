import React from 'react';
import { Form, Grid, TypeAheadSelect } from 'patternfly-react';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';

const ConversionHostWizardHostsStep = ({ selectedProviderType, selectedCluster }) => {
  let hostOptions = [];
  if (selectedProviderType === RHV) hostOptions = selectedCluster.hosts;
  if (selectedProviderType === OPENSTACK) hostOptions = selectedCluster.vms;

  console.log('HOST OPTIONS?', hostOptions);

  return (
    <Form className="form-vertical">
      <Form.FormGroup controlId="host-selection">
        <Form.ControlLabel>{__('Hosts to configure as conversion hosts')}</Form.ControlLabel>
        <TypeAheadSelect
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

export default ConversionHostWizardHostsStep;
