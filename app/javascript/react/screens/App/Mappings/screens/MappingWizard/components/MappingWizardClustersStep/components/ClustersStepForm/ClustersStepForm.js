import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

import DualPaneMapper from '../../../DualPaneMapper/DualPaneMapper';
import DualPaneMapperList from '../../../DualPaneMapper/DualPaneMapperList';
import DualPaneMapperCount from '../../../DualPaneMapper/DualPaneMapperCount';
import DualPaneMapperListItem from '../../../DualPaneMapper/DualPaneMapperListItem';
import ClustersStepTreeView from '../ClustersStepTreeView';
import { createNewMapping, updateMapping } from './helpers';
import { sourceClustersFilter } from '../../MappingWizardClustersStepSelectors';
import { CONVERSION_HOST_WARNING_MESSAGES } from '../../MappingWizardClustersStepConstants';
import { RHV } from '../../../../MappingWizardConstants';
import { multiProviderTargetLabel } from '../../../helpers';

class ClustersStepForm extends React.Component {
  state = {
    selectedTargetCluster: null,
    selectedSourceClusters: [],
    selectedMapping: null
  };

  selectSourceCluster = sourceCluster => {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedSourceClusters.some(cluster => cluster.id === sourceCluster.id);
      if (isAlreadySelected) {
        return {
          selectedSourceClusters: prevState.selectedSourceClusters.filter(cluster => cluster.id !== sourceCluster.id)
        };
      }
      return {
        selectedSourceClusters: [...prevState.selectedSourceClusters, sourceCluster]
      };
    });
  };

  selectTargetCluster = targetCluster => {
    this.setState(() => ({ selectedTargetCluster: targetCluster }));
  };

  addMapping = () => {
    const {
      input: { value: clustersStepMappings, onChange }
    } = this.props;
    const { selectedTargetCluster, selectedSourceClusters } = this.state;

    const mappingExistsForSelectedTargetCluster = clustersStepMappings.some(
      clustersStepMapping => clustersStepMapping.id === selectedTargetCluster.id
    );

    if (mappingExistsForSelectedTargetCluster) {
      const updatedMappings = clustersStepMappings.map(clustersStepMapping =>
        updateMapping(clustersStepMapping, selectedTargetCluster, selectedSourceClusters)
      );

      onChange(updatedMappings);
    } else {
      onChange([...clustersStepMappings, createNewMapping(selectedTargetCluster, selectedSourceClusters)]);
    }

    this.setState(() => ({
      selectedTargetCluster: null,
      selectedSourceClusters: []
    }));
  };

  selectMapping = selectedMapping => {
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
  };

  removeMapping = () => {
    const { input } = this.props;
    this.setState(prevState => {
      const clustersStepMappings = input.value;
      input.onChange(
        clustersStepMappings.filter(
          targetClusterWithSourceClusters => !(targetClusterWithSourceClusters.id === prevState.selectedMapping.id)
        )
      );
      return {
        selectedMapping: null
      };
    });
  };

  removeAll = () => {
    const { input } = this.props;
    input.onChange([]);
  };

  noClustersFound = (clusters, loading) =>
    !clusters.length &&
    !loading && (
      <div className="dual-pane-mapper-item">
        <Icon type="pf" name="error-circle-o" /> {__('No clusters found.')}
      </div>
    );

  allClustersMapped = (sourceClusters, filteredClusters, loading) =>
    !!sourceClusters.length &&
    !filteredClusters.length &&
    !loading && (
      <div className="dual-pane-mapper-item">
        <Icon type="pf" name="ok" /> {__('All source clusters have been mapped.')}
      </div>
    );

  render() {
    const {
      sourceClusters,
      targetClusters,
      isFetchingSourceClusters,
      isFetchingTargetClusters,
      input,
      targetProvider,
      rhvConversionHosts
    } = this.props;

    const { selectedTargetCluster, selectedSourceClusters, selectedMapping } = this.state;

    const filteredSourceClusters = sourceClustersFilter(sourceClusters, input.value);

    const sourceCounter = (
      <DualPaneMapperCount selectedItems={selectedSourceClusters.length} totalItems={filteredSourceClusters.length} />
    );

    const targetCounter = <DualPaneMapperCount selectedItems={selectedTargetCluster ? 1 : 0} totalItems={1} />;

    return (
      <div className="dual-pane-mapper-form">
        <p style={{ marginLeft: -40 }}>
          {__(
            'Select source cluster(s) and a target cluster and click Add Mapping to add the mapping. Multiple mappings can be added.') // prettier-ignore
          }
        </p>
        <DualPaneMapper
          handleButtonClick={this.addMapping}
          validMapping={!(selectedTargetCluster && (selectedSourceClusters && selectedSourceClusters.length > 0))}
        >
          {sourceClusters && (
            <DualPaneMapperList
              id="source_clusters"
              listTitle={__('Source Provider \\ Datacenter \\ Cluster')}
              loading={isFetchingSourceClusters}
              counter={sourceCounter}
            >
              {filteredSourceClusters.map(item => (
                <DualPaneMapperListItem
                  item={item}
                  text={
                    item.v_parent_datacenter
                      ? `${item.ext_management_system.name} \\ ${item.v_parent_datacenter} \\ ${item.name}`
                      : `${item.name}`
                  }
                  key={item.id}
                  selected={
                    selectedSourceClusters && selectedSourceClusters.some(sourceCluster => sourceCluster.id === item.id)
                  }
                  handleClick={this.selectSourceCluster}
                  handleKeyPress={this.selectSourceCluster}
                />
              ))}
              {this.noClustersFound(sourceClusters, isFetchingSourceClusters)}
              {this.allClustersMapped(sourceClusters, filteredSourceClusters, isFetchingSourceClusters)}
            </DualPaneMapperList>
          )}
          {targetClusters && (
            <DualPaneMapperList
              id="target_clusters"
              listTitle={multiProviderTargetLabel(targetProvider, 'cluster')}
              loading={isFetchingTargetClusters}
              counter={targetCounter}
            >
              {targetClusters.map(item => {
                let showConversionHostWarning = false;
                if (targetProvider === RHV) {
                  const conversionHostsInCluster = rhvConversionHosts.filter(
                    ch => ch.resource.ems_cluster_id === item.id
                  );
                  showConversionHostWarning = conversionHostsInCluster.length === 0;
                }

                return (
                  <DualPaneMapperListItem
                    item={item}
                    text={
                      item.v_parent_datacenter
                        ? `${item.ext_management_system.name} \\ ${item.v_parent_datacenter} \\ ${item.name}`
                        : `${item.ext_management_system.name} \\ ${item.name}`
                    }
                    key={item.id}
                    selected={selectedTargetCluster && selectedTargetCluster.id === item.id}
                    handleClick={this.selectTargetCluster}
                    handleKeyPress={this.selectTargetCluster}
                    warningMessage={showConversionHostWarning ? CONVERSION_HOST_WARNING_MESSAGES[targetProvider] : ''}
                  />
                );
              })}
              {this.noClustersFound(targetClusters, isFetchingTargetClusters)}
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
            loading={isFetchingTargetClusters || isFetchingSourceClusters}
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
  isFetchingTargetClusters: PropTypes.bool,
  targetProvider: PropTypes.string,
  rhvConversionHosts: PropTypes.array
};

export default ClustersStepForm;
