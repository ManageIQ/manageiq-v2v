import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
// import DatastoresStepTreeView from './DatastoresStepTreeView';

class NetworksStepForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      sourceNetworks,
      targetNetworks,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      input
    } = this.props;
    // const {
    //   selectedSourceDatastores,
    //   selectedTargetDatastore,
    //   selectedMapping
    // } = this.state;

    return (
      <div className="dual-pane-mapper-form">
        <DualPaneMapper
        // handleButtonClick={this.addDatastoreMapping}
        // validMapping={
        //   !(
        //     selectedTargetDatastore &&
        //     (selectedSourceDatastores && selectedSourceDatastores.length > 0)
        //   )
        // }
        >
          <DualPaneMapperList
            listTitle="Source Networks"
            loading={isFetchingSourceNetworks}
          >
            {sourceNetworks &&
              sourceNetworks.map(item => (
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
                  // handleKeyPress={this.selectSourceDatastore}
                />
              ))}
            {/* <DualPaneMapperCount
              selectedItems={selectedSourceDatastores.length}
              totalItems={sourceDatastores.length}
            /> */}
          </DualPaneMapperList>
          <DualPaneMapperList
            listTitle="Target Networks"
            loading={isFetchingTargetNetworks}
          >
            {targetNetworks &&
              targetNetworks.map(item => (
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
        {/* <DatastoresStepTreeView
          mappings={input.value}
          selectMapping={this.selectMapping}
          removeMapping={this.removeMapping}
          removeAll={this.removeAll}
          selectedMapping={selectedMapping}
        /> */}
      </div>
    );
  }
}

NetworksStepForm.propTypes = {
  input: PropTypes.object,
  sourceNetworks: PropTypes.array,
  targetNetworks: PropTypes.array,
  isFetchingSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool
};

export default NetworksStepForm;
