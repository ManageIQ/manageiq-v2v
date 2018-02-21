import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';

class DatastoresStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedSourceDatastores: [],
      selectedTargetDatastore: null
    };

    bindMethods(this, [
      'selectSourceDatastore',
      'selectTargetDatastore',
      'addDatastoreMapping'
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
    // const { removeTargetCluster, removeSourceClusters, input } = this.props;
    const { input, selectedCluster, selectedClusterMapping } = this.props;
    const { selectedTargetDatastore } = this.state;
    const { nodes, ...targetCluster } = selectedClusterMapping;
    this.setState(prevState => {
      // removeSourceClusters(prevState.selectedSourceClusters);
      // removeTargetCluster(prevState.selectedTargetCluster);
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
    });
  }

  render() {
    const { sourceDatastores, targetDatastores } = this.props;
    const { selectedSourceDatastores, selectedTargetDatastore } = this.state;
    return (
      <DualPaneMapper handleButtonClick={this.addDatastoreMapping}>
        <DualPaneMapperList listTitle="Source Datastores">
          {sourceDatastores.map(item => (
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
          {/* <DualPaneMapperCount
                      selectedItems={selectedSourceClusters.length}
                      totalItems={sourceClusters.length}
                    /> */}
        </DualPaneMapperList>
        <DualPaneMapperList listTitle="Target Datastores">
          {targetDatastores.map(item => (
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
    );
  }
}

export default DatastoresStepForm;
