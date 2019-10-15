import React from 'react';
import PropTypes from 'prop-types';
import { ListView, layout as pfLayout } from 'patternfly-react';
import ListViewTableRow from './ListViewTableRow';

export const ListViewTableContext = React.createContext({});

const BaseListViewTable = ({ children, className, isSmallViewport, ...props }) =>
  isSmallViewport ? (
    <ListView className={className} {...props}>
      {children}
    </ListView>
  ) : (
    <ListView className={`${className} list-view-table-pf`} {...props}>
      <table>
        <tbody>{children}</tbody>
      </table>
    </ListView>
  );

BaseListViewTable.propTypes = {
  ...ListView.propTypes,
  isSmallViewport: PropTypes.bool
};

const layout =
  process.env.NODE_ENV === 'test'
    ? {
        is: () => true,
        addChangeListener: () => {},
        removeChangeListener: () => {}
      }
    : pfLayout;

class ListViewTable extends React.Component {
  state = { isSmallViewport: !layout.is('desktop') };

  componentDidMount() {
    layout.addChangeListener(this.onLayoutChange);
  }

  componentWillUnmount() {
    layout.removeChangeListener(this.onLayoutChange);
  }

  onLayoutChange = newLayout => {
    this.setState({ isSmallViewport: newLayout !== 'desktop' });
  };

  render() {
    const { isSmallViewport } = this.state;
    return (
      <ListViewTableContext.Provider value={{ isSmallViewport }}>
        <BaseListViewTable isSmallViewport={isSmallViewport} {...this.props} />
      </ListViewTableContext.Provider>
    );
  }
}

ListViewTable.propTypes = {
  ...ListView.propTypes
};

ListViewTable.defaultProps = {
  ...ListView.defaultProps
};

ListViewTable.Row = ListViewTableRow;

export default ListViewTable;
