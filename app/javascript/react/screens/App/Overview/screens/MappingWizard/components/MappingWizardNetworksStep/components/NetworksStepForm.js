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

    this.state = {
      selectedSourceNetworks: [],
      selectedTargetNetwork: null
    };

    bindMethods(this, ['selectSourceNetwork', 'selectTargetNetwork']);
  }

  selectSourceNetwork(sourceNetwork) {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedSourceNetworks.some(
        selectedSourceNetwork => selectedSourceNetwork.id === sourceNetwork.id
      );
      if (isAlreadySelected) {
        return {
          selectedSourceNetworks: prevState.selectedSourceNetworks.filter(
            selectedSourceNetwork =>
              selectedSourceNetwork.id !== sourceNetwork.id
          )
        };
      }
      return {
        selectedSourceNetworks: [
          ...prevState.selectedSourceNetworks,
          sourceNetwork
        ]
      };
    });
  }

  selectTargetNetwork(targetNetwork) {
    this.setState(() => ({ selectedTargetNetwork: targetNetwork }));
  }

  render() {
    const {
      sourceNetworks,
      targetNetworks,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      input
    } = this.props;
    const {
      selectedSourceNetworks,
      selectedTargetNetwork
      // selectedMapping
    } = this.state;

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
              sourceNetworks.map(sourceNetwork => (
                <DualPaneMapperListItem
                  item={sourceNetwork}
                  key={sourceNetwork.id}
                  selected={
                    selectedSourceNetworks &&
                    selectedSourceNetworks.some(
                      selectedSourceNetwork =>
                        selectedSourceNetwork.id === sourceNetwork.id
                    )
                  }
                  handleClick={this.selectSourceNetwork}
                  handleKeyPress={this.selectSourceNetwork}
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
              targetNetworks.map(targetNetwork => (
                <DualPaneMapperListItem
                  item={targetNetwork}
                  key={targetNetwork.id}
                  selected={
                    selectedTargetNetwork &&
                    selectedTargetNetwork.id === targetNetwork.id
                  }
                  handleClick={this.selectTargetNetwork}
                  handleKeyPress={this.selectTargetNetwork}
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
