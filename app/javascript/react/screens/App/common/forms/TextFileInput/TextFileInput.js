import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'patternfly-react';
import Dropzone from 'react-dropzone';

// TODO dropzone, browse button, callback on file loaded
// TODO fill in file path, fill in file contents

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class TextFileInput extends React.Component {
  onFileDrop = files => {
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  };

  handleFile = fileHandle => {
    console.log('TODO handle file', fileHandle);
  };

  render() {
    const { help, value, onChange } = this.props;
    return (
      <Dropzone
        className="text-file-input__dropzone"
        activeClassName="active"
        onDrop={this.onFileDrop}
        disableClick
        disablePreview
        ref={node => {
          dropzoneRef = node; // See comment at top, this is so we can call dropzoneRef.open below
        }}
      >
        <React.Fragment>
          <Form.InputGroup>
            <Form.FormControl type="text" disabled />
            <Form.InputGroup.Button>
              <Button onClick={() => dropzoneRef.open()}>
                {__('Browse')}
                &hellip;
              </Button>
            </Form.InputGroup.Button>
          </Form.InputGroup>
          {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
          <Form.FormControl className="text-file-input__textarea" componentClass="textarea" />
        </React.Fragment>
      </Dropzone>
    );
  }
}

TextFileInput.propTypes = {
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.string,
  onChange: PropTypes.func
};

export default TextFileInput;
