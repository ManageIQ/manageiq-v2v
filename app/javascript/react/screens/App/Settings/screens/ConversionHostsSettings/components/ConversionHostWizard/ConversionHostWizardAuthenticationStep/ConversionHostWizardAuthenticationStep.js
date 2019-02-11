import React from 'react';
import { Form } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import TextFileInput from '../../../../../../common/forms/TextFileInput';

const ConversionHostWizardAuthenticationStep = () => (
  <Form className="form-horizontal">
    <TextFileInput />
  </Form>
);

export default ConversionHostWizardAuthenticationStep;
