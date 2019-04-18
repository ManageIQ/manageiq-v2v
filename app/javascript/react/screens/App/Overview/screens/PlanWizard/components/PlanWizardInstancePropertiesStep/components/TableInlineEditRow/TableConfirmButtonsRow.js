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

  renderChildren = () => {
    const editing = this.props.isEditing();
    if (!editing) return this.props.children;
    // Render children with the confirm buttons injected as a child of the last cell in the row.
    const children = React.Children.toArray(this.props.children);
    const lastCell = children.pop(); // Pop off the <tableCell> to be replaced
    const lastCellChildren = React.Children.toArray(lastCell.props.children);
    const inlineEditFormatter = lastCellChildren.pop(); // Pop off the <InlineEdit> to be replaced
    // To get the actual <td> we need to call the renderEdit prop of the inlineEditButtonsFormatter:
    const { renderEdit, value, additionalData } = inlineEditFormatter.props;
    const td = renderEdit(value, additionalData);
    const tdChildren = React.Children.toArray(td.props.children);
    // Render the tree using modified clones of the components we popped above.
    return [
      ...children,
      React.cloneElement(
        lastCell,
        lastCell.props,
        ...lastCellChildren,
        React.cloneElement(
          td,
          { ...td.props, className: 'inline-edit-buttons-parent' },
          ...tdChildren,
          this.renderConfirmButtons()
        )
      )
    ];
  };

  render() {
    const editing = this.props.isEditing();
    const rowClass = editing ? 'editing' : '';

    const elements = [
      <tr className={rowClass} key="tableRow">
        {this.renderChildren()}
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
