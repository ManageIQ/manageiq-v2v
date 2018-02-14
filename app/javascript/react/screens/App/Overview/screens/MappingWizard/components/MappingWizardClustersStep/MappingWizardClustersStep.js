import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'patternfly-react';

import DualPaneMapper from '../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../DualPaneMapper/DualPaneMapperListItem';
import ClustersStepTreeView from './components/ClustersStepTreeView';

class MappingWizardClustersStep extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTargetCluster: null, // eslint-disable-line react/no-unused-state
      selectedSourceClusters: [], // eslint-disable-line react/no-unused-state
      mappings: [], // eslint-disable-line react/no-unused-state
      selectedMapping: null // eslint-disable-line react/no-unused-state
    };

    this.selectSourceCluster = this.selectSourceCluster.bind(this);
    this.selectTargetCluster = this.selectTargetCluster.bind(this);
    this.addMapping = this.addMapping.bind(this);
    this.selectMapping = this.selectMapping.bind(this);
    this.removeMapping = this.removeMapping.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  componentDidMount() {
    const {
      fetchSourceClustersUrl,
      fetchSourceClustersAction,
      fetchTargetClustersUrl,
      fetchTargetClustersAction
    } = this.props;

    fetchSourceClustersAction(fetchSourceClustersUrl);
    fetchTargetClustersAction(fetchTargetClustersUrl);
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
    const { removeTargetCluster } = this.props;
    const { selectedTargetCluster } = this.state;
    removeTargetCluster(selectedTargetCluster);
    this.setState(prevState => ({
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
          nodes: prevState.selectedSourceClusters.map(cluster => ({
            ...cluster,
            text: cluster.name,
            icon: 'fa fa-file-o'
          }))
        }
      ]
    }));
  }

  selectMapping(selectedMapping) {
    this.setState(prevState => ({
      mappings: prevState.mappings.map(mapping => {
        if (mapping.id === selectedMapping.id) {
          return { ...mapping, selected: !mapping.selected };
        } else if (mapping.id !== selectedMapping.id && mapping.selected) {
          return { ...mapping, selected: false };
        }
        return mapping;
      }),
      selectedMapping
    }));
  }

  removeMapping() {
    this.setState(prevState =>
      // const { nodes, ...targetCluster } = prevState.selectedMapping;
      ({
        mappings: prevState.mappings.filter(
          mapping => !(mapping.id === prevState.selectedMapping.id)
        ),
        selectedMapping: null
        // sourceClusters: {
        //   ...prevState.sourceClusters,
        //   resources: [...prevState.sourceClusters.resources, ...nodes]
        // },
        // targetClusters: {
        //   ...prevState.targetClusters,
        //   resources: [...prevState.targetClusters.resources, targetCluster]
        // }
      })
    );
  }

  removeAll() {
    this.setState(prevState =>
      // const sourceClusters = { ...prevState.sourceClusters };
      // const targetClusters = { ...prevState.targetClusters };
      // prevState.mappings.forEach(mapping => {
      //   const { nodes, ...targetCluster } = mapping;
      //   sourceClusters.resources = [...sourceClusters.resources, ...nodes];
      //   targetClusters.resources = [...targetClusters.resources, targetCluster];
      // });
      ({
        mappings: []
        // sourceClusters,
        // targetClusters
      })
    );
  }

  render() {
    const {
      isFetchingSourceClusters,
      sourceClusters,
      isFetchingTargetClusters,
      targetClusters
    } = this.props;

    const {
      selectedTargetCluster,
      selectedSourceClusters,
      mappings,
      selectedMapping
    } = this.state;

    if (!isFetchingSourceClusters && !isFetchingTargetClusters) {
      return (
        <div className="mapping-wizard-clusters-step">
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
              <DualPaneMapperList listTitle="fix me">
                {sourceClusters.map(item => (
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
                    handleKeyPress={this.selectSourceCluster}
                  />
                ))}
                <DualPaneMapperCount
                  selectedItems={selectedSourceClusters.length}
                  totalItems={sourceClusters.length}
                />
              </DualPaneMapperList>
            )}
            {targetClusters && (
              <DualPaneMapperList listTitle="fix me">
                {targetClusters.map(item => (
                  <DualPaneMapperListItem
                    item={item}
                    key={item.id}
                    selected={
                      selectedTargetCluster &&
                      selectedTargetCluster.id === item.id
                    }
                    handleClick={this.selectTargetCluster}
                    handleKeyPress={this.selectTargetCluster}
                  />
                ))}
              </DualPaneMapperList>
            )}
          </DualPaneMapper>
          <ClustersStepTreeView
            mappings={mappings}
            selectMapping={this.selectMapping}
            removeMapping={this.removeMapping}
            removeAll={this.removeAll}
            selectedMapping={selectedMapping}
          />
        </div>
      );
    }
    return null;
  }
}

MappingWizardClustersStep.propTypes = {
  fetchSourceClustersUrl: PropTypes.string,
  fetchSourceClustersAction: PropTypes.func,
  fetchTargetClustersUrl: PropTypes.string,
  fetchTargetClustersAction: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool,
  removeTargetCluster: PropTypes.func
};
MappingWizardClustersStep.defaultProps = {
  fetchSourceClustersUrl: '',
  fetchSourceClustersAction: noop,
  fetchTargetClustersUrl: '',
  fetchTargetClustersAction: noop,
  isFetchingSourceClusters: true,
  isFetchingTargetClusters: true,
  removeTargetCluster: noop
};

export default MappingWizardClustersStep;
