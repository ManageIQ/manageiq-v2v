import React from 'react';
import PropTypes from 'prop-types';
import { ListView, Icon } from 'patternfly-react';

const NumVmsInfoItem = ({ plan }) => {
  const numVms =
    plan.options &&
    plan.options.config_info &&
    plan.options.config_info.actions &&
    plan.options.config_info.actions.length;
  return (
    <ListView.InfoItem>
      <Icon type="pf" name="virtual-machine" />
      <strong>{numVms}</strong> {__('VMs')}
    </ListView.InfoItem>
  );
};

NumVmsInfoItem.propTypes = {
  plan: PropTypes.shape({
    options: PropTypes.shape({
      config_info: PropTypes.shape({
        actions: PropTypes.array
      })
    })
  })
};

export default NumVmsInfoItem;
