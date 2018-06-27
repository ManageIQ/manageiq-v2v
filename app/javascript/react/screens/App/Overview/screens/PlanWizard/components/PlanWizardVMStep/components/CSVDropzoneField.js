import React from 'react';
import PropTypes from 'prop-types';
import csv from 'csv';
import utf8 from 'utf8';
import { Button, EmptyState } from 'patternfly-react';
import Dropzone from 'react-dropzone';

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class CSVDropzoneField extends React.Component {
  onFileDrop = (acceptedFiles, rejectedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      this.handleUnparsedFile(acceptedFiles[0]);
    } else {
      // eslint-disable-next-line no-restricted-globals
      alert(__('Invalid file extension. Only .csv files are accepted.'));
    }
  };

  handleUnparsedFile = fileHandle => {
    const { onCSVParseSuccess, onCSVParseFailure } = this.props;
    if (fileHandle) {
      const reader = new FileReader();
      reader.onload = () => {
        csv.parse(reader.result, (err, csvRows) => {
          if (csvRows && csvRows.length > 0) {
            csvRows = this.trimWhiteSpaces(csvRows);
            const headerRow = this.mapCSVColumnNameToKey(csvRows[0]);
            if (!headerRow.find(element => element === 'name')) {
              onCSVParseFailure(__("Error: Required column 'Name' does not exist in the .CSV file"));
              return;
            }
            const rowObjects = csvRows.map(row =>
              headerRow.reduce(
                (rowObject, key, index) => ({
                  ...rowObject,
                  [key]: row[index]
                }),
                {}
              )
            );
            onCSVParseSuccess(rowObjects);
          } else {
            onCSVParseFailure(err ? `${err}` : __('Error: Possibly a blank .CSV file'));
          }
        });
      };
      reader.readAsBinaryString(fileHandle);
    }
  };

  trimWhiteSpaces = csvRows => csvRows.map(row => row.map(value => utf8.decode(value).trim()));

  mapCSVColumnNameToKey = headerRow => {
    headerRow[headerRow.findIndex(k => k === __('Name'))] = 'name';
    headerRow[headerRow.findIndex(k => k === __('Host'))] = 'host';
    headerRow[headerRow.findIndex(k => k === __('Provider'))] = 'provider';
    headerRow[headerRow.findIndex(k => k === __('UID'))] = 'uid_ems';
    return headerRow;
  };

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
            <EmptyState.Title>{__('Import File')}</EmptyState.Title>
            <EmptyState.Info>{__('Import a file including a list of VMs to be migrated.')}</EmptyState.Info>
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
  onCSVParseSuccess: PropTypes.func,
  onCSVParseFailure: PropTypes.func
};

export default CSVDropzoneField;
