import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

// TODO clear button
// TODO when filename is non empty, textarea is read only

const TextFileInput = ({ value: { filename, body }, onChange, help }) => {
  const readFile = fileHandle => {
    const reader = new FileReader();
    reader.onload = () => onChange({ filename: fileHandle.name, body: reader.result });
    reader.readAsBinaryString(fileHandle);
  };

  const onFileDrop = files => {
    if (files && files.length > 0) {
      readFile(files[0]);
    }
  };

  return (
    <Dropzone onDrop={onFileDrop} onClick={event => event.preventDefault()}>
      {({ getRootProps, getInputProps, isDragActive, open }) => (
        <div {...getRootProps()} className={classNames('text-file-input__dropzone', { active: isDragActive })}>
          <input {...getInputProps()} />
          <Form.InputGroup>
            <Form.FormControl type="text" disabled value={filename} />
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
            value={body}
            onChange={event => onChange({ filename: '', body: event.target.value })}
          />
        </div>
      )}
    </Dropzone>
  );
};

TextFileInput.propTypes = {
  help: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  value: PropTypes.shape({
    filename: PropTypes.string,
    body: PropTypes.string
  }),
  onChange: PropTypes.func
};

export default TextFileInput;
