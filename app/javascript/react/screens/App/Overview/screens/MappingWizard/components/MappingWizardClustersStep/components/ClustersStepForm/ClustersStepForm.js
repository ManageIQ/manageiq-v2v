import React from 'react';
import PropTypes from 'prop-types';
import { bindMethods } from 'patternfly-react';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import ClustersStepTreeView from '../ClustersStepTreeView';

import { updateMapping, createNewMapping } from './helpers';
import { sourceClustersFilter } from '../../MappingWizardClustersStepSelectors';

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
    const {
      input: { value: clustersStepMappings, onChange }
    } = this.props;
    const { selectedTargetCluster, selectedSourceClusters } = this.state;

    const mappingExistsForSelectedTargetCluster = clustersStepMappings.some(
      clustersStepMapping => clustersStepMapping.id === selectedTargetCluster.id
    );

    if (mappingExistsForSelectedTargetCluster) {
      const updatedMappings = clustersStepMappings.map(clustersStepMapping =>
        updateMapping(
          clustersStepMapping,
          selectedTargetCluster,
          selectedSourceClusters
        )
      );

      onChange(updatedMappings);
    } else {
      onChange([
        ...clustersStepMappings,
        createNewMapping(selectedTargetCluster, selectedSourceClusters)
      ]);
    }

    this.setState(() => ({
      selectedTargetCluster: null,
      selectedSourceClusters: []
    }));
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
    const { input } = this.props;
    this.setState(prevState => {
      const clustersStepMappings = input.value;
      input.onChange(
        clustersStepMappings.filter(
          targetClusterWithSourceClusters =>
            !(
              targetClusterWithSourceClusters.id ===
              prevState.selectedMapping.id
            )
        )
      );
      return {
        selectedMapping: null
      };
    });
  }

  removeAll() {
    const { input } = this.props;
    input.onChange([]);
  }

  render() {
    const {
      sourceClusters,
      targetClusters,
      isFetchingSourceClusters,
      isFetchingTargetClusters,
      input
    } = this.props;

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
            <DualPaneMapperList
              listTitle="Source Clusters"
              loading={isFetchingSourceClusters}
            >
              {sourceClustersFilter(sourceClusters, input.value).map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={item.name}
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
                totalItems={
                  sourceClustersFilter(sourceClusters, input.value).length
                }
              />
            </DualPaneMapperList>
          )}
          {targetClusters && (
            <DualPaneMapperList
              listTitle="Target Clusters"
              loading={isFetchingTargetClusters}
            >
              {targetClusters.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={item.name}
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
  input: PropTypes.object,
  sourceClusters: PropTypes.arrayOf(PropTypes.object),
  targetClusters: PropTypes.arrayOf(PropTypes.object),
  isFetchingSourceClusters: PropTypes.bool,
  isFetchingTargetClusters: PropTypes.bool
};

export default ClustersStepForm;
