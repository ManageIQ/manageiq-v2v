import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required } from 'redux-form-validators';
import { Form } from 'patternfly-react';
import PropTypes from 'prop-types';
import { FormField } from '../../../../../common/forms/FormField';

const PlanWizardGeneralStep = props => {
  const { transformationMappings } = props;

  return (
    <Form className="form-horizontal">
      <Field
        name="infrastructure_mapping"
        label={__('Infrastructure Mapping')}
        required
        component={FormField}
        validate={[required({ msg: __('Required') })]}
        options={transformationMappings}
        optionKey="id"
        optionValue="name"
        type="select"
      />
      <Field
        name="name"
        label={__('Name')}
        required
        component={FormField}
        validate={[required({ msg: __('Required') })]}
        type="text"
      />
      <Field
        name="description"
        label={__('Description')}
        component={FormField}
        type="textarea"
      />
    </Form>
  );
};

PlanWizardGeneralStep.propTypes = {
  transformationMappings: PropTypes.array
};

export default reduxForm({
  form: 'planWizardGeneralStep',
  initialValues: { infrastructure_mapping: '' },
  destroyOnUnmount: false
})(PlanWizardGeneralStep);
