import React from 'react';
import PropTypes from 'prop-types';
import csv from 'csv';
import {
  bindMethods,
  Toolbar,
  Button,
  EmptyState,
  ListView,
  Icon
} from 'patternfly-react';
import Dropzone from 'react-dropzone';
import ConfirmModal from '../../../../../../common/ConfirmModal';

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class CSVDropzoneField extends React.Component {
  constructor() {
    super();
    this.state = { unparsedFile: null, showConfirmOverwrite: false };
    bindMethods(this, [
      'onFileDrop',
      'onCancelOverwrite',
      'onConfirmOverwrite',
      'handleUnparsedFile'
    ]);
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    const { input: { value } } = this.props;
    if (acceptedFiles && acceptedFiles.length > 0) {
      // Don't bother with the confirm dialog if there is no existing value to overwrite.
      if (!value || value.length === 0) {
        this.handleUnparsedFile(acceptedFiles[0]);
      } else {
        this.setState({
          unparsedFile: acceptedFiles[0],
          showConfirmOverwrite: true
        });
      }
    } else {
      // eslint-disable-next-line no-restricted-globals
      alert('Invalid file extension. Only .csv files are accepted.');
    }
  }

  onCancelOverwrite() {
    this.setState({ unparsedFile: null, showConfirmOverwrite: false });
  }

  onConfirmOverwrite() {
    this.handleUnparsedFile(this.state.unparsedFile);
    this.onCancelOverwrite();
  }

  handleUnparsedFile(fileHandle) {
    const { input, columnNames } = this.props;
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
          input.onChange(rowObjects);
        });
      };
      reader.readAsBinaryString(fileHandle);
    }
  }

  render() {
    const { input: { value }, meta: { pristine, error } } = this.props;
    const { showConfirmOverwrite } = this.state;
    const csvImported = value && value.length !== 0;
    const mainContents = !csvImported ? (
      <EmptyState>
        <EmptyState.Icon type="fa" name="upload" />
        <EmptyState.Title>{__('Import a CSV file')}</EmptyState.Title>
        <EmptyState.Info>
          {__(
            'Click "Browse..." or drag-and-drop here to import a CSV file containing a list of VMs to be migrated.'
          )}
        </EmptyState.Info>
      </EmptyState>
    ) : (
      <ListView>
        {value.map(vm => (
          <ListView.Item
            key={vm.reference}
            description={vm.name || ''}
            additionalInfo={[
              <ListView.InfoItem key="provider">
                {`${__('Provider:')} ${vm.provider || ''}`}
              </ListView.InfoItem>,
              <ListView.InfoItem key="reference">
                {`${__('Reference:')} ${vm.reference || ''}`}
              </ListView.InfoItem>
            ]}
          />
        ))}
      </ListView>
    );
    const results = csvImported && (
      <Toolbar.Results>
        {!error && value && sprintf(__('%s Items'), value.length)}
        {pristine && error}
      </Toolbar.Results>
    );
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
          <Toolbar>
            <Toolbar.RightContent>
              <Button
                bsStyle="primary"
                onClick={() => {
                  dropzoneRef.open();
                }}
              >
                {__('Browse...')}
              </Button>
            </Toolbar.RightContent>
            <div className="form-group">{mainContents}</div>
            {results}
          </Toolbar>
        </Dropzone>
        <ConfirmModal
          show={showConfirmOverwrite}
          title={__('Overwrite Import File')}
          icon={
            <Icon
              type="pf"
              name="warning-triangle-o"
              className="confirm-warning-icon"
            />
          }
          className="inner-modal-dialog"
          backdropClassName="inner-modal-backdrop"
          body={
            <React.Fragment>
              <p>
                {__(
                  'Importing a new VM list file will overwrite the contents of the existing list.'
                )}
              </p>
              <p>{__('Are you sure you want to import a new file?')}</p>
            </React.Fragment>
          }
          cancelButtonLabel={__('Cancel')}
          confirmButtonLabel={__('Import')}
          onCancel={this.onCancelOverwrite}
          onConfirm={this.onConfirmOverwrite}
        />
      </React.Fragment>
    );
  }
}

CSVDropzoneField.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.arrayOf(PropTypes.object),
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    pristine: PropTypes.bool,
    error: PropTypes.string
  }),
  columnNames: PropTypes.arrayOf(PropTypes.string)
};

export default CSVDropzoneField;
