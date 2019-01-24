import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Spinner } from 'patternfly-react';
import NumberInput from '../../../common/forms/NumberInput';

export class GeneralSettings extends React.Component {
  componentDidMount() {
    const { fetchServersAction, fetchServersUrl, fetchSettingsAction, fetchSettingsUrl } = this.props;
    fetchServersAction(fetchServersUrl);
    fetchSettingsAction(fetchSettingsUrl);
  }

  onApplyClick = () => {
    const { patchSettingsAction, servers, settingsForm } = this.props;
    patchSettingsAction(servers, settingsForm.values);
  };

  render() {
    const { isFetchingServers, isFetchingSettings, isSavingSettings, savedSettings, settingsForm } = this.props;

    const hasUnsavedChanges =
      settingsForm &&
      settingsForm.values &&
      Object.keys(savedSettings).some(key => savedSettings[key] !== settingsForm.values[key]);

    return (
      <Spinner loading={isFetchingServers || isFetchingSettings} style={{ marginTop: 15 }}>
        <div className="migration-settings">
          <Form style={{ padding: '0 20px' }}>
            <Form.FormGroup>
              <Form.ControlLabel>{__('Maximum concurrent migrations per conversion host')}</Form.ControlLabel>
              <div style={{ width: 100 }}>
                <Field
                  id="max_concurrent_tasks_per_host"
                  name="max_concurrent_tasks_per_host"
                  component={NumberInput}
                  normalize={NumberInput.normalizeStringToInt}
                  min={1}
                />
              </div>
            </Form.FormGroup>
            <Form.FormGroup>
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
            </Form.FormGroup>
          </Form>
        </div>
      </Spinner>
    );
  }
}

GeneralSettings.propTypes = {
  fetchServersAction: PropTypes.func,
  fetchSettingsAction: PropTypes.func,
  patchSettingsAction: PropTypes.func,
  isFetchingServers: PropTypes.bool,
  isFetchingSettings: PropTypes.bool,
  isSavingSettings: PropTypes.bool,
  servers: PropTypes.array,
  savedSettings: PropTypes.object,
  settingsForm: PropTypes.object,
  fetchServersUrl: PropTypes.string,
  fetchSettingsUrl: PropTypes.string
};

GeneralSettings.defaultProps = {
  fetchServersUrl: '/api/servers',
  fetchSettingsUrl: '/api/settings'
};

export default reduxForm({
  form: 'settings'
})(GeneralSettings);
