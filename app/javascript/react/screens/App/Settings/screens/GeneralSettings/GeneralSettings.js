import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Form, Button, Icon, OverlayTrigger, Popover, Spinner } from 'patternfly-react';
import NumberInput from '../../../common/forms/NumberInput';
import TextInputWithCheckbox from '../../../common/forms/TextInputWithCheckbox';

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
    const {
      isFetchingServers,
      isFetchingSettings,
      isSavingSettings,
      savedSettings,
      settingsForm,
      invalid,
      pristine
    } = this.props;

    const hasUnsavedChanges =
      settingsForm &&
      settingsForm.values &&
      Object.keys(savedSettings).some(key => savedSettings[key] !== settingsForm.values[key]);

    const inputEnabledFunction = value => value !== 'unlimited';

    const validatePercentInput = value => {
      const numberRegex = /^\d+$/;
      if ((inputEnabledFunction(value) && !numberRegex.test(value)) || value < 0 || value > 100) {
        return __('The entered value must be between 0 and 100');
      }
      return null;
    };

    return (
      <Spinner loading={isFetchingServers || isFetchingSettings} style={{ marginTop: 15 }}>
        <div className="migration-settings">
          <Form className="form-vertical" style={{ padding: '0 20px' }}>
            <div>
              <h3>{__('Concurrent Migrations')}</h3>
            </div>
            <Form.FormGroup>
              <Form.ControlLabel>
                <span className="pull-left">
                  {__('Maximum concurrent migrations per conversion host')}
                  <OverlayTrigger
                    overlay={
                      <Popover id="maximum_concurrect_migrations_per_host_popover">
                        {__('For VDDK transformations, the maximum concurrent migrations per conversion host should not exceed 20, to avoid network overload.') /* prettier-ignore */}
                      </Popover>
                    }
                    placement="top"
                    trigger="click"
                    rootClose
                  >
                    <Button bsStyle="link" style={{ paddingTop: 0, paddingBottom: 0 }}>
                      <Icon type="pf" name="info" />
                    </Button>
                  </OverlayTrigger>
                </span>
              </Form.ControlLabel>
              <div style={{ width: 150 }}>
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
              <Form.ControlLabel>
                <div className="pull-left">{__('Maximum concurrent migrations per provider')}</div>
              </Form.ControlLabel>
              <div style={{ width: 150 }}>
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
            <Form.FormGroup />
            <div>
              <h3>{__('Resource Utilization Limits for Migrations')}</h3>
            </div>
            <Field
              id="cpu_limit_per_host"
              name="cpu_limit_per_host"
              component={TextInputWithCheckbox}
              validate={validatePercentInput}
              label={__('Max CPU utilization per conversion host')}
              postfix="％"
              inputEnabledFunction={inputEnabledFunction}
              initialUncheckedValue="unlimited"
              vertical
            />
            <Form.FormGroup style={{ marginTop: '40px' }}>
              <Button
                bsStyle="primary"
                onClick={this.onApplyClick}
                disabled={!hasUnsavedChanges || isSavingSettings || invalid || pristine}
              >
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
  formChangeAction: PropTypes.func,
  invalid: PropTypes.bool,
  pristine: PropTypes.bool
};

GeneralSettings.defaultProps = {
  fetchServersUrl: '/api/servers',
  fetchSettingsUrl: '/api/settings'
};

export default reduxForm({
  form: FORM_NAME
})(GeneralSettings);
