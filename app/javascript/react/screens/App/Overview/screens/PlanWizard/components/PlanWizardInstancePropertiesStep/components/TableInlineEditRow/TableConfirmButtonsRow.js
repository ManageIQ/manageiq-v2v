// This component is based on the component of the same name from patternfly-react.
// It includes a fix for https://github.com/patternfly/patternfly-react/issues/535

import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';
import './closestPolyfill';
import ConfirmButton from '../InlineEdit/ConfirmButton';
import CancelButton from '../InlineEdit/CancelButton';

class TableConfirmButtonsRow extends React.Component {
  renderConfirmButtons() {
    const buttonsClass = `inline-edit-buttons ${this.props.buttonsClassName}`;
    return (
      <div className={buttonsClass} key="confirmButtons">
        <ConfirmButton
          bsStyle="primary"
          key="confirm"
          aria-label={this.props.messages.confirmButtonLabel}
          onMouseUp={() => this.props.onConfirm()}
        />
        <CancelButton
          bsStyle="default"
          key="cancel"
          aria-label={this.props.messages.cancelButtonLabel}
          onMouseUp={() => this.props.onCancel()}
        />
      </div>
    );
  }

  render() {
    const editing = this.props.isEditing();
    const rowClass = editing ? 'editing' : '';

    const elements = [
      <tr ref={this.saveRowDimensions} className={rowClass} key="tableRow">
        {this.props.children}
        <td
          style={{
            borderCollapse: 'collapse',
            borderSpacing: '0px',
            maxWidth: '0.01px',
            padding: '0',
            visibility: 'hidden',
            width: '0.01px'
          }}
        >
          <div style={{ position: 'relative' }}>{editing && this.renderConfirmButtons()}</div>
        </td>
      </tr>
    ];

    return elements;
  }
}

TableConfirmButtonsRow.shouldComponentUpdate = true;

TableConfirmButtonsRow.defaultProps = {
  isEditing: noop,
  onConfirm: noop,
  onCancel: noop,
  buttonsClassName: '',
  children: [],
  messages: {
    confirmButtonLabel: 'Save',
    cancelButtonLabel: 'Cancel'
  }
};

TableConfirmButtonsRow.propTypes = {
  /** Function that determines whether values or edit components should be rendered */
  isEditing: PropTypes.func,
  /** Confirm edit callback */
  onConfirm: PropTypes.func,
  /** Cancel edit callback */
  onCancel: PropTypes.func,
  /** Additional confirm buttons classes */
  buttonsClassName: PropTypes.string,
  /** Row cells */
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  /** Message text inputs for i18n */
  messages: PropTypes.shape({
    confirmButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string
  })
};

export default TableConfirmButtonsRow;
