import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover, Icon } from 'patternfly-react';

const MigrationFailedOverlay = ({ plan, numFailedVms, numTotalVms }) => (
  <OverlayTrigger
    overlay={
      <Popover id={`description_${plan.id}`} title={sprintf('%s', plan.name)}>
        <Icon
          type="pf"
          name="error-circle-o"
          size="sm"
          style={{
            width: 'inherit',
            backgroundColor: 'transparent',
            paddingRight: 5
          }}
        />
        {sprintf(__('%s of %s VM migrations failed.'), numFailedVms, numTotalVms)}
      </Popover>
    }
    placement="top"
    trigger={['hover']}
    delay={500}
    rootClose={false}
  >
    <Icon
      type="pf"
      name="error-circle-o"
      size="md"
      style={{
        width: 'inherit',
        backgroundColor: 'transparent',
        paddingRight: 10
      }}
    />
  </OverlayTrigger>
);

MigrationFailedOverlay.propTypes = {
  plan: PropTypes.shape({ id: PropTypes.string, name: PropTypes.string }).isRequired,
  numFailedVms: PropTypes.number.isRequired,
  numTotalVms: PropTypes.number.isRequired
};

export default MigrationFailedOverlay;
