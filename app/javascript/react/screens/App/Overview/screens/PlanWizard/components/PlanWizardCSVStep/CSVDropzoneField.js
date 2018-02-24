import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import csv from 'csv';
import {
  bindMethods,
  Toolbar,
  Button,
  Icon,
  EmptyState,
  ListView
} from 'patternfly-react';
import Dropzone from 'react-dropzone';

// TODO __('i18n')

// Unfortunately, this is the recommended way to trigger the file dialog programmatically.
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class CSVDropzoneField extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onFileDrop', 'confirmOverwrite']);
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    const { input: { onChange } } = this.props;
    this.confirmOverwrite(() => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const reader = new FileReader();
        reader.onload = () => {
          csv.parse(reader.result, (err, csvRows) => onChange(csvRows));
        };
        reader.readAsBinaryString(acceptedFiles[0]);
      } else {
        // TODO error reporting / unhappy path? message about rejected files?
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
              'Click Import or drag-and-drop here to import a CSV file containing a list of VMs to be migrated.'
            )}
          </EmptyState.Info>
        </EmptyState>
      ) : (
        <ListView>
          {value.map(row => (
            <ListView.Item
              heading={row[0] || ''}
              description={row[1] || ''}
              additionalInfo={
                row.length > 2 &&
                row
                  .slice(2)
                  .map(col => <ListView.InfoItem>{col}</ListView.InfoItem>)
              }
            />
          ))}
        </ListView>
      );
    return (
      <Dropzone
        ref={node => {
          dropzoneRef = node;
        }} // See comment at top
        className={cx('csv-upload-dropzone')}
        activeClassName={cx('active')}
        onDrop={this.onFileDrop}
        disableClick
        disablePreview
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
    value: PropTypes.arrayOf(PropTypes.array),
    onChange: PropTypes.func
  }),
  meta: PropTypes.shape({
    pristine: PropTypes.bool,
    error: PropTypes.string
  })
};

export default CSVDropzoneField;
