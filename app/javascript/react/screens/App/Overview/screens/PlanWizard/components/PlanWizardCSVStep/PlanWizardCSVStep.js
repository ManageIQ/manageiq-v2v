import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone'
import cx from 'classnames';
import { bindMethods, Toolbar, Button, Icon, EmptyState, ListView } from 'patternfly-react';

// Unfortunately, this is the recommended way to trigger the browse window from a button outside Dropzone:
// https://github.com/react-dropzone/react-dropzone/tree/master/examples/File%20Dialog
let dropzoneRef;

class PlanWizardCSVStep extends React.Component {
  constructor() {
    super();
    bindMethods(this, ['onFileDrop']);
    this.state = { fileUploaded: false, numItems: 0 };
  }

  onFileDrop(acceptedFiles, rejectedFiles) {
    console.log('FILE(S) DROPPED! Accepted:', acceptedFiles, 'Rejected:', rejectedFiles);
  }

  render() {
    const { fileUploaded, numItems } = this.state;
    const emptyDropzone = (
      <EmptyState>
        <EmptyState.Icon type="fa" name="upload"/>
        <EmptyState.Title>Import a CSV file</EmptyState.Title>
        <EmptyState.Info>
          Drag-and-drop or click here to import a CSV file containing a list of VMs to be migrated.
        </EmptyState.Info>
      </EmptyState>
    );
    const fullDropzone = (
      <ListView>
        <ListView.Item>Look at me, I'm a VM!</ListView.Item> {/* TODO actually populate this */}
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
          <Dropzone
            ref={(node) => { dropzoneRef = node; }} // See comment at top for rationale...
            onDrop={this.onFileDrop}
            className={cx('csv-upload-dropzone')}
            activeClassName={cx('active')}
          >
            {fileUploaded ? fullDropzone : emptyDropzone}
          </Dropzone>
          <Toolbar.Results>
            {numItems} Items
          </Toolbar.Results>
        </Toolbar>
      </div>
    );
  }
}

export default PlanWizardCSVStep;