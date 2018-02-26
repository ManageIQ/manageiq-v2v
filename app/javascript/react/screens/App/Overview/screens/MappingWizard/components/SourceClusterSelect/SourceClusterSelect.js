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
  sourceClusters,
  selectSourceCluster,
  selectedCluster
}) => {
  const mappingObject = form.includes('Networks') ? 'networks' : 'datastores';

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
          <Grid.Col sm={3}>
            <InputGroup>
              <FormControl.Static>
                {selectedCluster && selectedCluster.name ? (
                  selectedCluster.name
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
                {sourceClusters &&
                  sourceClusters.map(cluster => (
                    <MenuItem
                      onSelect={() => selectSourceCluster(cluster.id)}
                      key={cluster.id}
                    >
                      {cluster.name}
                    </MenuItem>
                  ))}
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
  sourceClusters: PropTypes.array,
  selectSourceCluster: PropTypes.func,
  selectedCluster: PropTypes.object,
  form: PropTypes.string
};
