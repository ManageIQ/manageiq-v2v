import React from 'react';
import PropTypes from 'prop-types';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';

class DatastoresStepForm extends React.Component {
  render() {
    const { sourceDatastores, targetDatastores } = this.props;
    return (
      <DualPaneMapper handleButtonClick={() => {}}>
        <DualPaneMapperList listTitle="Source Datastores">
          {sourceDatastores.map(item => (
            <DualPaneMapperListItem
              item={item}
              key={item.id}
              // selected={
              //   selectedSourceDatastores &&
              //   selectedSourceDatastores.some(
              //     sourceDatastore => sourceDatastore.id === item.id
              //   )
              // }
              // handleClick={this.selectSourceDatastore}
              // handleKeyPress={this.selectSourceCluster}
            />
          ))}
          {/* <DualPaneMapperCount
                      selectedItems={selectedSourceClusters.length}
                      totalItems={sourceClusters.length}
                    /> */}
        </DualPaneMapperList>
        <DualPaneMapperList listTitle="Target Datastores">
          {targetDatastores.map(item => (
            <DualPaneMapperListItem
              item={item}
              key={item.id}
              // selected={
              //   selectedTargetDatastore &&
              //   selectedTargetDatastore.id === item.id
              // }
              // handleClick={this.selectTargetDatastore}
              // handleKeyPress={this.selectTargetDatastore}
            />
          ))}
        </DualPaneMapperList>
      </DualPaneMapper>
    );
  }
}

export default DatastoresStepForm;
