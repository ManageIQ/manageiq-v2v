import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

class TextFileInput extends React.Component {
  onFileDrop = files => {
    if (files && files.length > 0) {
      this.handleFile(files[0]);
    }
  };

  handleFile = fileHandle => {
    if (fileHandle) {
      const { onChange } = this.props;
      const reader = new FileReader();
      reader.onload = () => onChange({ filename: fileHandle.name, body: reader.result });
      reader.readAsBinaryString(fileHandle);
    }
  };

  render() {
    const { help, value, onChange } = this.props;
    return (
      <Dropzone onDrop={this.onFileDrop} onClick={event => event.preventDefault()}>
        {({ getRootProps, getInputProps, isDragActive, open }) => (
          <div {...getRootProps()} className={classNames('text-file-input__dropzone', { active: isDragActive })}>
            <input {...getInputProps()} />
            <Form.InputGroup>
              <Form.FormControl type="text" disabled value={value.filename} />
              <Form.InputGroup.Button>
                <Button onClick={open}>
                  {__('Browse')}
                  &hellip;
                </Button>
              </Form.InputGroup.Button>
            </Form.InputGroup>
            {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
            <Form.FormControl
              className="text-file-input__textarea"
              componentClass="textarea"
              value={value.body}
              onChange={event => onChange({ filename: '', body: event.target.value })}
            />
          </div>
        )}
      </Dropzone>
    );
  }
}

TextFileInput.propTypes = {
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.shape({
    filename: PropTypes.string,
    body: PropTypes.string
  }),
  onChange: PropTypes.func
};

export default TextFileInput;
