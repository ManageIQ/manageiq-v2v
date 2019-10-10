import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ListView } from 'patternfly-react';
import { ListViewTableContext } from './ListViewTable';

// TODO implement expandable support

const BaseListViewTableRow = ({
  className,
  stacked,
  leftContent,
  heading,
  description,
  additionalInfo,
  actions,
  children,
  expanded,
  toggleExpanded,
  ...props
}) => {
  // TODO Look at ListViewItem, what do the `list-group-item-header` and `list-group-item-container` CSS classes do?

  // TODO add the expand chevron thing .list-view-pf-expand, compare with original ListViewItem
  // TODO call toggleExpanded on click, where?
  const row = (
    <tr
      className={classNames(className, 'list-group-item', {
        'list-view-pf-stacked': stacked,
        'list-view-pf-expand-active': expanded
      })}
      {...props}
    >
      {leftContent && <td className="list-view-pf-left list-view-pf-main-info">{leftContent}</td>}
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
          <ListView.Actions>{actions}</ListView.Actions>
        </td>
      )}
    </tr>
  );
  const numColumns = row.props.children.filter(child => !!child).length; // eslint-disable-line no-unused-vars
  // TODO: use numColumns for colspan of expanded content
  return row;
};

BaseListViewTableRow.propTypes = {
  ...ListView.Item.propTypes,
  expanded: PropTypes.bool.isRequired,
  toggleExpanded: PropTypes.func.isRequired
};

BaseListViewTableRow.defaultProps = {
  ...ListView.Item.defaultProps
};

class ListViewTableRow extends React.Component {
  state = { expanded: this.props.initExpanded };
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
    const {
      props,
      state: { expanded },
      toggleExpanded
    } = this;

    return (
      <ListViewTableContext.Consumer>
        {({ isSmallViewport }) =>
          isSmallViewport ? (
            <ListView.Item
              {...props}
              initExpanded={expanded}
              onExpand={toggleExpanded}
              onExpandClose={toggleExpanded}
            />
          ) : (
            <BaseListViewTableRow {...props} expanded={expanded} toggleExpanded={toggleExpanded} />
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
