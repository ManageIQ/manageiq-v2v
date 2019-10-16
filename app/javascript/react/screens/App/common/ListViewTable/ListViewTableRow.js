import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListView, Icon, noop } from 'patternfly-react';
import { ListViewTableContext } from './ListViewTable';
import StopPropagationOnClick from '../StopPropagationOnClick';

// TODO implement expandable support

const BaseListViewTableRow = ({
  className,
  stacked,
  checkboxInput,
  leftContent,
  heading,
  description,
  additionalInfo,
  actions,
  children,
  expanded,
  toggleExpanded,
  hideCloseIcon,
  compoundExpand,
  compoundExpanded,
  onCloseCompoundExpand,
  ...props
}) => {
  // TODO Look at ListViewItem, what do the `list-group-item-header` and `list-group-item-container` CSS classes do?

  // TODO do we need multiple <tbody> elements to achieve these styles? how does that work for a non-expandable list?
  //      is it acceptable to just have every row in a tbody no matter what? would match the original ListViewGroupItem...s

  // TODO add the expand chevron thing .list-view-pf-expand, ListViewExpand?

  if (compoundExpand) {
    // eslint-disable-next-line no-console
    console.warn('ListViewTable does not currently support the compoundExpand props.', {
      compoundExpand,
      compoundExpanded,
      onCloseCompoundExpand
    });
  }

  const expandable = !!children;

  const handleExpandClick = e => {
    // ignore selected child elements click
    // (this is copied from patternfly-react's ListViewGroupItemHeader)
    if (
      expandable &&
      e.target.tagName !== 'BUTTON' &&
      e.target.tagName !== 'A' &&
      e.target.tagName !== 'INPUT' &&
      !e.target.classList.contains('fa-ellipsis-v')
    ) {
      toggleExpanded();
    }
  };

  const row = (
    <tr
      className={classNames(className, {
        'list-group-item': true,
        'list-view-pf-stacked': stacked,
        'list-group-item-header': expandable, // TODO ??? maybe this needs to be on a wrapping <tbody> instead
        'list-view-pf-expand-active': expanded
      })}
      onClick={expandable ? handleExpandClick : noop}
      {...props}
    >
      {checkboxInput && (
        <td className="list-view-table-checkbox-cell">
          <ListView.Checkbox>{checkboxInput}</ListView.Checkbox>
        </td>
      )}
      {leftContent && (
        <td
          className={classNames('list-view-pf-left', 'list-view-pf-main-info', {
            'adjacent-to-checkbox-cell': !!checkboxInput
          })}
        >
          {leftContent}
        </td>
      )}
      {(heading || description) && (
        <td className="list-view-pf-main-info">
          <ListView.Description>
            {heading && <ListView.DescriptionHeading>{heading}</ListView.DescriptionHeading>}
            {description && <ListView.DescriptionText>{description}</ListView.DescriptionText>}
          </ListView.Description>
        </td>
      )}
      {additionalInfo &&
        additionalInfo.map((infoItem, index) => (
          <td
            key={`info-item-${index}`}
            className={classNames('list-view-pf-main-info', { 'empty-info-item': !infoItem })}
          >
            {infoItem}
          </td>
        ))}
      {actions && (
        <td>
          <ListView.Actions>
            <StopPropagationOnClick>{actions}</StopPropagationOnClick>
          </ListView.Actions>
        </td>
      )}
    </tr>
  );

  if (expandable && expanded) {
    const numColumns = row.props.children.filter(child => !!child).length;

    return (
      <React.Fragment>
        {row /* TODO with ListViewExpand in leftContent? */}
        <tr className="list-group-item-container container-fluid">
          <td colSpan={numColumns}>
            {hideCloseIcon ? (
              children
            ) : (
              // TODO replace inline styles with CSS
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ flexGrow: 1 }}>{children}</div>
                <div className="close">
                  <Icon type="pf" name="close" onClick={toggleExpanded} />
                </div>
              </div>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  }

  return row;
};

BaseListViewTableRow.propTypes = {
  ...ListView.Item.propTypes,
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired
};

class ListViewTableRow extends React.Component {
  state = { expanded: this.props.initExpanded || false };
  toggleExpanded = () => {
    const { onExpand, onExpandClose } = this.props;
    if (this.state.expanded) {
      onExpandClose();
    } else {
      onExpand();
    }
    this.setState(prevState => ({ expanded: !prevState.expanded }));
  };

  render() {
    // Don't pass down certain props because they are handled here by toggleExpanded
    const { initExpanded, onExpand, onExpandClose, ...props } = this.props; // eslint-disable-line no-unused-vars
    const { expanded } = this.state;

    return (
      <ListViewTableContext.Consumer>
        {({ isSmallViewport }) =>
          isSmallViewport ? (
            <ListView.Item
              {...props}
              initExpanded={expanded}
              onExpand={this.toggleExpanded}
              onExpandClose={this.toggleExpanded}
            />
          ) : (
            <BaseListViewTableRow {...props} expanded={expanded} toggleExpanded={this.toggleExpanded} />
          )
        }
      </ListViewTableContext.Consumer>
    );
  }
}

ListViewTableRow.propTypes = {
  ...ListView.Item.propTypes
};

ListViewTableRow.defaultProps = {
  ...ListView.Item.defaultProps
};

export default ListViewTableRow;
