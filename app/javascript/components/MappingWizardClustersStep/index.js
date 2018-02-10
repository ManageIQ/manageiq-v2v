import React from 'react';
import PropTypes from 'prop-types';

import { target, source } from './__mocks__/data';

import DualPaneMapper from '../DualPaneMapper';
import DualPaneMapperList from '../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperListItem from '../DualPaneMapper/DualPaneMapperListItem';

class MappingWizardClustersStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sourceClusters: null,
      targetClusters: null,
      selectedTargetCluster: null,
      selectedSourceClusters: [],
      mappings: []
    };

    this.selectSourceCluster = this.selectSourceCluster.bind(this);
    this.selectTargetCluster = this.selectTargetCluster.bind(this);
    this.addMapping = this.addMapping.bind(this);
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
        mappings: [
          ...prevState.mappings,
          {
            ...prevState.selectedTargetCluster,
            nodes: prevState.selectedSourceClusters
          }
        ]
      };
    });
  }

  render() {
    const {
      sourceClusters,
      targetClusters,
      selectedTargetCluster,
      selectedSourceClusters
    } = this.state;
    return (
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
                  selectedTargetCluster && selectedTargetCluster.id === item.id
                }
                handleClick={this.selectTargetCluster}
              />
            ))}
          </DualPaneMapperList>
        )}
      </DualPaneMapper>
    );
  }
}

export default MappingWizardClustersStep;
