import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
// import DatastoresStepTreeView from './DatastoresStepTreeView';

import { sourceNetworksFilter } from '../MappingWizardNetworksStepSelectors';

class NetworksStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSourceNetworks: [],
      selectedTargetNetwork: null
    };

    bindMethods(this, [
      'selectSourceNetwork',
      'selectTargetNetwork',
      'addNetworkMapping'
    ]);
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

  addNetworkMapping() {
    const { input, selectedClusterMapping } = this.props;

    this.setState(prevState => {
      const networksStepMappings = input.value;

      const noMappingForTargetCluster = !networksStepMappings.some(
        targetClusterWithNetworkMappings =>
          // targetClusterWithNetworkMappings: { ...targetCluster, nodes: [...networkMappings] }
          // selectedClusterMapping: { ...targetCluster, nodes: [...sourceClusters (one of which is currently selected)]}
          targetClusterWithNetworkMappings.id === selectedClusterMapping.id
      );

      const addingToExistingMapping = networksStepMappings.some(
        targetClusterWithNetworkMappings =>
          targetClusterWithNetworkMappings.nodes.some(
            networkMapping =>
              // networkMapping: { ...targetNetwork, nodes: [...sourceNetworks] }
              networkMapping.id === prevState.selectedTargetNetwork.id
          )
      );

      if (networksStepMappings.length === 0 || noMappingForTargetCluster) {
        // There are no mappings, or there does not already exist a node for
        // a mapped target cluster
        input.onChange([
          ...networksStepMappings,
          {
            ...selectedClusterMapping,
            text: selectedClusterMapping.name,
            selectable: false,
            nodes: [
              {
                ...prevState.selectedTargetNetwork,
                text: prevState.selectedTargetNetwork.name,
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceNetworks.map(network => ({
                  ...network,
                  text: network.name,
                  icon: 'fa fa-file-o'
                }))
              }
            ]
          }
        ]);
      } else {
        input.onChange(
          networksStepMappings.map(targetClusterWithNetworkMappings => {
            // We are not adding a network mapping to this target cluster
            if (
              targetClusterWithNetworkMappings.id !== selectedClusterMapping.id
            ) {
              return targetClusterWithNetworkMappings;
              // There already exists a mapping for the currently selected target
              // network and we need to append the currently selected source networks
              // to its source networks array
            } else if (addingToExistingMapping) {
              return {
                ...targetClusterWithNetworkMappings,
                nodes: targetClusterWithNetworkMappings.nodes.map(
                  networkMapping => {
                    // networkMapping: { ...targetNetwork, nodes: [...sourceNetworks] }
                    // If the target network for this mapping matches the currently
                    // selected target network, add the currently selected source
                    // networks to its source networks array
                    if (
                      networkMapping.id === prevState.selectedTargetNetwork.id
                    ) {
                      return {
                        ...networkMapping,
                        nodes: networkMapping.nodes.concat(
                          prevState.selectedSourceNetworks.map(network => ({
                            ...network,
                            text: network.name,
                            icon: 'fa fa-file-o'
                          }))
                        )
                      };
                    }
                    return networkMapping;
                  }
                )
              };
            }
            // We are creating a new mapping to add under the target cluster
            return {
              ...targetClusterWithNetworkMappings,
              nodes: targetClusterWithNetworkMappings.nodes.concat({
                ...prevState.selectedTargetNetwork,
                text: prevState.selectedTargetNetwork.name,
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceNetworks.map(network => ({
                  ...network,
                  text: network.name,
                  icon: 'fa fa-file-o'
                }))
              })
            };
          })
        );
      }
      return {
        selectedTargetNetwork: null,
        selectedSourceNetworks: []
      };
    });
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
          handleButtonClick={this.addNetworkMapping}
          validMapping={
            !(
              selectedTargetNetwork &&
              (selectedSourceNetworks && selectedSourceNetworks.length > 0)
            )
          }
        >
          <DualPaneMapperList
            listTitle="Source Networks"
            loading={isFetchingSourceNetworks}
          >
            {sourceNetworks &&
              sourceNetworksFilter(sourceNetworks, input.value).map(
                sourceNetwork => (
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
                )
              )}
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
