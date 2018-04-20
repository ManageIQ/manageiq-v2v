import React from 'react';
import PropTypes from 'prop-types';
import csv from 'csv';
import { bindMethods, Button, EmptyState } from 'patternfly-react';
import Dropzone from 'react-dropzone';

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class CSVDropzoneField extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onFileDrop', 'handleUnparsedFile']);
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.handleUnparsedFile(acceptedFiles[0]);
    } else {
      // eslint-disable-next-line no-restricted-globals
      alert('Invalid file extension. Only .csv files are accepted.');
    }
  }

  handleUnparsedFile(fileHandle) {
    const { columnNames, onCSVParseSuccess } = this.props;
    if (fileHandle) {
      const reader = new FileReader();
      reader.onload = () => {
        csv.parse(reader.result, (err, csvRows) => {
          const rowObjects = csvRows.map(row =>
            columnNames.reduce(
              (rowObject, key, index) => ({
                ...rowObject,
                [key]: row[index]
              }),
              {}
            )
          );

          // TODO: client side validation logic should occur here and should prevent calling
          // onCSVParseSuccess until all validation is done...
          // i.e. setState with errors and show them here instead.

          /**
           * Need to check the following is done:
           * 1. csv is empty
           * 2. csv contains malformed rows (maybe print them out?)
           * 3. Ask user to import the csv again
           */

          onCSVParseSuccess(rowObjects);
        });
      };
      reader.readAsBinaryString(fileHandle);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Dropzone
          accept=".csv"
          className="csv-upload-dropzone"
          activeClassName="active"
          onDrop={this.onFileDrop}
          disableClick
          disablePreview
          ref={node => {
            dropzoneRef = node; // See comment at top, this is so we can call dropzoneRef.open below
          }}
        >
          <EmptyState>
            <EmptyState.Icon type="pf" name="import" />
            <EmptyState.Title />
            <EmptyState.Info>
              {__('Import a file including a list of VMs to be migrated.')}
            </EmptyState.Info>
            <EmptyState.Action>
              <Button
                bsStyle="primary"
                onClick={() => {
                  dropzoneRef.open();
                }}
              >
                {__('Import')}
              </Button>
            </EmptyState.Action>
          </EmptyState>
        </Dropzone>
      </React.Fragment>
    );
  }
}

CSVDropzoneField.propTypes = {
  columnNames: PropTypes.arrayOf(PropTypes.string),
  onCSVParseSuccess: PropTypes.func
};

export default CSVDropzoneField;
