import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'patternfly-react';

const CardFooter = ({ onButtonClick, disabled, buttonText }) => (
  <Card.Footer style={{ position: 'relative', top: '-2px' }}>
    <Button style={{ position: 'relative', top: '-5px' }} onClick={onButtonClick} disabled={disabled}>
      {buttonText}
    </Button>
  </Card.Footer>
);

CardFooter.propTypes = {
  onButtonClick: PropTypes.func,
  disabled: PropTypes.bool,
  buttonText: PropTypes.string
};

export default CardFooter;
