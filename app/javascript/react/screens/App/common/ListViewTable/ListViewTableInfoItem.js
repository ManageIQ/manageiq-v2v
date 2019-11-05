import React from 'react';
import { ListView, noop } from 'patternfly-react';

// By default, ListView.InfoItem calls stopPropagation on its onClick handler.
// When these info items are taking up entire table columns, we need to override this behavior.
// This component simply renders ListView.InfoItem without its default onClick.
// If a child needs to handle a click without clicking the row, that child must call stopPropagation itself.

const ListViewTableInfoItem = props => <ListView.InfoItem onClick={noop} {...props} />;

ListViewTableInfoItem.propTypes = {
  ...ListView.InfoItem.propTypes
};

ListViewTableInfoItem.defaultProps = {
  ...ListView.InfoItem.defaultProps
};

export default ListViewTableInfoItem;
