import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field, reset } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form, noop } from 'patternfly-react';

import { FormField } from '../../../../../common/forms/FormField';
import { BootstrapSelect } from '../../../../../common/forms/BootstrapSelect';
import { validation } from '../../../../../../../../common/constants';
import { V2V_TARGET_PROVIDERS } from '../../MappingWizardConstants';
import { asyncValidate, onChange } from './helpers';
import { determineTargetProvider } from '../../helpers';

class MappingWizardGeneralStep extends React.Component {
  componentDidMount = () => {
    const {
      editingMapping,
      initialize,
      initialized,
      conversionHosts,
      fetchConversionHostsAction,
      fetchConversionHostsUrl
    } = this.props;

    if (editingMapping && !initialized) {
      initialize({
        name: editingMapping.name,
        description: editingMapping.description,
        targetProvider: determineTargetProvider(editingMapping)
      });
    }

    if (conversionHosts.length === 0) {
      fetchConversionHostsAction(fetchConversionHostsUrl);
    }
  };

  onSelect = selection => {
    const { targetProvider, dispatch, setEditingMappingAction } = this.props;
    if (targetProvider !== selection) {
      setEditingMappingAction(null);
      dispatch(reset('mappingWizardClustersStep'));
      dispatch(reset('mappingWizardDatastoresStep'));
      dispatch(reset('mappingWizardNetworksStep'));
    }
  };

  render() {
    const { targetProvider, editingMapping, providers } = this.props;

    const availableProviderOptions = V2V_TARGET_PROVIDERS.filter(option =>
      providers.some(provider => provider.type === option.type)
    );

    const preSelectedValue = availableProviderOptions.map(option => option.id)[0];

    return (
      <Form className="form-horizontal">
        <Field
          name="name"
          label={__('Name')}
          required
          component={FormField}
          type="text"
          help={validation.name.help}
          maxLength={validation.name.maxLength}
          maxLengthWarning={validation.name.maxLengthWarning}
          validate={[
            required({
              msg: validation.name.requiredMessage
            })
          ]}
        />
        <Field
          name="description"
          label={__('Description')}
          component={FormField}
          type="textarea"
          help={validation.description.help}
          maxLength={validation.description.maxLength}
          maxLengthWarning={validation.description.maxLengthWarning}
        />
        <Field
          name="targetProvider"
          label={__('Target Provider')}
          component={BootstrapSelect}
          options={availableProviderOptions}
          option_key="id"
          option_value="name"
          pre_selected_value={targetProvider || preSelectedValue}
          labelWidth={2}
          controlWidth={9}
          inline_label
          onSelect={this.onSelect}
          disabled={!!editingMapping}
        />
      </Form>
    );
  }
}

MappingWizardGeneralStep.propTypes = {
  targetProvider: PropTypes.string,
  dispatch: PropTypes.func,
  editingMapping: PropTypes.object,
  initialize: PropTypes.func,
  initialized: PropTypes.bool,
  providers: PropTypes.arrayOf(PropTypes.object),
  setEditingMappingAction: PropTypes.func,
  fetchConversionHostsAction: PropTypes.func,
  fetchConversionHostsUrl: PropTypes.string,
  conversionHosts: PropTypes.array
};

MappingWizardGeneralStep.defaultProps = {
  targetProvider: '',
  conversionHosts: [],
  fetchConversionHostsUrl: '/api/conversion_hosts?attributes=resource,authentications&expand=resources',
  dispatch: noop
};

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
export default reduxForm({
  form: 'mappingWizardGeneralStep', // a unique identifier for this form
  destroyOnUnmount: false, // preserve form data
  asyncValidate,
  asyncBlurFields: ['name'],
  onChange
  // forceUnregisterOnUnmount: true, // unregister fields on unmount
})(MappingWizardGeneralStep);
