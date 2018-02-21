import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
import DatastoresStepTreeView from './DatastoresStepTreeView';

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
    const {
      input,
      selectedClusterMapping,
      removeSourceDatastores,
      removeTargetDatastore
    } = this.props;

    const noMappingForTargetCluster = !input.value.some(
      datastoreMapping => datastoreMapping.id === selectedClusterMapping.id
    );

    this.setState(prevState => {
      removeSourceDatastores(prevState.selectedSourceDatastores);
      removeTargetDatastore(prevState.selectedTargetDatastore);
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
                text: prevState.selectedTargetDatastore.name,
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceDatastores.map(datastore => ({
                  ...datastore,
                  text: datastore.name,
                  icon: 'fa fa-file-o'
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
            }
            return {
              ...datastoreMapping,
              nodes: datastoreMapping.nodes.concat({
                ...prevState.selectedTargetDatastore,
                text: prevState.selectedTargetDatastore.name,
                selectable: true,
                selected: false,
                state: {
                  expanded: true
                },
                nodes: prevState.selectedSourceDatastores.map(datastore => ({
                  ...datastore,
                  text: datastore.name,
                  icon: 'fa fa-file-o'
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
    const updatedMappings = input.value[0].nodes.map(mapping => {
      if (mapping.id === selectedMapping.id) {
        return { ...mapping, selected: !mapping.selected };
      } else if (mapping.id !== selectedMapping.id && mapping.selected) {
        return { ...mapping, selected: false };
      }
      return mapping;
    });
    input.onChange([{ ...input.value[0], nodes: updatedMappings }]);
    this.setState(() => ({ selectedMapping }));
  }

  removeMapping() {
    const { addTargetDatastore, addSourceDatastores, input } = this.props;
    this.setState(prevState => {
      const { nodes, ...targetDatastore } = prevState.selectedMapping;
      addTargetDatastore(targetDatastore);
      addSourceDatastores(nodes);
      if (input.value[0].nodes.length > 1) {
        input.onChange([
          {
            ...input.value[0],
            nodes: input.value[0].nodes.filter(
              mapping => !(mapping.id === prevState.selectedMapping.id)
            )
          }
        ]);
      } else {
        input.onChange([]);
      }
      return {
        selectedMapping: null
      };
    });
  }

  removeAll() {
    const { addTargetDatastore, addSourceDatastores, input } = this.props;
    input.value[0].nodes.forEach(mapping => {
      const { nodes, ...targetCluster } = mapping;
      addTargetDatastore(targetCluster);
      addSourceDatastores(nodes);
    });
    input.onChange([]);
  }

  render() {
    const { sourceDatastores, targetDatastores, input } = this.props;
    const {
      selectedSourceDatastores,
      selectedTargetDatastore,
      selectedMapping
    } = this.state;
    return (
      <div className="dual-pane-mapper-form">
        <DualPaneMapper handleButtonClick={this.addDatastoreMapping}>
          <DualPaneMapperList listTitle="Source Datastores">
            {sourceDatastores &&
              sourceDatastores.map(item => (
                <DualPaneMapperListItem
                  item={item}
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
              totalItems={sourceDatastores.length}
            />
          </DualPaneMapperList>
          <DualPaneMapperList listTitle="Target Datastores">
            {targetDatastores &&
              targetDatastores.map(item => (
                <DualPaneMapperListItem
                  item={item}
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
        <DatastoresStepTreeView
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
  selectedClusterMapping: PropTypes.object,
  removeSourceDatastores: PropTypes.func,
  removeTargetDatastore: PropTypes.func,
  addTargetDatastore: PropTypes.func,
  addSourceDatastores: PropTypes.func,
  sourceDatastores: PropTypes.array,
  targetDatastores: PropTypes.array
};
