import React from 'react';
import PropTypes from 'prop-types';

import {
  Form,
  FormGroup,
  Grid,
  InputGroup,
  FormControl,
  ControlLabel,
  DropdownButton,
  MenuItem
} from 'patternfly-react';

const SourceClusterSelect = ({
  form,
  clusterMappings,
  selectSourceCluster,
  selectedCluster,
  selectedClusterMapping
}) => {
  const mappingObject = form.includes('Networks') ? 'networks' : 'datastores';

  const sourceClustersWithAssociatedTargetClusters = clusterMappings.reduce(
    (mappings, targetClusterWithSourceClusters) => {
      const {
        nodes: sourceClusters,
        ...targetCluster
      } = targetClusterWithSourceClusters;
      const sourceToTargetMappings = sourceClusters.map(sourceCluster => ({
        sourceCluster,
        targetCluster
      }));
      return mappings.concat(sourceToTargetMappings);
    },
    []
  );

  return (
    <div className="source-cluster-select">
      <Form horizontal>
        <FormGroup>
          <Grid.Col componentClass={ControlLabel} sm={6}>
            {__(
              sprintf(
                'Map source %s to target %s for cluster',
                mappingObject,
                mappingObject
              )
            )}
          </Grid.Col>
          <Grid.Col sm={4}>
            <InputGroup>
              <FormControl.Static>
                {selectedCluster && selectedCluster.name ? (
                  `${selectedCluster.name} (${selectedClusterMapping.name})`
                ) : (
                  <span className="placeholder-text">
                    {__('Select a source cluster')}
                  </span>
                )}
              </FormControl.Static>
              <DropdownButton
                id="cluster-select"
                title=""
                componentClass={InputGroup.Button}
                pullRight
              >
                {sourceClustersWithAssociatedTargetClusters &&
                  sourceClustersWithAssociatedTargetClusters.map(
                    clusterMapping => (
                      <MenuItem
                        onSelect={() =>
                          selectSourceCluster(clusterMapping.sourceCluster.id)
                        }
                        key={clusterMapping.sourceCluster.id}
                      >
                        {clusterMapping.sourceCluster.name} ({
                          clusterMapping.targetCluster.name
                        })
                      </MenuItem>
                    )
                  )}
              </DropdownButton>
            </InputGroup>
          </Grid.Col>
        </FormGroup>
      </Form>
    </div>
  );
};

export default SourceClusterSelect;

SourceClusterSelect.propTypes = {
  clusterMappings: PropTypes.array,
  selectSourceCluster: PropTypes.func,
  selectedCluster: PropTypes.object,
  selectedClusterMapping: PropTypes.object,
  form: PropTypes.string
};
