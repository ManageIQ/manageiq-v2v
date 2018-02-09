import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { noop, selectKeys } from 'patternfly-react';
import ModalWizard from '../ModalWizard';
import PlanWizardBody from './PlanWizardBody';

class PlanWizardContainer extends React.Component {
  constructor() {
    super();
    this.state = { isFetching: true };
  }
  componentDidMount() {
    const that = this;
    setTimeout(() => {
      // TODO replace me with a real API request
      that.setState({ isFetching: false });
    }, 1000);
  }

  render() {
    const { isFetching } = this.state;
    const modalProps = selectKeys(this.props, [
      'showWizard',
      'onHide',
      'onExited'
    ]);
    return (
      <ModalWizard.StateProvider numSteps={3}>
        <ModalWizard {...modalProps} title={__('Migration Plan Wizard')}>
          <PlanWizardBody loaded={!isFetching} />
        </ModalWizard>
      </ModalWizard.StateProvider>
    );
  }
}

PlanWizardContainer.propTypes = {
  onHide: PropTypes.func,
  onExited: PropTypes.func,
  showWizard: PropTypes.bool
};
PlanWizardContainer.defaultProps = {
  onHide: noop,
  onExited: noop,
  showWizard: false
};

const mapStateToProps = (state, ownProps) => ({
  ...state.planWizard,
  ...ownProps.data
});

const mergeProps = (stateProps, dispatchProps, ownProps) =>
  Object.assign(stateProps, ownProps.data, dispatchProps);

export default connect(mapStateToProps, {}, mergeProps)(PlanWizardContainer);
