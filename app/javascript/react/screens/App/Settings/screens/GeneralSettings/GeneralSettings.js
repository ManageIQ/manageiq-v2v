import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Icon, OverlayTrigger, Popover, Spinner } from 'patternfly-react';
import NumberInput from '../../../common/forms/NumberInput';
// import TextInputWithCheckbox from '../../../common/forms/TextInputWithCheckbox'; // FIXME: uncomment once backend is ready

const FORM_NAME = 'settings';

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

  enforceConstraintsOnChange = (event, newValue, prevValue, fieldChanging) => {
    const {
      settingsForm: {
        values: { max_concurrent_tasks_per_host, max_concurrent_tasks_per_ems }
      },
      formChangeAction
    } = this.props;
    if (fieldChanging === 'max_concurrent_tasks_per_host' && newValue > max_concurrent_tasks_per_ems) {
      formChangeAction(FORM_NAME, 'max_concurrent_tasks_per_ems', newValue);
    } else if (fieldChanging === 'max_concurrent_tasks_per_ems' && newValue < max_concurrent_tasks_per_host) {
      formChangeAction(FORM_NAME, 'max_concurrent_tasks_per_host', newValue);
    }
  };

  render() {
    const { isFetchingServers, isFetchingSettings, isSavingSettings, savedSettings, settingsForm } = this.props;

    const hasUnsavedChanges =
      settingsForm &&
      settingsForm.values &&
      Object.keys(savedSettings).some(key => savedSettings[key] !== settingsForm.values[key]);

    // const inputEnabledFunction = value => value !== 'unlimited'; // FIXME: uncomment once backend is ready

    return (
      <Spinner loading={isFetchingServers || isFetchingSettings} style={{ marginTop: 15 }}>
        <div className="migration-settings">
          <Form className="form-horizontal" style={{ padding: '0 20px' }}>
            <div>
              <h3>{__('Concurrent Migrations')}</h3>
            </div>
            <Form.FormGroup>
              <Form.ControlLabel className="col-md-5">
                <span className="pull-left">
                  {__('Maximum concurrent migrations per conversion host')}
                  <OverlayTrigger
                    overlay={
                      <Popover id="maximum_concurrect_migrations_per_provider_popover">
                        {__(
                          'For VDDK transformations the maximum concurrent migrations per conversion host is limited to 20. See the product documentation for more information.'
                        )}
                      </Popover>
                    }
                    placement="top"
                    trigger={['hover']}
                    delay={500}
                    rootClose={false}
                  >
                    <Icon
                      type="pf"
                      name="info"
                      size="md"
                      style={{
                        width: 'inherit',
                        backgroundColor: 'transparent',
                        padding: 10
                      }}
                    />
                  </OverlayTrigger>
                </span>
              </Form.ControlLabel>
              <div className="col-md-2">
                <Field
                  id="max_concurrent_tasks_per_host"
                  name="max_concurrent_tasks_per_host"
                  component={NumberInput}
                  normalize={NumberInput.normalizeStringToInt}
                  min={1}
                  onChange={this.enforceConstraintsOnChange}
                />
              </div>
            </Form.FormGroup>
            <Form.FormGroup>
              <Form.ControlLabel className="col-md-5">
                <div className="pull-left">{__('Maximum concurrent migrations per provider')}</div>
              </Form.ControlLabel>
              <div className="col-md-2">
                <Field
                  id="max_concurrent_tasks_per_ems"
                  name="max_concurrent_tasks_per_ems"
                  component={NumberInput}
                  normalize={NumberInput.normalizeStringToInt}
                  min={1}
                  onChange={this.enforceConstraintsOnChange}
                />
              </div>
            </Form.FormGroup>
            {/* FIXME: uncomment once backend is ready
            <Form.FormGroup />
            <div>
              <h3>{__('Resource Utilization Limits for Migrations')}</h3>
            </div>
            <Field
              id="cpu_limit_per_host"
              name="cpu_limit_per_host"
              component={TextInputWithCheckbox}
              normalize={TextInputWithCheckbox.normalizeStringToInt}
              label={__('Max CPU utilization per conversion host')}
              postfix="％"
              inputEnabledFunction={inputEnabledFunction}
            />
            <Field
              id="network_limit_per_host"
              name="network_limit_per_host"
              component={TextInputWithCheckbox}
              normalize={TextInputWithCheckbox.normalizeStringToInt}
              label={__('Total network throughput')}
              postfix={__('MB/s')}
              inputEnabledFunction={inputEnabledFunction}
            />
*/}
            <Form.FormGroup className="col-md-1 pull-left" style={{ marginTop: '40px' }}>
              <Button bsStyle="primary" onClick={this.onApplyClick} disabled={!hasUnsavedChanges || isSavingSettings}>
                {__('Apply')}
              </Button>
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
  fetchSettingsUrl: PropTypes.string,
  formChangeAction: PropTypes.func
};

GeneralSettings.defaultProps = {
  fetchServersUrl: '/api/servers',
  fetchSettingsUrl: '/api/settings'
};

export default reduxForm({
  form: FORM_NAME
})(GeneralSettings);
