import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../../MappingWizardTreeView/MappingWizardTreeView';

import { sourceDatastoreFilter } from '../../MappingWizardDatastoresStepSelectors';
import {
  targetDatastoreTreeViewInfo,
  sourceDatastoreInfo,
  targetDatastoreInfo,
  targetDatastoreAvailableSpace,
  totalUsedSpace,
  errorMessage,
  updateMappings
} from './helpers';

class DatastoresStepForm extends React.Component {
  state = {
    selectedSourceDatastores: [],
    selectedTargetDatastore: null,
    selectedNode: null
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedCluster && nextProps.selectedCluster.id !== this.props.selectedCluster.id) {
      this.setState(() => ({
        selectedSourceDatastores: [],
        selectedTargetDatastore: null
      }));
    }
  }

  selectSourceDatastore = sourceDatastore => {
    const { selectedTargetDatastore, selectedSourceDatastores } = this.state;
    const { value: datastoresStepMappings } = this.props.input;
    const { showAlertAction, hideAlertAction } = this.props;

    const mappingExistsForTargetDatastore =
      selectedTargetDatastore &&
      datastoresStepMappings.some(targetClusterWithDatastoreMappings =>
        targetClusterWithDatastoreMappings.nodes.some(
          targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id === selectedTargetDatastore.id
        )
      );

    const isNotAlreadySelected = !selectedSourceDatastores.some(datastore => datastore.id === sourceDatastore.id);

    if (
      selectedTargetDatastore &&
      mappingExistsForTargetDatastore &&
      isNotAlreadySelected &&
      targetDatastoreAvailableSpace(selectedTargetDatastore, datastoresStepMappings) <
        totalUsedSpace([...selectedSourceDatastores, sourceDatastore])
    ) {
      showAlertAction(errorMessage);
    } else if (
      selectedTargetDatastore &&
      isNotAlreadySelected &&
      selectedTargetDatastore.free_space < totalUsedSpace([...selectedSourceDatastores, sourceDatastore])
    ) {
      showAlertAction(errorMessage);
    } else {
      this.setState(prevState => {
        const isAlreadySelected = prevState.selectedSourceDatastores.some(
          datastore => datastore.id === sourceDatastore.id
        );
        if (isAlreadySelected) {
          return {
            selectedSourceDatastores: prevState.selectedSourceDatastores.filter(
              datastore => datastore.id !== sourceDatastore.id
            )
          };
        }
        hideAlertAction();
        return {
          selectedSourceDatastores: [...prevState.selectedSourceDatastores, sourceDatastore]
        };
      });
    }
  };

  selectTargetDatastore = targetDatastore => {
    const { selectedSourceDatastores } = this.state;
    const { value: datastoresStepMappings } = this.props.input;
    const { showAlertAction, hideAlertAction } = this.props;

    const mappingExistsForTargetDatastore = datastoresStepMappings.some(targetClusterWithDatastoreMappings =>
      targetClusterWithDatastoreMappings.nodes.some(
        targetDatastoreWithSourceDatastores => targetDatastoreWithSourceDatastores.id === targetDatastore.id
      )
    );

    if (
      selectedSourceDatastores.length > 0 &&
      mappingExistsForTargetDatastore &&
      targetDatastoreAvailableSpace(targetDatastore, datastoresStepMappings) < totalUsedSpace(selectedSourceDatastores)
    ) {
      showAlertAction(errorMessage);
    } else if (
      selectedSourceDatastores.length > 0 &&
      targetDatastore.free_space < totalUsedSpace(selectedSourceDatastores)
    ) {
      showAlertAction(errorMessage);
    } else {
      hideAlertAction();
      this.setState(() => ({ selectedTargetDatastore: targetDatastore }));
    }
  };

  addDatastoreMapping = () => {
    const { input, selectedCluster, selectedClusterMapping } = this.props;

    const { selectedTargetDatastore } = this.state;

    const noMappingForTargetCluster = !input.value.some(
      datastoreMapping => datastoreMapping.id === selectedClusterMapping.id
    );

    const addingToExistingMapping = input.value.some(targetClusterDatastoreMappings =>
      targetClusterDatastoreMappings.nodes.some(datastoreMapping => datastoreMapping.id === selectedTargetDatastore.id)
    );

    this.setState(prevState => {
      if (input.value.length === 0 || noMappingForTargetCluster) {
        input.onChange([
          ...input.value,
          {
            ...selectedClusterMapping,
            text: selectedClusterMapping.name,
            selectable: false,
            nodes: [
              {
                ...prevState.selectedTargetDatastore,
                text: targetDatastoreTreeViewInfo(
                  prevState.selectedTargetDatastore,
                  prevState.selectedSourceDatastores
                ),
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceDatastores.map(datastore => ({
                  ...datastore,
                  text: datastore.name,
                  icon: 'fa fa-file-o',
                  selectable: true,
                  selected: false,
                  sourceClusterId: selectedCluster.id
                }))
              }
            ]
          }
        ]);
      } else {
        input.onChange(
          input.value.map(datastoreMapping => {
            if (datastoreMapping.id !== selectedClusterMapping.id) {
              return datastoreMapping;
            } else if (addingToExistingMapping) {
              return {
                ...datastoreMapping,
                nodes: datastoreMapping.nodes.map(mapping => {
                  if (mapping.id === prevState.selectedTargetDatastore.id) {
                    return {
                      ...mapping,
                      text: targetDatastoreTreeViewInfo(
                        mapping,
                        mapping.nodes.concat(prevState.selectedSourceDatastores)
                      ),
                      nodes: mapping.nodes.concat(
                        prevState.selectedSourceDatastores.map(datastore => ({
                          ...datastore,
                          text: datastore.name,
                          icon: 'fa fa-file-o',
                          selectable: true,
                          selected: false,
                          sourceClusterId: selectedCluster.id
                        }))
                      )
                    };
                  }
                  return mapping;
                })
              };
            }
            return {
              ...datastoreMapping,
              nodes: datastoreMapping.nodes.concat({
                ...prevState.selectedTargetDatastore,
                text: targetDatastoreTreeViewInfo(
                  prevState.selectedTargetDatastore,
                  prevState.selectedSourceDatastores
                ),
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceDatastores.map(datastore => ({
                  ...datastore,
                  text: datastore.name,
                  icon: 'fa fa-file-o',
                  selectable: true,
                  selected: false,
                  sourceClusterId: selectedCluster.id
                }))
              })
            };
          })
        );
      }
      return {
        selectedTargetDatastore: null,
        selectedSourceDatastores: []
      };
    });
  };

  selectNode = selectedNode => {
    const { value: datastoresStepMappings, onChange } = this.props.input;
    const isTargetDatastore = selectedNode.nodes;

    if (isTargetDatastore) {
      const updatedMappings = datastoresStepMappings.map(targetClusterWithDatastoresMappings => {
        const { nodes: datastoresMappings, ...targetCluster } = targetClusterWithDatastoresMappings;
        return {
          ...targetCluster,
          nodes: datastoresMappings.map(datastoresMapping => {
            const { nodes: sourceDatastores, ...targetDatastore } = datastoresMapping;
            return targetDatastore.id === selectedNode.id
              ? {
                  ...targetDatastore,
                  selected: !targetDatastore.selected,
                  nodes: sourceDatastores.map(sourceDatastore => ({
                    ...sourceDatastore,
                    selected: false
                  }))
                }
              : {
                  ...targetDatastore,
                  selected: false,
                  nodes: sourceDatastores.map(sourceDatastore => ({
                    ...sourceDatastore,
                    selected: false
                  }))
                };
          })
        };
      });
      onChange(updatedMappings);
    } else {
      const updatedMappings = datastoresStepMappings.map(targetClusterWithDatastoresMappings => {
        const { nodes: datastoresMappings, ...targetCluster } = targetClusterWithDatastoresMappings;
        return {
          ...targetCluster,
          nodes: datastoresMappings.map(datastoresMapping => {
            const { nodes: sourceDatastores, ...targetDatastore } = datastoresMapping;
            return {
              ...targetDatastore,
              selected: false,
              nodes: sourceDatastores.map(sourceDatastore => {
                if (sourceDatastore.id === selectedNode.id) {
                  return {
                    ...sourceDatastore,
                    selected: !sourceDatastore.selected
                  };
                } else if (sourceDatastore.selected) {
                  return {
                    ...sourceDatastore,
                    selected: false
                  };
                }
                return sourceDatastore;
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
    const { value: datastoresStepMappings, onChange } = this.props.input;
    const { selectedNode } = this.state;

    const updatedMappings = datastoresStepMappings
      .map(targetClusterWithDatastoresMappings => updateMappings(targetClusterWithDatastoresMappings, selectedNode))
      .filter(item => item !== undefined);
    onChange(updatedMappings);

    this.setState(() => ({ selectedNode: null }));
  };

  removeAll = () => {
    const { input } = this.props;
    input.onChange([]);
  };

  render() {
    const {
      sourceDatastores,
      targetDatastores,
      isFetchingSourceDatastores,
      isFetchingTargetDatastores,
      input,
      selectedCluster
    } = this.props;
    const { selectedSourceDatastores, selectedTargetDatastore, selectedNode } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    const counter = (
      <DualPaneMapperCount
        selectedItems={selectedSourceDatastores.length}
        totalItems={sourceDatastoreFilter(sourceDatastores, input.value).length}
      />
    );

    return (
      <div className={classes}>
        <DualPaneMapper
          handleButtonClick={this.addDatastoreMapping}
          validMapping={!(selectedTargetDatastore && (selectedSourceDatastores && selectedSourceDatastores.length > 0))}
        >
          <DualPaneMapperList
            id="source_datastores"
            listTitle={__('Source Datastores')}
            loading={isFetchingSourceDatastores}
            counter={counter}
          >
            {sourceDatastores &&
              sourceDatastoreFilter(sourceDatastores, input.value).map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={sourceDatastoreInfo(item)}
                  key={item.id}
                  selected={
                    selectedSourceDatastores &&
                    selectedSourceDatastores.some(sourceDatastore => sourceDatastore.id === item.id)
                  }
                  handleClick={this.selectSourceDatastore}
                  handleKeyPress={this.selectSourceDatastore}
                />
              ))}
          </DualPaneMapperList>
          <DualPaneMapperList
            id="target_datastores"
            listTitle={__('Target Datastores')}
            loading={isFetchingTargetDatastores}
          >
            {targetDatastores &&
              targetDatastores.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={targetDatastoreInfo(item, input.value)}
                  key={item.id}
                  selected={selectedTargetDatastore && selectedTargetDatastore.id === item.id}
                  handleClick={this.selectTargetDatastore}
                  handleKeyPress={this.selectTargetDatastore}
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

export default DatastoresStepForm;

DatastoresStepForm.propTypes = {
  input: PropTypes.object,
  selectedCluster: PropTypes.object,
  selectedClusterMapping: PropTypes.object,
  sourceDatastores: PropTypes.array,
  targetDatastores: PropTypes.array,
  isFetchingSourceDatastores: PropTypes.bool,
  isFetchingTargetDatastores: PropTypes.bool,
  showAlertAction: PropTypes.func,
  hideAlertAction: PropTypes.func
};
