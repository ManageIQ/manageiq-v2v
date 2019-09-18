import React from 'react';
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
  ...props
}) => {
  const row = (
    <tr
      className={classNames(className, 'list-group-item', {
        'list-view-pf-stacked': stacked
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
  ...ListView.Item.propTypes
};

const ListViewTableRow = props => (
  <ListViewTableContext.Consumer>
    {({ isSmallViewport }) => (isSmallViewport ? <ListView.Item {...props} /> : <BaseListViewTableRow {...props} />)}
  </ListViewTableContext.Consumer>
);

ListViewTableRow.propTypes = {
  ...BaseListViewTableRow.propTypes
};

export default ListViewTableRow;
