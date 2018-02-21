import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Dropzone from 'react-dropzone';
import csv from 'csv';
import { bindMethods, Toolbar, Button, Icon, EmptyState, ListView } from 'patternfly-react';

// Unfortunately, this is the recommended way to trigger the browse window from a button outside Dropzone:
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class PlanWizardCSVStep extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onFileDrop']);
    this.state = { csvRows: [] };
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        csv.parse(reader.result, (err, csvRows) => {
          this.setState({ csvRows });
          // TODO dispatch action to load data into redux instead of using this.state
        });
      };
      reader.readAsBinaryString(acceptedFiles[0]);
    } else {
      // TODO error reporting?
    }
  }

  render() {
    const { csvRows } = this.state;
    const dropzone = (
      <Dropzone
        ref={(node) => { dropzoneRef = node; }} // See comment at top for rationale...
        onDrop={this.onFileDrop}
        className={cx('csv-upload-dropzone')}
        activeClassName={cx('active')}
      >
        <EmptyState>
          <EmptyState.Icon type="fa" name="upload" />
          <EmptyState.Title>Import a CSV file</EmptyState.Title>
          <EmptyState.Info>
            Drag-and-drop or click here to import a CSV file containing a list of VMs to be migrated.
        </EmptyState.Info>
        </EmptyState>
      </Dropzone>
    );
    // TODO add a "back / upload a new file" button above the list
    const droppedRows = (
      <ListView>
        {csvRows && csvRows.length > 0 && csvRows.map(row => (
          <ListView.Item
            checkboxInput={<input type="checkbox" />}
            heading={row[0] || ''}
            description={row[1] || ''}
            additionalInfo={row.length > 2 && row.slice(2).map(col => (
              <ListView.InfoItem>{col}</ListView.InfoItem>
            ))}
          />
        ))}
      </ListView>
    );
    return (
      <div>
        <h2>VMs to be Migrated</h2>
        <Toolbar>
          <Toolbar.RightContent>
            <Button
              bsStyle="primary"
              className="import-button"
              onClick={() => { dropzoneRef.open(); }}
            >
              <Icon type="fa" name="upload" /> Import
            </Button>
          </Toolbar.RightContent>
          {csvRows && csvRows.length > 0 ? droppedRows : dropzone}
          <Toolbar.Results>
            {csvRows && csvRows.length || 0} Items
          </Toolbar.Results>
        </Toolbar>
      </div>
    );
  }
}

export default PlanWizardCSVStep;