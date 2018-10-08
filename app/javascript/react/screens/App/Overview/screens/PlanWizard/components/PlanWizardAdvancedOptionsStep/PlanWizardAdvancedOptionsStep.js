import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Form, Spinner } from 'patternfly-react';

import PlanWizardAdvancedOptionsStepTable from './components/PlanWizardAdvancedOptionsStepTable/PlanWizardAdvancedOptionsStepTable';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { preselectPlaybooksForVms, applyPlaybookSelections, updatePlaybookSelections } from './helpers';

class PlanWizardAdvancedOptionsStep extends Component {
  constructor(props) {
    super(props);

    if (props.pristine) {
      if (!props.editingPlan) {
        props.setVmsAction(props.vmStepSelectedVms);
      } else {
        props.setVmsAction(preselectPlaybooksForVms(props.editingPlan, props.vmStepSelectedVms));
      }
    } else {
      const {
        vmStepSelectedVms,
        advancedOptionsStepForm: {
          values: { playbookVms }
        }
      } = props;
      props.change('playbookVms', updatePlaybookSelections(vmStepSelectedVms, playbookVms));
      props.setVmsAction(applyPlaybookSelections(vmStepSelectedVms, playbookVms));
    }
  }

  componentDidMount() {
    const { fetchPlaybooksAction, fetchPlaybooksUrl } = this.props;
    fetchPlaybooksAction(fetchPlaybooksUrl);
  }

  onSelectChange = (event, scheduleType) => {
    if (event.target.value === '') {
      const { change, setVmsAction, vms } = this.props;
      change(`playbookVms.${scheduleType}`, []);
      setVmsAction(vms.map(vm => ({ ...vm, [scheduleType]: false })));
    }
  };

  render() {
    const { playbooks, isFetchingPlaybooks, advancedOptionsStepForm, vms, setVmsAction } = this.props;

    return (
      <Spinner loading={isFetchingPlaybooks}>
        <Form className="playbook-selects">
          <Field
            name="preMigrationPlaybook"
            component={BootstrapSelect}
            options={playbooks}
            option_key="id"
            option_value="name"
            label={__('Select pre-migration playbook service (optional)')}
            stacked_label
            controlWidth={12}
            allowClear
            onChange={event => this.onSelectChange(event, 'preMigration')}
          />
          <Field
            name="postMigrationPlaybook"
            component={BootstrapSelect}
            options={playbooks}
            option_key="id"
            option_value="name"
            label={__('Select post-migration playbook service (optional)')}
            stacked_label
            controlWidth={12}
            allowClear
            onChange={event => this.onSelectChange(event, 'postMigration')}
          />
        </Form>
        {advancedOptionsStepForm &&
          advancedOptionsStepForm.values && (
            <Field
              name="playbookVms"
              component={PlanWizardAdvancedOptionsStepTable}
              rows={vms}
              preMigrationPlaybook={advancedOptionsStepForm.values.preMigrationPlaybook}
              postMigrationPlaybook={advancedOptionsStepForm.values.postMigrationPlaybook}
              setVmsAction={setVmsAction}
              preMigration={
                advancedOptionsStepForm.values.playbookVms && advancedOptionsStepForm.values.playbookVms.preMigration
              }
              postMigration={
                advancedOptionsStepForm.values.playbookVms && advancedOptionsStepForm.values.playbookVms.postMigration
              }
            />
          )}
      </Spinner>
    );
  }
}

PlanWizardAdvancedOptionsStep.propTypes = {
  playbooks: PropTypes.array,
  isFetchingPlaybooks: PropTypes.bool,
  fetchPlaybooksAction: PropTypes.func,
  fetchPlaybooksUrl: PropTypes.string,
  advancedOptionsStepForm: PropTypes.object,
  vms: PropTypes.array,
  setVmsAction: PropTypes.func,
  vmStepSelectedVms: PropTypes.array,
  change: PropTypes.func,
  editingPlan: PropTypes.object,
  pristine: PropTypes.bool
};

PlanWizardAdvancedOptionsStep.defaultProps = {
  fetchPlaybooksUrl: "/api/service_templates/?filter[]=type='ServiceTemplateAnsiblePlaybook'&expand=resources"
};

export default reduxForm({
  form: 'planWizardAdvancedOptionsStep',
  destroyOnUnmount: false
})(PlanWizardAdvancedOptionsStep);
