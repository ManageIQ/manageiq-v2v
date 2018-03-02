import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';
import cx from 'classnames';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
import MappingWizardTreeView from '../../MappingWizardTreeView/MappingWizardTreeView';

import { sourceDatastoreFilter } from '../MappingWizardDatastoresStepSelectors';
import {
  diskSpaceInfo,
  sourceDatastoreInfo,
  targetDatastoreInfo
} from './helpers';

class DatastoresStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSourceDatastores: [],
      selectedTargetDatastore: null,
      selectedMapping: null
    };

    bindMethods(this, [
      'selectSourceDatastore',
      'selectTargetDatastore',
      'addDatastoreMapping',
      'selectMapping',
      'removeMapping',
      'removeAll'
    ]);
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.selectedCluster &&
      nextProps.selectedCluster.id !== this.props.selectedCluster.id
    ) {
      this.setState(() => ({
        selectedSourceDatastores: [],
        selectedTargetDatastore: null
      }));
    }
  }

  selectSourceDatastore(sourceDatastore) {
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
        selectedSourceDatastores: [
          ...prevState.selectedSourceDatastores,
          sourceDatastore
        ]
      };
    });
  }

  selectTargetDatastore(targetDatastore) {
    this.setState(() => ({ selectedTargetDatastore: targetDatastore }));
  }

  addDatastoreMapping() {
    const { input, selectedCluster, selectedClusterMapping } = this.props;

    const { selectedTargetDatastore } = this.state;

    const noMappingForTargetCluster = !input.value.some(
      datastoreMapping => datastoreMapping.id === selectedClusterMapping.id
    );

    const addingToExistingMapping = input.value.some(
      targetClusterDatastoreMappings =>
        targetClusterDatastoreMappings.nodes.some(
          datastoreMapping => datastoreMapping.id === selectedTargetDatastore.id
        )
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
                text: diskSpaceInfo(
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
                      text: diskSpaceInfo(
                        mapping,
                        mapping.nodes.concat(prevState.selectedSourceDatastores)
                      ),
                      nodes: mapping.nodes.concat(
                        prevState.selectedSourceDatastores.map(datastore => ({
                          ...datastore,
                          text: datastore.name,
                          icon: 'fa fa-file-o',
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
                text: diskSpaceInfo(
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
  }

  selectMapping(selectedMapping) {
    const { input } = this.props;

    input.onChange(
      input.value.map(targetClusterDatastoreMappings => {
        const updatedMappings = targetClusterDatastoreMappings.nodes.map(
          datastoreMapping => {
            if (datastoreMapping.id === selectedMapping.id) {
              return {
                ...datastoreMapping,
                selected: !datastoreMapping.selected
              };
            } else if (
              datastoreMapping.id !== selectedMapping.id &&
              datastoreMapping.selected
            ) {
              return { ...datastoreMapping, selected: false };
            }
            return datastoreMapping;
          }
        );
        return { ...targetClusterDatastoreMappings, nodes: updatedMappings };
      })
    );
    this.setState(() => ({ selectedMapping }));
  }

  removeMapping() {
    const { input } = this.props;
    const { selectedMapping } = this.state;
    const datastoresStepMappings = input.value;

    const updatedDatastoresStepMappings = datastoresStepMappings
      .map(targetClusterWithDatastoreMappings => {
        const containsMappingToRemove = targetClusterWithDatastoreMappings.nodes.some(
          mapping => mapping.id === selectedMapping.id
        );
        if (!containsMappingToRemove) {
          return targetClusterWithDatastoreMappings;
        }
        const updatedDatastoreMappings = targetClusterWithDatastoreMappings.nodes.filter(
          datastoreMapping => !(datastoreMapping.id === selectedMapping.id)
        );
        if (updatedDatastoreMappings.length === 0) {
          return undefined;
        }
        return {
          ...targetClusterWithDatastoreMappings,
          nodes: updatedDatastoreMappings
        };
      })
      .filter(item => item !== undefined);

    input.onChange(updatedDatastoresStepMappings);
    this.setState(() => ({ selectedMapping: null }));
  }

  removeAll() {
    const { input } = this.props;
    input.onChange([]);
  }

  render() {
    const {
      sourceDatastores,
      targetDatastores,
      isFetchingSourceDatastores,
      isFetchingTargetDatastores,
      input,
      selectedCluster
    } = this.props;
    const {
      selectedSourceDatastores,
      selectedTargetDatastore,
      selectedMapping
    } = this.state;

    const classes = cx('dual-pane-mapper-form', {
      'is-hidden': !selectedCluster
    });

    return (
      <div className={classes}>
        <DualPaneMapper
          handleButtonClick={this.addDatastoreMapping}
          validMapping={
            !(
              selectedTargetDatastore &&
              (selectedSourceDatastores && selectedSourceDatastores.length > 0)
            )
          }
        >
          <DualPaneMapperList
            listTitle="Source Datastores"
            loading={isFetchingSourceDatastores}
          >
            {sourceDatastores &&
              sourceDatastoreFilter(sourceDatastores, input.value).map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={sourceDatastoreInfo(item)}
                  key={item.id}
                  selected={
                    selectedSourceDatastores &&
                    selectedSourceDatastores.some(
                      sourceDatastore => sourceDatastore.id === item.id
                    )
                  }
                  handleClick={this.selectSourceDatastore}
                  handleKeyPress={this.selectSourceDatastore}
                />
              ))}
            <DualPaneMapperCount
              selectedItems={selectedSourceDatastores.length}
              totalItems={
                sourceDatastoreFilter(sourceDatastores, input.value).length
              }
            />
          </DualPaneMapperList>
          <DualPaneMapperList
            listTitle="Target Datastores"
            loading={isFetchingTargetDatastores}
          >
            {targetDatastores &&
              targetDatastores.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={targetDatastoreInfo(item, input.value)}
                  key={item.id}
                  selected={
                    selectedTargetDatastore &&
                    selectedTargetDatastore.id === item.id
                  }
                  handleClick={this.selectTargetDatastore}
                  handleKeyPress={this.selectTargetDatastore}
                />
              ))}
          </DualPaneMapperList>
        </DualPaneMapper>
        <MappingWizardTreeView
          mappings={input.value}
          selectMapping={this.selectMapping}
          removeMapping={this.removeMapping}
          removeAll={this.removeAll}
          selectedMapping={selectedMapping}
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
  isFetchingTargetDatastores: PropTypes.bool
};
