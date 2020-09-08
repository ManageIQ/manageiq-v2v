import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Icon } from 'patternfly-react';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../../MappingWizardTreeView/MappingWizardTreeView';

import { sourceDatastoreFilter } from '../../MappingWizardDatastoresStepSelectors';
import { targetDatastoreTreeViewInfo, sourceDatastoreInfo, targetDatastoreInfo, updateMappings } from './helpers';
import { multiProviderTargetLabel } from '../../../helpers';
import { sortBy } from '../../../../helpers';

class DatastoresStepForm extends React.Component {
  state = {
    selectedSourceDatastores: [],
    selectedTargetDatastore: null,
    selectedNode: null,
    sourceSearchText: '',
    targetSearchText: ''
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.selectedCluster && nextProps.selectedCluster.id !== this.props.selectedCluster.id) {
      this.setState(() => ({
        selectedSourceDatastores: [],
        selectedTargetDatastore: null
      }));
    }
  }

  selectSourceDatastore = sourceDatastore => {
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
      return {
        selectedSourceDatastores: [...prevState.selectedSourceDatastores, sourceDatastore]
      };
    });
  };

  selectTargetDatastore = targetDatastore => {
    this.setState(() => ({ selectedTargetDatastore: targetDatastore }));
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

  noDatastoresFound = (datastores, loading) =>
    !datastores.length &&
    !loading && (
      <div className="dual-pane-mapper-item">
        <Icon type="pf" name="error-circle-o" /> {__('No datastores found.')}
      </div>
    );

  allDatastoresMapped = (sourceDatastores, filteredDatastores, loading) =>
    !!sourceDatastores.length &&
    !filteredDatastores.length &&
    !loading && (
      <div className="dual-pane-mapper-item">
        <Icon type="pf" name="ok" /> {__('All source datastores have been mapped.')}
      </div>
    );

  noSearchResults = (results, searchText) =>
    results.length === 0 && searchText !== '' ? (
      <div className="dual-pane-mapper-item">{__('No datastores match your search.')}</div>
    ) : null;

  render() {
    const {
      sourceDatastores,
      targetDatastores,
      isFetchingSourceDatastores,
      isFetchingTargetDatastores,
      input,
      selectedCluster,
      targetProvider,
      preLoadingMappings
    } = this.props;
    const {
      selectedSourceDatastores,
      selectedTargetDatastore,
      selectedNode,
      sourceSearchText,
      targetSearchText
    } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    const filteredSourceDatastores = sortBy(sourceDatastoreInfo)(sourceDatastoreFilter(sourceDatastores, input.value));
    const sortedTargetDatastores = sortBy(targetDatastoreInfo)(targetDatastores);

    const getSearchResults = (items, searchText, getItemText) =>
      !items
        ? []
        : items.filter(
            item =>
              searchText === '' ||
              getItemText(item)
                .toLowerCase()
                .includes(searchText.toLowerCase())
          );
    const sourceResults = getSearchResults(filteredSourceDatastores, sourceSearchText, sourceDatastoreInfo);
    const targetResults = getSearchResults(sortedTargetDatastores, targetSearchText, targetDatastoreInfo);

    const sourceCounter = (
      <DualPaneMapperCount
        selectedItems={selectedSourceDatastores.length}
        totalItems={filteredSourceDatastores.length}
      />
    );

    const targetCounter = <DualPaneMapperCount selectedItems={selectedTargetDatastore ? 1 : 0} totalItems={1} />;

    return (
      <div className={classes}>
        <p style={{ marginLeft: -40 }}>
          {__('Select source datastore(s) and a target datastore and click Add Mapping to add the mapping. Multiple mappings can be added.') /* prettier-ignore */}
        </p>
        <DualPaneMapper
          handleButtonClick={this.addDatastoreMapping}
          validMapping={!(selectedTargetDatastore && (selectedSourceDatastores && selectedSourceDatastores.length > 0))}
        >
          <DualPaneMapperList
            id="source_datastores"
            listTitle={__('Source Provider \\ Datacenter \\ Datastore')}
            searchAriaLabel={__('Search source datastores')}
            searchText={sourceSearchText}
            onSearchChange={value => this.setState({ sourceSearchText: value })}
            loading={isFetchingSourceDatastores}
            counter={sourceCounter}
          >
            {sourceDatastores && (
              <React.Fragment>
                {sourceResults.map(item => (
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
                {this.noDatastoresFound(sourceDatastores, isFetchingSourceDatastores)}
                {this.allDatastoresMapped(sourceDatastores, filteredSourceDatastores, isFetchingSourceDatastores)}
                {this.noSearchResults(sourceResults, sourceSearchText)}
              </React.Fragment>
            )}
          </DualPaneMapperList>
          <DualPaneMapperList
            id="target_datastores"
            listTitle={multiProviderTargetLabel(targetProvider, 'storage')}
            searchAriaLabel={__('Search target datastores')}
            searchText={targetSearchText}
            onSearchChange={value => this.setState({ targetSearchText: value })}
            loading={isFetchingTargetDatastores}
            counter={targetCounter}
          >
            {targetDatastores && (
              <React.Fragment>
                {targetResults.map(item => (
                  <DualPaneMapperListItem
                    item={item}
                    text={targetDatastoreInfo(item)}
                    key={item.id}
                    selected={selectedTargetDatastore && selectedTargetDatastore.id === item.id}
                    handleClick={this.selectTargetDatastore}
                    handleKeyPress={this.selectTargetDatastore}
                  />
                ))}
                {this.noSearchResults(targetResults, targetSearchText)}
              </React.Fragment>
            )}
          </DualPaneMapperList>
        </DualPaneMapper>
        <MappingWizardTreeView
          mappings={input.value}
          selectNode={this.selectNode}
          removeNode={this.removeNode}
          removeAll={this.removeAll}
          selectedNode={selectedNode}
          loading={isFetchingSourceDatastores || isFetchingTargetDatastores || preLoadingMappings}
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
  targetProvider: PropTypes.string,
  preLoadingMappings: PropTypes.bool
};
