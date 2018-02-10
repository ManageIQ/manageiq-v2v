import React from 'react';
import PropTypes from 'prop-types';

import { target, source } from './__mocks__/data';

import DualPaneMapper from '../DualPaneMapper';
import DualPaneMapperList from '../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperListItem from '../DualPaneMapper/DualPaneMapperListItem';

import { TreeView, Button } from 'patternfly-react';

class MappingWizardClustersStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceClusters: null,
      targetClusters: null,
      selectedTargetCluster: null,
      selectedSourceClusters: [],
      mappings: [],
      selectedMapping: null
    };

    this.selectSourceCluster = this.selectSourceCluster.bind(this);
    this.selectTargetCluster = this.selectTargetCluster.bind(this);
    this.addMapping = this.addMapping.bind(this);
    this.selectMapping = this.selectMapping.bind(this);
    this.removeMapping = this.removeMapping.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({ sourceClusters: source, targetClusters: target }));
  }

  selectSourceCluster(sourceCluster) {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedSourceClusters.some(
        cluster => cluster.id === sourceCluster.id
      );
      if (isAlreadySelected) {
        return {
          selectedSourceClusters: prevState.selectedSourceClusters.filter(
            cluster => cluster.id !== sourceCluster.id
          )
        };
      }
      return {
        selectedSourceClusters: [
          ...prevState.selectedSourceClusters,
          sourceCluster
        ]
      };
    });
  }

  selectTargetCluster(targetCluster) {
    this.setState(() => ({ selectedTargetCluster: targetCluster }));
  }

  addMapping() {
    this.setState(prevState => {
      const sourceClusters = {
        ...prevState.sourceClusters,
        resources: prevState.sourceClusters.resources.filter(
          cluster =>
            !prevState.selectedSourceClusters.some(
              clusterToRemove => cluster.id === clusterToRemove.id
            )
        )
      };
      const targetClusters = {
        ...prevState.targetClusters,
        resources: prevState.targetClusters.resources.filter(
          cluster => cluster.id !== prevState.selectedTargetCluster.id
        )
      };
      return {
        sourceClusters,
        targetClusters,
        selectedTargetCluster: null,
        selectedSourceClusters: [],
        mappings: [
          ...prevState.mappings,
          {
            ...prevState.selectedTargetCluster,
            text: prevState.selectedTargetCluster.name,
            state: {
              expanded: true
            },
            selectable: true,
            selected: false,
            nodes: prevState.selectedSourceClusters.map(cluster => {
              return { ...cluster, text: cluster.name, icon: 'fa fa-file-o' };
            })
          }
        ]
      };
    });
  }

  selectMapping(selectedMapping) {
    this.setState(prevState => {
      return {
        mappings: prevState.mappings.map(mapping => {
          if (mapping.id === selectedMapping.id) {
            return { ...mapping, selected: !mapping.selected };
          } else if (mapping.id !== selectedMapping.id && mapping.selected) {
            return { ...mapping, selected: false };
          } else {
            return mapping;
          }
        }),
        selectedMapping
      };
    });
  }

  removeMapping() {
    this.setState(prevState => {
      const { nodes, ...targetCluster } = prevState.selectedMapping;
      return {
        mappings: prevState.mappings.filter(mapping => {
          return !mapping.id === prevState.selectedMapping.id;
        }),
        selectedMapping: null,
        sourceClusters: {
          ...prevState.sourceClusters,
          resources: [...prevState.sourceClusters.resources, ...nodes]
        },
        targetClusters: {
          ...prevState.targetClusters,
          resources: [...prevState.targetClusters.resources, targetCluster]
        }
      };
    });
  }

  removeAll() {
    this.setState(prevState => {
      const sourceClusters = { ...prevState.sourceClusters };
      const targetClusters = { ...prevState.targetClusters };
      prevState.mappings.forEach(mapping => {
        const { nodes, ...targetCluster } = mapping;
        sourceClusters.resources = [...sourceClusters.resources, ...nodes];
        targetClusters.resources = [...targetClusters.resources, targetCluster];
      });
      return {
        mappings: [],
        sourceClusters,
        targetClusters
      };
    });
  }

  render() {
    const {
      sourceClusters,
      targetClusters,
      selectedTargetCluster,
      selectedSourceClusters,
      mappings,
      selectedMapping
    } = this.state;
    return (
      <div>
        <DualPaneMapper
          handleButtonClick={this.addMapping}
          validMapping={
            !(
              selectedTargetCluster &&
              (selectedSourceClusters && selectedSourceClusters.length > 0)
            )
          }
        >
          {sourceClusters && (
            <DualPaneMapperList listTitle={sourceClusters.name}>
              {sourceClusters.resources.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  key={item.id}
                  selected={
                    selectedSourceClusters &&
                    selectedSourceClusters.some(
                      sourceCluster => sourceCluster.id === item.id
                    )
                  }
                  handleClick={this.selectSourceCluster}
                />
              ))}
            </DualPaneMapperList>
          )}
          {targetClusters && (
            <DualPaneMapperList listTitle={targetClusters.name}>
              {targetClusters.resources.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  key={item.id}
                  selected={
                    selectedTargetCluster &&
                    selectedTargetCluster.id === item.id
                  }
                  handleClick={this.selectTargetCluster}
                />
              ))}
            </DualPaneMapperList>
          )}
        </DualPaneMapper>
        {mappings.length > 0 ? (
          <TreeView
            nodes={mappings}
            selectNode={this.selectMapping}
            highlightOnSelect={true}
          />
        ) : (
          <div>hello</div>
        )}
        <Button
          disabled={mappings.length === 0 || !selectedMapping}
          onClick={this.removeMapping}
        >
          Remove Mapping
        </Button>
        <Button disabled={mappings.length === 0} onClick={this.removeAll}>
          Remove all
        </Button>
      </div>
    );
  }
}

export default MappingWizardClustersStep;
