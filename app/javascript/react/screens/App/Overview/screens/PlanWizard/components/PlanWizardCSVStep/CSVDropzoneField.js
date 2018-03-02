import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import csv from 'csv';
import {
  bindMethods,
  Toolbar,
  Button,
  EmptyState,
  ListView
} from 'patternfly-react';
import Dropzone from 'react-dropzone';

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class CSVDropzoneField extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onFileDrop', 'confirmOverwrite']);
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    const { input, columnNames } = this.props;
    this.confirmOverwrite(() => {
      if (acceptedFiles && acceptedFiles.length > 0) {
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
        reader.readAsBinaryString(acceptedFiles[0]);
      } else {
        // eslint-disable-next-line no-restricted-globals
        alert('Invalid file extension. Only .csv files are accepted.');
      }
    });
  }

  // TODO fancier confirm dialog... or something else? see comments at https://github.com/priley86/miq_v2v_ui_plugin/issues/34
  confirmOverwrite(andThen) {
    const { input: { value } } = this.props;
    const confirmMessage = __(
      'Importing a new VM list file will overwrite the contents of the existing list.\n\nAre you sure you want to import a new file?'
    );
    // eslint-disable-next-line no-restricted-globals
    if (!value || value.length === 0 || confirm(confirmMessage)) {
      andThen();
    }
  }

  render() {
    const { input: { value }, meta: { pristine, error } } = this.props;
    const mainContents =
      !value || value.length === 0 ? (
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
              description={vm.name || ''}
              additionalInfo={[
                <ListView.InfoItem>
                  {`${__('Provider:')} ${vm.provider || ''}`}
                </ListView.InfoItem>,
                <ListView.InfoItem>
                  {`${__('Reference:')} ${vm.reference || ''}`}
                </ListView.InfoItem>
              ]}
            />
          ))}
        </ListView>
      );
    return (
      <Dropzone
        accept=".csv"
        className={cx('csv-upload-dropzone')}
        activeClassName={cx('active')}
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
          <Toolbar.Results>
            {!error && value && sprintf(__('%s Items'), value.length)}
            {pristine && error}
          </Toolbar.Results>
        </Toolbar>
      </Dropzone>
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
