import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'patternfly-react';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../../MappingWizardTreeView/MappingWizardTreeView';
import { networkKey } from '../../../../../../../common/networkKey';
import { multiProviderTargetLabel } from '../../../helpers';

import {
  sourceNetworksFilter,
  clustersMappingWithTreeViewAttrs,
  targetNetworkWithTreeViewAttrs,
  networkGroupingForRep,
  mappingsForTreeView,
  mappingWithTargetNetworkRemoved,
  mappingWithSourceNetworkRemoved,
  getRepresentatives
} from './helpers';

class NetworksStepForm extends React.Component {
  state = {
    selectedSourceNetworks: [],
    selectedTargetNetwork: null,
    selectedNode: null
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.selectedCluster && nextProps.selectedCluster.id !== this.props.selectedCluster.id) {
      this.setState(() => ({
        selectedSourceNetworks: [],
        selectedTargetNetwork: null
      }));
    }
  }

  selectSourceNetwork = sourceNetwork => {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedSourceNetworks.some(
        selectedSourceNetwork => networkKey(selectedSourceNetwork) === networkKey(sourceNetwork)
      );
      if (isAlreadySelected) {
        return {
          selectedSourceNetworks: prevState.selectedSourceNetworks.filter(
            selectedSourceNetwork => networkKey(selectedSourceNetwork) !== networkKey(sourceNetwork)
          )
        };
      }
      return {
        selectedSourceNetworks: [...prevState.selectedSourceNetworks, sourceNetwork]
      };
    });
  };

  selectTargetNetwork = targetNetwork => {
    this.setState(() => ({ selectedTargetNetwork: targetNetwork }));
  };

  addNetworkMapping = () => {
    const {
      input: { value: networksStepMappings, onChange },
      selectedCluster,
      selectedClusterMapping,
      groupedSourceNetworks
    } = this.props;

    const { selectedTargetNetwork, selectedSourceNetworks } = this.state;

    const noMappingForTargetCluster = !networksStepMappings.some(
      targetClusterWithNetworkMappings => targetClusterWithNetworkMappings.id === selectedClusterMapping.id
    );

    const addingToExistingMapping = networksStepMappings.some(targetClusterWithNetworkMappings =>
      targetClusterWithNetworkMappings.nodes.some(networkMapping => networkMapping.id === selectedTargetNetwork.id)
    );

    if (networksStepMappings.length === 0 || noMappingForTargetCluster) {
      // ADD A NETWORKS STEP MAPPING
      //   targetCluster
      //   -- selectedTargetNetwork
      //   ----  [...network groupings for selected source networks]
      const networksStepMappingToAdd = {
        ...clustersMappingWithTreeViewAttrs(selectedClusterMapping),
        nodes: [
          {
            ...targetNetworkWithTreeViewAttrs(selectedTargetNetwork),
            nodes: selectedSourceNetworks.reduce(
              (sourceNetworks, sourceNetworkGroupRep) => [
                ...sourceNetworks,
                ...networkGroupingForRep(sourceNetworkGroupRep, groupedSourceNetworks, selectedCluster)
              ],
              []
            )
          }
        ]
      };
      onChange([...networksStepMappings, networksStepMappingToAdd]);
    } else {
      const updatedNetworksStepMappings = networksStepMappings.map(targetClusterWithNetworkMappings => {
        if (targetClusterWithNetworkMappings.id !== selectedClusterMapping.id) {
          return targetClusterWithNetworkMappings;
        } else if (addingToExistingMapping) {
          // ADD TO EXISTING NETWORKS MAPPING
          //   matchingTargetCluster
          //   -- selectedTargetNetwork
          //   ---- [...alreadyMappedSourceNetworks, ...network groupings for selected source networks]
          return {
            ...targetClusterWithNetworkMappings,
            nodes: targetClusterWithNetworkMappings.nodes.map(networkMapping => {
              if (networkMapping.id === selectedTargetNetwork.id) {
                return {
                  ...networkMapping,
                  nodes: [
                    ...networkMapping.nodes,
                    ...selectedSourceNetworks.reduce(
                      (sourceNetworks, networkGroupRep) => [
                        ...sourceNetworks,
                        ...networkGroupingForRep(networkGroupRep, groupedSourceNetworks, selectedCluster)
                      ],
                      []
                    )
                  ]
                };
              }
              return networkMapping;
            })
          };
        }
        // ADD TO EXISTING NETWORKS STEP MAPPING
        //   matchingTargetCluster
        //   -- existingNetworkMapping(s)
        //   -- selectedTargetNetwork
        //   ---- [...network groupings for selected source networks]
        return {
          ...targetClusterWithNetworkMappings,
          nodes: [
            ...targetClusterWithNetworkMappings.nodes,
            {
              ...targetNetworkWithTreeViewAttrs(selectedTargetNetwork),
              nodes: selectedSourceNetworks.reduce(
                (sourceNetworks, networkGroupRep) => [
                  ...sourceNetworks,
                  ...networkGroupingForRep(networkGroupRep, groupedSourceNetworks, selectedCluster)
                ],
                []
              )
            }
          ]
        };
      });
      onChange(updatedNetworksStepMappings);
    }

    this.setState(prevState => ({
      selectedTargetNetwork: null,
      selectedSourceNetworks: []
    }));
  };

  selectNode = selectedNode => {
    const { value: networksStepMappings, onChange } = this.props.input;
    const isTargetNetwork = selectedNode.nodes;

    if (isTargetNetwork) {
      const updatedMappings = networksStepMappings.map(targetClusterWithNetworksMappings => {
        const { nodes: networksMappings, ...targetCluster } = targetClusterWithNetworksMappings;
        return {
          ...targetCluster,
          nodes: networksMappings.map(networksMapping => {
            const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
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
      });
      onChange(updatedMappings);
    } else {
      const updatedMappings = networksStepMappings.map(targetClusterWithNetworksMappings => {
        const { nodes: networksMappings, ...targetCluster } = targetClusterWithNetworksMappings;
        return {
          ...targetCluster,
          nodes: networksMappings.map(networksMapping => {
            const { nodes: sourceNetworks, ...targetNetwork } = networksMapping;
            return {
              ...targetNetwork,
              selected: false,
              nodes: sourceNetworks.map(sourceNetwork => {
                if (networkKey(sourceNetwork) === networkKey(selectedNode)) {
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
      });
      onChange(updatedMappings);
    }
    this.setState(() => ({ selectedNode }));
  };

  removeNode = () => {
    const { value: networksStepMappings, onChange } = this.props.input;
    const { selectedNode } = this.state;
    const isTargetNetwork = selectedNode.nodes;

    // *********************
    // NETWORKS STEP MAPPING
    // *********************
    // Target Cluster
    // --> Target Network
    // ----> Source network grouping(s)

    // ****************
    // NETWORKS MAPPING
    // ****************
    // Target Network
    // --> Source network grouping(s)

    const updatedMappings = isTargetNetwork
      ? networksStepMappings.reduce((updatedNetworksStepMappings, networksStepMapping) => {
          const updatedMapping = mappingWithTargetNetworkRemoved(networksStepMapping, selectedNode);
          return updatedMapping ? [...updatedNetworksStepMappings, updatedMapping] : [...updatedNetworksStepMappings];
        }, [])
      : networksStepMappings.reduce((updatedNetworksStepMappings, networksStepMapping) => {
          const { nodes: networksMappings, ...targetCluster } = networksStepMapping;
          const updatedNodes = networksMappings.reduce((updatedNetworksMappings, networksMapping) => {
            const updatedMapping = mappingWithSourceNetworkRemoved(networksMapping, selectedNode);
            return updatedMapping ? [...updatedNetworksMappings, updatedMapping] : [...updatedNetworksMappings];
          }, []);
          return updatedNodes.length > 0
            ? [...updatedNetworksStepMappings, { ...targetCluster, nodes: updatedNodes }]
            : [...updatedNetworksStepMappings];
        }, []);

    onChange(updatedMappings);
    this.setState(() => ({ selectedNode: null }));
  };

  removeAll = () => {
    const { input } = this.props;
    input.onChange([]);
  };

  allNetworksMapped = filteredNetworks =>
    !filteredNetworks.length && (
      <div className="dual-pane-mapper-item">
        <Icon type="pf" name="ok" /> {__('All source networks have been mapped.')}
      </div>
    );

  render() {
    const {
      groupedSourceNetworks,
      groupedTargetNetworks,
      isFetchingSourceNetworks,
      isFetchingTargetNetworks,
      input,
      selectedCluster,
      targetProvider,
      preLoadingMappings
    } = this.props;
    const { selectedSourceNetworks, selectedTargetNetwork, selectedNode } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    const sourceCounter = (
      <DualPaneMapperCount
        selectedItems={selectedSourceNetworks.length}
        totalItems={sourceNetworksFilter(groupedSourceNetworks, input.value).length}
      />
    );

    const targetCounter = <DualPaneMapperCount selectedItems={selectedTargetNetwork ? 1 : 0} totalItems={1} />;

    return (
      <div className={classes}>
        <p style={{ marginLeft: -48 }}>
          {__(
            'Select one or more source networks to map to a single target. Select Add Mapping. Multiple mappings can be added.') // prettier-ignore
          }
        </p>
        <DualPaneMapper
          handleButtonClick={this.addNetworkMapping}
          validMapping={!(selectedTargetNetwork && (selectedSourceNetworks && selectedSourceNetworks.length > 0))}
        >
          <DualPaneMapperList
            id="source_networks"
            listTitle={__('Source Provider \\ Datacenter \\ Network')}
            loading={isFetchingSourceNetworks}
            counter={sourceCounter}
          >
            {groupedSourceNetworks && (
              <React.Fragment>
                {sourceNetworksFilter(groupedSourceNetworks, input.value).map(sourceNetwork => (
                  <DualPaneMapperListItem
                    item={sourceNetwork}
                    text={`${sourceNetwork.providerName} \\ ${selectedCluster.v_parent_datacenter} \\ ${
                      sourceNetwork.name
                    }`}
                    key={sourceNetwork.id}
                    selected={
                      selectedSourceNetworks &&
                      selectedSourceNetworks.some(
                        selectedSourceNetwork => networkKey(selectedSourceNetwork) === networkKey(sourceNetwork)
                      )
                    }
                    handleClick={this.selectSourceNetwork}
                    handleKeyPress={this.selectSourceNetwork}
                  />
                ))}
                {this.allNetworksMapped(sourceNetworksFilter(groupedSourceNetworks, input.value))}
              </React.Fragment>
            )}
          </DualPaneMapperList>
          <DualPaneMapperList
            id="target_networks"
            listTitle={multiProviderTargetLabel(targetProvider, 'network')}
            loading={isFetchingTargetNetworks}
            counter={targetCounter}
          >
            {groupedTargetNetworks &&
              getRepresentatives(groupedTargetNetworks).map(targetNetwork => (
                <DualPaneMapperListItem
                  item={targetNetwork}
                  text={`${targetNetwork.providerName} \\ ${targetNetwork.name}`}
                  key={targetNetwork.id}
                  selected={selectedTargetNetwork && networkKey(selectedTargetNetwork) === networkKey(targetNetwork)}
                  handleClick={this.selectTargetNetwork}
                  handleKeyPress={this.selectTargetNetwork}
                />
              ))}
          </DualPaneMapperList>
        </DualPaneMapper>
        <MappingWizardTreeView
          mappings={mappingsForTreeView(input.value)}
          selectNode={this.selectNode}
          removeNode={this.removeNode}
          removeAll={this.removeAll}
          selectedNode={selectedNode}
          loading={isFetchingSourceNetworks || isFetchingTargetNetworks || preLoadingMappings}
        />
      </div>
    );
  }
}

NetworksStepForm.propTypes = {
  input: PropTypes.object,
  groupedSourceNetworks: PropTypes.object,
  groupedTargetNetworks: PropTypes.object,
  isFetchingSourceNetworks: PropTypes.bool,
  isFetchingTargetNetworks: PropTypes.bool,
  selectedCluster: PropTypes.object,
  selectedClusterMapping: PropTypes.object,
  targetProvider: PropTypes.string,
  preLoadingMappings: PropTypes.bool
};

export default NetworksStepForm;
