import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import PlanWizardInstancePropertiesStepTable from './components/PlanWizardInstancePropertiesStepTable';
import { OSP_TENANT } from '../../../../OverviewConstants';

class PlanWizardInstancePropertiesStep extends Component {
  componentDidMount() {
    const {
      selectedMapping,
      fetchOpenstackGroupsAndFlavorsUrl,
      fetchOpenstackGroupsAndFlavorsParam,
      fetchGroupsAndFlavorsAction
    } = this.props;

    const targetTenant =
      selectedMapping &&
      selectedMapping.transformation_mapping_items &&
      selectedMapping.transformation_mapping_items.find(item => item.destination_type === OSP_TENANT);

    if (targetTenant) {
      fetchGroupsAndFlavorsAction(
        fetchOpenstackGroupsAndFlavorsUrl,
        targetTenant.destination_id,
        fetchOpenstackGroupsAndFlavorsParam
      );
    }
  }

  render() {
    const { vmStepSelectedVms, securityGroups, flavors, isFetchingGroupsAndFlavors } = this.props;

    if (isFetchingGroupsAndFlavors) {
      return (
        <div className="blank-slate-pf">
          <div className="spinner spinner-lg blank-slate-pf-icon" />
          <h3 className="blank-slate-pf-main-action">{__('Loading...')}</h3>
        </div>
      );
    }
    return (
      <Field
        name="ospInstanceProperties"
        component={PlanWizardInstancePropertiesStepTable}
        rows={vmStepSelectedVms}
        securityGroups={securityGroups}
        flavors={flavors}
      />
    );
  }
}

PlanWizardInstancePropertiesStep.propTypes = {
  vmStepSelectedVms: PropTypes.array,
  selectedMapping: PropTypes.object,
  fetchOpenstackGroupsAndFlavorsUrl: PropTypes.string,
  fetchOpenstackGroupsAndFlavorsParam: PropTypes.string,
  fetchGroupsAndFlavorsAction: PropTypes.func,
  securityGroups: PropTypes.arrayOf(PropTypes.object),
  flavors: PropTypes.arrayOf(PropTypes.object),
  isFetchingGroupsAndFlavors: PropTypes.bool
};

export default reduxForm({
  form: 'planWizardInstancePropertiesStep',
  initialValues: {},
  destroyOnUnmount: false
})(PlanWizardInstancePropertiesStep);
