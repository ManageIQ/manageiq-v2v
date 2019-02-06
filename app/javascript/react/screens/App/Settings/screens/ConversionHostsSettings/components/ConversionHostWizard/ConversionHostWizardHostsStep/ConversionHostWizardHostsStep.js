import React from 'react';
import { Form, TypeAheadSelect } from 'patternfly-react';
import { RHV, OPENSTACK } from '../../../../../../../../../common/constants';

const ConversionHostWizardHostsStep = ({ selectedProviderType, selectedCluster }) => {
  let hostOptions = [];
  if (selectedProviderType === RHV) hostOptions = selectedCluster.hosts;
  if (selectedProviderType === OPENSTACK) hostOptions = selectedCluster.vms;

  console.log('HOST OPTIONS?', hostOptions);

  return (
    <Form className="form-horizontal">
      <TypeAheadSelect
        multiple
        clearButton
        //selected (get this from redux-form?)
        options={hostOptions}
        labelKey="name"
        placeholder={__('Select one or more hosts...')}
      />
    </Form>
  );
};

export default ConversionHostWizardHostsStep;
