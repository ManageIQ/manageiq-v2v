import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';
import cx from 'classnames';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../MappingWizardTreeView/MappingWizardTreeView';

import { sourceNetworksFilter } from '../MappingWizardNetworksStepSelectors';

class NetworksStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSourceNetworks: [],
      selectedTargetNetwork: null,
      selectedNode: null
    };

    bindMethods(this, [
      'selectSourceNetwork',
      'selectTargetNetwork',
      'addNetworkMapping',
      'selectNode',
      'removeNode',
      'removeAll'
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedCluster &&
      nextProps.selectedCluster.id !== this.props.selectedCluster.id
    ) {
      this.setState(() => ({
        selectedSourceNetworks: [],
        selectedTargetNetwork: null
      }));
    }
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
    const { input, selectedCluster, selectedClusterMapping } = this.props;

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
                  icon: 'fa fa-file-o',
                  sourceClusterId: selectedCluster.id,
                  selectable: true,
                  selected: false
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
                            icon: 'fa fa-file-o',
                            sourceClusterId: selectedCluster.id,
                            selectable: true,
                            selected: false
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
                  icon: 'fa fa-file-o',
                  sourceClusterId: selectedCluster.id,
                  selectable: true,
                  selected: false
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

  selectNode(selectedNode) {
    const { value: networksStepMappings, onChange } = this.props.input;
    const isTargetNetwork = selectedNode.nodes;

    if (isTargetNetwork) {
      const updatedMappings = networksStepMappings.map(
        targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          return {
            ...targetCluster,
            nodes: networksMappings.map(networksMapping => {
              const {
                nodes: sourceNetworks,
                ...targetNetwork
              } = networksMapping;
              return targetNetwork.id === selectedNode.id
                ? {
                    ...targetNetwork,
                    selected: !targetNetwork.selected,
                    nodes: sourceNetworks.map(sourceNetwork => ({
                      ...sourceNetwork,
                      selected: false
                    }))
                  }
                : {
                    ...targetNetwork,
                    selected: false,
                    nodes: sourceNetworks.map(sourceNetwork => ({
                      ...sourceNetwork,
                      selected: false
                    }))
                  };
            })
          };
        }
      );
      onChange(updatedMappings);
    } else {
      const updatedMappings = networksStepMappings.map(
        targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          return {
            ...targetCluster,
            nodes: networksMappings.map(networksMapping => {
              const {
                nodes: sourceNetworks,
                ...targetNetwork
              } = networksMapping;
              return {
                ...targetNetwork,
                selected: false,
                nodes: sourceNetworks.map(sourceNetwork => {
                  if (sourceNetwork.id === selectedNode.id) {
                    return {
                      ...sourceNetwork,
                      selected: !sourceNetwork.selected
                    };
                  } else if (sourceNetwork.selected) {
                    return {
                      ...sourceNetwork,
                      selected: false
                    };
                  }
                  return sourceNetwork;
                })
              };
            })
          };
        }
      );
      onChange(updatedMappings);
    }
    this.setState(() => ({ selectedNode }));
  }

  removeNode() {
    const { value: networksStepMappings, onChange } = this.props.input;
    const { selectedNode } = this.state;
    const isTargetNetwork = selectedNode.nodes;

    if (isTargetNetwork) {
      const updatedMappings = networksStepMappings
        .map(targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          const updatedNetworksMappings = networksMappings.filter(
            targetNetworkWithSourceNetworks =>
              targetNetworkWithSourceNetworks.id !== selectedNode.id
          );
          return updatedNetworksMappings.length === 0
            ? undefined
            : {
                ...targetCluster,
                nodes: updatedNetworksMappings
              };
        })
        .filter(item => item !== undefined);
      onChange(updatedMappings);
    } else {
      const updatedMappings = networksStepMappings
        .map(targetClusterWithNetworksMappings => {
          const {
            nodes: networksMappings,
            ...targetCluster
          } = targetClusterWithNetworksMappings;
          const updatedNetworksMappings = networksMappings
            .map(networksMapping => {
              const {
                nodes: sourceNetworks,
                ...targetNetwork
              } = networksMapping;
              const updatedSourceNetworks = sourceNetworks.filter(
                sourceNetwork => sourceNetwork.id !== selectedNode.id
              );
              return updatedSourceNetworks.length === 0
                ? undefined
                : {
                    ...targetNetwork,
                    nodes: updatedSourceNetworks
                  };
            })
            .filter(item => item !== undefined);
          return updatedNetworksMappings.length === 0
            ? undefined
            : {
                ...targetCluster,
                nodes: updatedNetworksMappings
              };
        })
        .filter(item => item !== undefined);
      onChange(updatedMappings);
    }
    this.setState(() => ({ selectedNode: null }));
  }

  removeAll() {
    const { input } = this.props;
    input.onChange([]);
  }

  render() {
    const {
      sourceNetworks,
      targetNetworks,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      input,
      selectedCluster
    } = this.props;
    const {
      selectedSourceNetworks,
      selectedTargetNetwork,
      selectedNode
    } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    return (
      <div className={classes}>
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
                    text={sourceNetwork.name}
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
            <DualPaneMapperCount
              selectedItems={selectedSourceNetworks.length}
              totalItems={
                sourceNetworksFilter(sourceNetworks, input.value).length
              }
            />
          </DualPaneMapperList>
          <DualPaneMapperList
            listTitle="Target Networks"
            loading={isFetchingTargetNetworks}
          >
            {targetNetworks &&
              targetNetworks.map(targetNetwork => (
                <DualPaneMapperListItem
                  item={targetNetwork}
                  text={targetNetwork.name}
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
        <MappingWizardTreeView
          mappings={input.value}
          selectNode={this.selectNode}
          removeNode={this.removeNode}
          removeAll={this.removeAll}
          selectedNode={selectedNode}
        />
      </div>
    );
  }
}

NetworksStepForm.propTypes = {
  input: PropTypes.object,
  sourceNetworks: PropTypes.array,
  targetNetworks: PropTypes.array,
  isFetchingSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  selectedCluster: PropTypes.object,
  selectedClusterMapping: PropTypes.object
};

export default NetworksStepForm;
