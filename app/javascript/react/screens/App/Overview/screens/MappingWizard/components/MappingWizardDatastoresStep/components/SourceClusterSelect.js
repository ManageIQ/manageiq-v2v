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

const SourceClusterSelect = ({ sourceClusters, selectSourceCluster }) => {
  return (
    <Form horizontal>
      <FormGroup>
        <Grid.Col componentClass={ControlLabel} sm={6}>
          Map source datastores to target datastores for cluster
        </Grid.Col>
        <Grid.Col sm={3}>
          <InputGroup>
            <FormControl
              placeholder="Select a source cluster"
              // value={selectedCluster && selectedCluster.name}
            />
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
  );
};

export default SourceClusterSelect;
