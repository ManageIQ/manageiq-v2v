import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

// TODO dropzone, browse button, callback on file loaded
// TODO fill in file path, fill in file contents

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
      <Dropzone onDrop={this.onFileDrop} onClick={event => event.preventDefault()}>
        {({ getRootProps, getInputProps, isDragActive, open }) => (
          <div {...getRootProps()} className={classNames('text-file-input__dropzone', { active: isDragActive })}>
            <input {...getInputProps()} />
            <Form.InputGroup>
              <Form.FormControl type="text" disabled />
              <Form.InputGroup.Button>
                <Button onClick={open}>
                  {__('Browse')}
                  &hellip;
                </Button>
              </Form.InputGroup.Button>
            </Form.InputGroup>
            {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
            <Form.FormControl className="text-file-input__textarea" componentClass="textarea" />
          </div>
        )}
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
