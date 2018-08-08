import React from 'react';
import { Button, Icon } from 'patternfly-react';

const CancelButton = props => (
  <Button {...props}>
    <Icon type="pf" name="close" />
  </Button>
);

CancelButton.propTypes = {
  ...Button.propTypes
};

export default CancelButton;
