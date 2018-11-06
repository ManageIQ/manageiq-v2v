import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import { Breadcrumb, Form, Grid, Button } from 'patternfly-react';
import Toolbar from '../../../config/Toolbar';
import NumberInput from '../common/forms/NumberInput';

const normalizeStringToInt = str => str && parseInt(str.replace(/\D/g, ''), 10) || 0;

class Settings extends React.Component {
  componentDidMount() {
    const { fetchSettingsAction } = this.props;
    fetchSettingsAction('TODO: url here'); // TODO
  }

  onApplyClick = () => {
    console.log('TODO: apply settings changes');
  };

  render() {
    const { settingsForm } = this.props;

    const toolbarContent = (
      <Toolbar>
        <Breadcrumb.Item href="/dashboard/maintab?tab=compute">{__('Compute')}</Breadcrumb.Item>
        <Breadcrumb.Item href="/migration">{__('Migration')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{__('Migration Settings')}</Breadcrumb.Item>
      </Toolbar>
    );

    const settingsContent = (
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
                  id="maxMigrationsPerHost"
                  name="maxMigrationsPerHost"
                  component={NumberInput}
                  normalize={normalizeStringToInt}
                />
              </div>
            </Grid.Col>
          </Form.FormGroup>
          <Form.FormGroup>
            <Grid.Col sm={12}>
              <Button bsStyle="primary" onClick={this.onApplyClick}>
                {__('Apply')}
              </Button>
            </Grid.Col>
          </Form.FormGroup>
        </Form>
      </div>
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
  settingsForm: PropTypes.object
};

export default reduxForm({
  form: 'settings'
})(Settings);
