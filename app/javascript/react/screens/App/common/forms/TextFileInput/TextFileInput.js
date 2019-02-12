import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'patternfly-react';

const TextFileInput = ({ help, value, onChange }) => (
  <React.Fragment>
    <Form.InputGroup>
      <Form.FormControl type="text" disabled />
      <Form.InputGroup.Button>
        <Button>
          {__('Browse')}
          &hellip;
        </Button>
      </Form.InputGroup.Button>
    </Form.InputGroup>
    {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
    <Form.FormControl className="text-file-input__textarea" componentClass="textarea" />
  </React.Fragment>
);

TextFileInput.propTypes = {
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextFileInput;
