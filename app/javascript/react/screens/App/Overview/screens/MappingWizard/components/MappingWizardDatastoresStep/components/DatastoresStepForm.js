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
      'selectMapping'
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
      selectedCluster,
      selectedClusterMapping,
      removeSourceDatastores,
      removeTargetDatastore
    } = this.props;
    const { selectedTargetDatastore } = this.state;
    const { nodes, ...targetCluster } = selectedClusterMapping;
    this.setState(prevState => {
      removeSourceDatastores(prevState.selectedSourceDatastores);
      removeTargetDatastore(prevState.selectedTargetDatastore);
      if (input.value.length === 0) {
        input.onChange([
          {
            ...targetCluster,
            text: targetCluster.name,
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
                nodes: prevState.selectedSourceDatastores.map(datastore => {
                  return {
                    ...datastore,
                    text: datastore.name,
                    icon: 'fa fa-file-o'
                  };
                })
              }
            ]
          }
        ]);
      } else {
        input.onChange([
          {
            ...input.value[0],
            nodes: input.value[0].nodes.concat({
              ...prevState.selectedTargetDatastore,
              text: prevState.selectedTargetDatastore.name,
              selectable: true,
              selected: false,
              state: {
                expanded: true
              },
              nodes: prevState.selectedSourceDatastores.map(datastore => {
                return {
                  ...datastore,
                  text: datastore.name,
                  icon: 'fa fa-file-o'
                };
              })
            })
          }
        ]);
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

  render() {
    const { sourceDatastores, targetDatastores, input } = this.props;
    const { selectedSourceDatastores, selectedTargetDatastore } = this.state;
    return (
      <div>
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
        />
      </div>
    );
  }
}

export default DatastoresStepForm;
