import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Icon } from 'patternfly-react';

const MappingNameInfoItem = ({ plan }) => (
  <ListView.InfoItem>
    {plan.infraMappingName || (
      <React.Fragment>
        <Icon type="pf" name="warning-triangle-o" /> {__('Infrastucture mapping does not exist.')}
      </React.Fragment>
    )}
  </ListView.InfoItem>
);

MappingNameInfoItem.propTypes = {
  plan: PropTypes.shape({
    infraMappingName: PropTypes.string
  })
};

export default MappingNameInfoItem;
