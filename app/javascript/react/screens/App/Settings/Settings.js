import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Breadcrumb, Form, Grid, Button, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import NumberInput from '../common/forms/NumberInput';

const normalizeStringToInt = str => (str && parseInt(str.replace(/\D/g, ''), 10)) || 0;

class Settings extends React.Component {
  componentDidMount() {
    const { fetchSettingsAction, fetchSettingsUrl } = this.props;
    fetchSettingsAction(fetchSettingsUrl);
  }

  onApplyClick = () => {
    const { patchSettingsAction, patchSettingsUrl, settingsForm } = this.props;
    patchSettingsAction(patchSettingsUrl, settingsForm.values);
  };

  render() {
    const { isFetchingSettings, isSavingSettings, savedSettings, settingsForm } = this.props;

    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
        <Breadcrumb.Item href="/migration">{__('Migration')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{__('Migration Settings')}</Breadcrumb.Item>
      </Toolbar>
    );

    const hasUnsavedChanges =
      settingsForm &&
      settingsForm.values &&
      Object.keys(savedSettings).some(key => savedSettings[key] !== settingsForm.values[key]);

    const settingsContent = (
      <Spinner loading={isFetchingSettings} style={{ marginTop: 15 }}>
        <div className="migration-settings">
          <h2>{__('Concurrent Migrations')}</h2>
          <Form horizontal>
            <Form.FormGroup>
              <Grid.Col componentClass={Form.ControlLabel} sm={5}>
                {__('Maximum Concurrent migrations per conversion host')}
              </Grid.Col>
              <Grid.Col sm={7}>
                <div style={{ width: 100 }}>
                  <Field
                    id="max_concurrent_tasks_per_host"
                    name="max_concurrent_tasks_per_host"
                    component={NumberInput}
                    normalize={normalizeStringToInt}
                  />
                </div>
              </Grid.Col>
            </Form.FormGroup>
            <Form.FormGroup>
              <Grid.Col sm={12}>
                <Button bsStyle="primary" onClick={this.onApplyClick} disabled={!hasUnsavedChanges || isSavingSettings}>
                  {__('Apply')}
                </Button>
                <br />
                {isSavingSettings && (
                  <div style={{ paddingTop: 10 }}>
                    <Spinner loading size="xs" inline />
                    {__(' Applying...')}
                  </div>
                )}
              </Grid.Col>
            </Form.FormGroup>
          </Form>
        </div>
      </Spinner>
    );

    return (
      <React.Fragment>
        {toolbarContent}
        {settingsContent}
      </React.Fragment>
    );
  }
}

Settings.propTypes = {
  fetchSettingsAction: PropTypes.func,
  patchSettingsAction: PropTypes.func,
  isFetchingSettings: PropTypes.bool,
  isSavingSettings: PropTypes.bool,
  savedSettings: PropTypes.object,
  settingsForm: PropTypes.object,
  fetchSettingsUrl: PropTypes.string,
  patchSettingsUrl: PropTypes.string
};

Settings.defaultProps = {
  fetchSettingsUrl: '/api/settings',
  patchSettingsUrl: '/api/settings'
};

export default reduxForm({
  form: 'settings'
})(Settings);
