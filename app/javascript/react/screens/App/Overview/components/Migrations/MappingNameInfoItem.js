import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import ListViewTable from '../../../common/ListViewTable/ListViewTable';

const MappingNameInfoItem = ({ plan }) => (
  <ListViewTable.InfoItem>
    {plan.infraMappingName || (
      <React.Fragment>
        <Icon type="pf" name="warning-triangle-o" /> {__('Infrastucture mapping does not exist.')}
      </React.Fragment>
    )}
  </ListViewTable.InfoItem>
);

MappingNameInfoItem.propTypes = {
  plan: PropTypes.shape({
    infraMappingName: PropTypes.string
  })
};

export default MappingNameInfoItem;
