import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Breadcrumb, Form, Grid, Button, Spinner } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import NumberInput from '../common/forms/NumberInput';

class Settings extends React.Component {
  componentDidMount() {
    const { fetchApiInfoAction, fetchApiInfoUrl, fetchSettingsAction, fetchSettingsUrl } = this.props;
    fetchSettingsAction(fetchSettingsUrl);
    fetchApiInfoAction(fetchApiInfoUrl);
  }

  onApplyClick = () => {
    const { patchSettingsAction, apiInfo, settingsForm } = this.props;
    const patchSettingsUrl = `${apiInfo.server_info.server_href}/settings`;
    patchSettingsAction(patchSettingsUrl, settingsForm.values);
  };

  render() {
    const { isFetchingApiInfo, isFetchingSettings, isSavingSettings, savedSettings, settingsForm } = this.props;

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
      <Spinner loading={isFetchingApiInfo || isFetchingSettings} style={{ marginTop: 15 }}>
        <div className="migration-settings">
          <h2>{__('Concurrent Migrations')}</h2>
          <Form horizontal>
            <Form.FormGroup>
              <Grid.Col componentClass={Form.ControlLabel} sm={5}>
                {__('Maximum concurrent migrations per conversion host')}
              </Grid.Col>
              <Grid.Col sm={7}>
                <div style={{ width: 100 }}>
                  <Field
                    id="max_concurrent_tasks_per_host"
                    name="max_concurrent_tasks_per_host"
                    component={NumberInput}
                    normalize={NumberInput.normalizeStringToInt}
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
  fetchApiInfoAction: PropTypes.func,
  fetchSettingsAction: PropTypes.func,
  patchSettingsAction: PropTypes.func,
  isFetchingApiInfo: PropTypes.bool,
  isFetchingSettings: PropTypes.bool,
  isSavingSettings: PropTypes.bool,
  apiInfo: PropTypes.object,
  savedSettings: PropTypes.object,
  settingsForm: PropTypes.object,
  fetchSettingsUrl: PropTypes.string,
  fetchApiInfoUrl: PropTypes.string
};

Settings.defaultProps = {
  fetchApiInfoUrl: '/api',
  fetchSettingsUrl: '/api/settings'
};

export default reduxForm({
  form: 'settings'
})(Settings);
