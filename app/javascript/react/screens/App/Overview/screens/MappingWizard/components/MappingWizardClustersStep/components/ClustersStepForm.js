import React from 'react';
import PropTypes from 'prop-types';
import { noop, bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../DualPaneMapper/DualPaneMapperListItem';
import ClustersStepTreeView from './ClustersStepTreeView';

class ClustersStepForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTargetCluster: null,
      selectedSourceClusters: [],
      selectedMapping: null
    };

    bindMethods(this, [
      'selectSourceCluster',
      'selectTargetCluster',
      'addMapping',
      'selectMapping',
      'removeMapping',
      'removeAll'
    ]);
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
    const { removeTargetCluster, removeSourceClusters, input } = this.props;
    this.setState(prevState => {
      removeSourceClusters(prevState.selectedSourceClusters);
      removeTargetCluster(prevState.selectedTargetCluster);
      input.onChange([
        ...input.value,
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
      ]);
      return {
        selectedTargetCluster: null,
        selectedSourceClusters: []
      };
    });
  }

  selectMapping(selectedMapping) {
    const { input } = this.props;
    input.onChange(
      input.value.map(mapping => {
        if (mapping.id === selectedMapping.id) {
          return { ...mapping, selected: !mapping.selected };
        } else if (mapping.id !== selectedMapping.id && mapping.selected) {
          return { ...mapping, selected: false };
        }
        return mapping;
      })
    );
    this.setState(() => ({ selectedMapping }));
  }

  removeMapping() {
    const { addTargetCluster, addSourceClusters, input } = this.props;
    this.setState(prevState => {
      const { nodes, ...targetCluster } = prevState.selectedMapping;
      addTargetCluster(targetCluster);
      addSourceClusters(nodes);
      input.onChange(
        input.value.filter(
          mapping => !(mapping.id === prevState.selectedMapping.id)
        )
      );
      return {
        selectedMapping: null
      };
    });
  }

  removeAll() {
    const { addTargetCluster, addSourceClusters, input } = this.props;
    input.value.forEach(mapping => {
      const { nodes, ...targetCluster } = mapping;
      addTargetCluster(targetCluster);
      addSourceClusters(nodes);
    });
    input.onChange([]);
  }

  render() {
    const { sourceClusters, targetClusters, input } = this.props;

    const {
      selectedTargetCluster,
      selectedSourceClusters,
      selectedMapping
    } = this.state;

    return (
      <div className="dual-pane-mapper-form">
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
            <DualPaneMapperList listTitle="Source Clusters">
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
            <DualPaneMapperList listTitle="Target Clusters">
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
        {input.value && (
          <ClustersStepTreeView
            mappings={input.value}
            selectMapping={this.selectMapping}
            removeMapping={this.removeMapping}
            removeAll={this.removeAll}
            selectedMapping={selectedMapping}
          />
        )}
      </div>
    );
  }
}

ClustersStepForm.propTypes = {
  removeTargetCluster: PropTypes.func,
  removeSourceClusters: PropTypes.func,
  input: PropTypes.object,
  addTargetCluster: PropTypes.func,
  addSourceClusters: PropTypes.func,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object)
};

ClustersStepForm.defaultProps = {
  removeTargetCluster: noop,
  removeSourceClusters: noop,
  addTargetCluster: noop,
  addSourceClusters: noop
};

export default ClustersStepForm;
