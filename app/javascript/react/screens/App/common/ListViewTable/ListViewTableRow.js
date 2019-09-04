import React from 'react';
import classNames from 'classnames';
import { layout, ListView } from 'patternfly-react';

// TODO implement expandable support

const ListViewTableRow = ({
  className,
  stacked,
  leftContent,
  heading,
  description,
  additionalInfo,
  actions,
  ...props
}) => {
  console.log('current layout?', layout.current());
  const row = (
    <tr
      className={classNames(className, 'list-group-item', 'list-view-pf-main-info', 'list-view-pf-body', {
        'list-view-pf-stacked': stacked
      })}
      {...props}
    >
      {leftContent && <td className="list-view-pf-left">{leftContent}</td>}
      {(heading || description) && (
        <td>
          {heading && <ListView.DescriptionHeading>{heading}</ListView.DescriptionHeading>}
          {description && <ListView.DescriptionText>{description}</ListView.DescriptionText>}
        </td>
      )}
      {additionalInfo && additionalInfo.map((infoItem, index) => <td key={`info-item-${index}`}>{infoItem}</td>)}
      {actions && (
        <td>
          <ListView.Actions>{actions}</ListView.Actions>
        </td>
      )}
      {/* TODO handle float CSS of actions? */}
    </tr>
  );
  const numColumns = row.props.children.filter(child => !!child).length;
  console.log('TODO: use this for colspan of expanded content -- numColumns =', numColumns);
  return row;
};

ListViewTableRow.propTypes = {
  ...ListView.Item.propTypes
};

export default ListViewTableRow;
