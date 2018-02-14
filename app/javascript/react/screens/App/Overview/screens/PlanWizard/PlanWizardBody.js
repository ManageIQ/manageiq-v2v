import React from 'react';
import PropTypes from 'prop-types';
import ModalWizard from '../../components/ModalWizard';

// TODO remove these, they are space fillers
const t = str => (
  <div align="center">
    <h1>TODO: {str}!</h1>
  </div>
);
const todo = str => (
  <div>
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
    {t(str)}
  </div>
);

const PlanWizardBody = props => (
  <ModalWizard.Body
    {...props}
    loadingTitle={__('Loading Clusters...')}
    loadingMessage={__('This may take a minute.')}
    steps={[
      {
        title: __('General'),
        render: () => todo('Name and Description Fields'),
        onClick: () => console.log('on step 1 click')
      },
      {
        title: __('VMs'),
        render: () => todo('VM CSV Upload Form'),
        onClick: () => console.log('on step 2 click')
      },
      {
        title: __('Results'),
        render: () => todo('Display Progress and Results'),
        onClick: () => console.log('on step 3 click')
      }
    ]}
  />
);

PlanWizardBody.propTypes = {
  loaded: PropTypes.bool,
  activeStepIndex: PropTypes.number,
  activeStep: PropTypes.string
};

PlanWizardBody.defaultProps = {
  loaded: false,
  activeStepIndex: 0,
  activeStep: '1'
};

export default PlanWizardBody;
