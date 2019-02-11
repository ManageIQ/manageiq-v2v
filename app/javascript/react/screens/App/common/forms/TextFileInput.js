import React from 'react';
import PropTypes from 'prop-types';
import { Form, Grid, Button } from 'patternfly-react';

// TODO render file bar and textarea for pasting, browsing, drag-drop.
const TextFileInput = ({ label }) => (
  <div>
    <Form.FormGroup>
      <Grid.Col componentClass={Form.ControlLabel} sm={2}>
        {label}
      </Grid.Col>
      <Grid.Col sm={9}>
        <Form.InputGroup>
          <Form.FormControl type="text" />
          <Form.InputGroup.Button>
            <Button>{__('Browse...')}</Button>
          </Form.InputGroup.Button>
          {/* layout, help text, etc */}
        </Form.InputGroup>
        <Form.InputGroup>
          <textarea className="form-control" />
        </Form.InputGroup>
      </Grid.Col>
    </Form.FormGroup>
  </div>
);

TextFileInput.propTypes = {
  label: PropTypes.string
};

export default TextFileInput;
