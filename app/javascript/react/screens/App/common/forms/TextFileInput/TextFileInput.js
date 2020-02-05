import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, noop } from 'patternfly-react';
import Dropzone from 'react-dropzone';
import classNames from 'classnames';

const TextFileInput = ({ value: { filename, body }, onChange, onBlur, help, hideBody }) => {
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

  const clear = () => onChange({ filename: '', body: '' });

  return (
    <Dropzone onDrop={onFileDrop}>
      {({ getRootProps, getInputProps, isDragActive, open }) => (
        <div
          {...getRootProps({ onClick: event => event.stopPropagation() })}
          className={classNames('text-file-input__dropzone', { active: isDragActive })}
        >
          <input {...getInputProps()} />
          <Form.InputGroup>
            <Form.FormControl type="text" disabled value={filename} />
            <Form.InputGroup.Button>
              <Button onClick={open}>
                {__('Browse')}
                &hellip;
              </Button>
              <Button onClick={clear} disabled={body === ''}>
                {__('Clear')}
              </Button>
            </Form.InputGroup.Button>
          </Form.InputGroup>
          {help && <Form.HelpBlock>{help}</Form.HelpBlock>}
          {!hideBody && (
            <Form.FormControl
              className="text-file-input__textarea"
              componentClass="textarea"
              value={body}
              onChange={event => onChange({ filename: '', body: event.target.value })}
              onBlur={() => onBlur()}
              disabled={filename !== ''}
            />
          )}
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
  hideBody: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func
};

TextFileInput.defaultProps = {
  help: null,
  value: { filename: '', body: '' },
  hideBody: false,
  onChange: noop,
  onBlur: noop
};

export default TextFileInput;
